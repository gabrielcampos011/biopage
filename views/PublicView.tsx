import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../src/lib/supabaseClient';
import { Loader2, ExternalLink, Instagram, Linkedin, Twitter, Github, Facebook, Youtube, Mail, Globe } from 'lucide-react';
import { themes, ThemeType } from '../src/lib/themes';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  order: number;
}

interface Profile {
  username: string;
  role: string;
  avatar_url: string;
  theme?: string;
}

interface AppState {
  profile: Profile;
  links: LinkItem[];
}

const getSocialIcon = (url: string, title: string) => {
  const lowerUrl = url.toLowerCase();
  const lowerTitle = title.toLowerCase();

  if (lowerUrl.includes('instagram') || lowerTitle.includes('instagram')) return <Instagram size={20} />;
  if (lowerUrl.includes('linkedin') || lowerTitle.includes('linkedin')) return <Linkedin size={20} />;
  if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com') || lowerTitle.includes('twitter')) return <Twitter size={20} />;
  if (lowerUrl.includes('github') || lowerTitle.includes('github')) return <Github size={20} />;
  if (lowerUrl.includes('facebook') || lowerTitle.includes('facebook')) return <Facebook size={20} />;
  if (lowerUrl.includes('youtube') || lowerTitle.includes('youtube')) return <Youtube size={20} />;
  if (lowerUrl.includes('mailto:') || lowerTitle.includes('email') || lowerTitle.includes('contato')) return <Mail size={20} />;

  return <Globe size={20} />;
};

export const PublicView: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AppState | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default_dark');

  useEffect(() => {
    if (username) {
      loadPublicProfile(username);
    }
  }, [username]);

  const loadPublicProfile = async (username: string) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Get Profile
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

      if (profile.theme && themes[profile.theme as ThemeType]) {
        setCurrentTheme(profile.theme as ThemeType);
      }

      // 2. Get Links
      const { data: links, error: linksError } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', profile.id)
        .order('order', { ascending: true });

      if (linksError) throw linksError;

      setData({
        profile,
        links: links || []
      });
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError(err.message || 'Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
        <Loader2 className="animate-spin text-white" size={32} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Página não encontrada</h2>
          <p className="text-white/60">{error || 'Este perfil não existe.'}</p>
        </div>
      </div>
    );
  }

  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen w-full py-12 px-4 flex flex-col items-center justify-center relative transition-colors duration-500 ${theme.pageBackground}`}>

      {/* Theme Specific Background Elements */}
      {currentTheme !== 'clean_white' && <div className="noise-texture"></div>}

      {currentTheme === 'default_dark' && (
        <>
          <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
        </>
      )}

      <div className={`w-full max-w-md mx-auto relative z-10 flex flex-col items-center gap-8 animate-fade-in-up`}>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 relative">
              {data.profile.avatar_url ? (
                <img
                  src={data.profile.avatar_url}
                  alt={data.profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl font-bold">
                  {data.profile.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h1 className={`text-2xl font-bold ${theme.textColor}`}>@{data.profile.username}</h1>
            {data.profile.role && (
              <p className={`text-sm font-medium ${theme.descriptionStyle || 'text-white/60'}`}>
                {data.profile.role}
              </p>
            )}
          </div>
        </div>

        {/* Links List */}
        <div className="w-full space-y-4 sm:space-y-6">
          {data.links.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative w-full p-4 min-h-[56px] rounded-xl flex items-center justify-center transition-all duration-300
                ${theme.buttonStyle}
                hover:scale-[1.02] active:scale-[0.98]
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-4 opacity-70 group-hover:opacity-100 transition-opacity">
                {getSocialIcon(link.url, link.title)}
              </div>
              <span className="font-medium text-center">{link.title}</span>
              <ExternalLink size={16} className="absolute right-4 opacity-0 group-hover:opacity-50 transition-opacity" />
            </a>
          ))}

          {data.links.length === 0 && (
            <div className={`text-center py-8 ${theme.descriptionStyle || 'text-white/40'}`}>
              Este usuário ainda não adicionou links.
            </div>
          )}
        </div>

        {/* Footer Branding */}
        <div className={`mt-12 text-sm font-medium flex items-center gap-2 transition-colors ${theme.descriptionStyle || 'text-white/20 hover:text-white/40'}`}>
          <Link to="/" className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-bold">BioPage</span>
          </Link>
        </div>

      </div>
    </div>
  );
};