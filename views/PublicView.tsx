import React, { useState, useEffect } from 'react';
import { GlassButton } from '../components/GlassButton';
import { AppState } from '../types';
import { ExternalLink, Github, Twitter, Instagram, Linkedin, Mail, ShoppingBag, Briefcase, User, Loader2, AlertCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../src/lib/supabaseClient';

export const PublicView: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AppState | null>(null);

  useEffect(() => {
    if (username) {
      loadPublicProfile(username);
    }
  }, [username]);

  const loadPublicProfile = async (username: string) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Get Profile by Username
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          throw new Error('Usuário não encontrado');
        }
        throw profileError;
      }

      // 2. Get Links for this user
      const { data: links, error: linksError } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', profile.id)
        .eq('visible', true)
        .order('created_at', { ascending: true });

      if (linksError) throw linksError;

      setData({
        profile: {
          username: profile.username,
          role: profile.role,
          avatarUrl: profile.avatar_url
        },
        links: links?.map(link => ({
          id: link.id,
          title: link.title,
          url: link.url,
          visible: link.visible
        })) || [],
        socials: []
      });

    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError(err.message || 'Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'users': return <User size={24} />;
      case 'email': return <Mail size={24} />;
      case 'shop': return <ShoppingBag size={24} />;
      case 'briefcase': return <Briefcase size={24} />;
      case 'instagram': return <Instagram size={24} />;
      case 'twitter': return <Twitter size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      case 'github': return <Github size={24} />;
      default: return <ExternalLink size={24} />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-white">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-center">
        <div className="bg-red-500/10 p-4 rounded-full mb-4 text-red-400">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Página não encontrada</h2>
        <p className="text-white/60 mb-8">{error || 'O usuário que você procura não existe.'}</p>
        <Link to="/">
          <GlassButton variant="primary">Criar minha BioPage</GlassButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-12 px-4 flex flex-col items-center overflow-y-auto relative">
      <div className="noise"></div>

      {/* Background Gradient Blob */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md flex flex-col items-center gap-8 z-10">

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center gap-6 animate-fade-in-up">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur-md"></div>
            <div
              className="relative w-32 h-32 rounded-full bg-cover bg-center border-4 border-black shadow-2xl"
              style={{ backgroundImage: `url(${data.profile.avatarUrl || 'https://via.placeholder.com/150'})` }}
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              @{data.profile.username}
            </h1>
            {data.profile.role && (
              <p className="text-white/60 font-medium text-lg max-w-xs mx-auto leading-relaxed">
                {data.profile.role}
              </p>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="w-full flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {data.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="glass glass-hover w-full p-4 rounded-2xl flex items-center justify-between group">
                <span className="font-semibold text-lg text-white">{link.title}</span>
                <div className="bg-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  <ExternalLink className="text-white" size={20} />
                </div>
              </div>
            </a>
          ))}

          {data.links.length === 0 && (
            <div className="text-center text-white/40 py-8 glass rounded-2xl">
              Nenhum link público disponível.
            </div>
          )}
        </div>

        {/* Footer Branding */}
        <div className="mt-12 text-white/20 text-sm font-medium flex items-center gap-2 hover:text-white/40 transition-colors">
          <Link to="/" className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-bold text-gradient">BioPage</span>
          </Link>
        </div>

      </div>
    </div>
  );
};