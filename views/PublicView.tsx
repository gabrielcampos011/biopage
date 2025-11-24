import React from 'react';
import { GlassButton } from '../components/GlassButton';
import { AppState } from '../types';
import { ExternalLink, Github, Twitter, Instagram, Linkedin, Mail, ShoppingBag, Briefcase, User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PublicViewProps {
  data: AppState;
}

export const PublicView: React.FC<PublicViewProps> = ({ data }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'users': return <User size={28} />; // Changed from Users to User
      case 'email': return <Mail size={28} />; // Changed from AtSign to Mail
      case 'shop': return <ShoppingBag size={28} />; // Changed from ShoppingCart to ShoppingBag
      case 'briefcase': return <Briefcase size={28} />;
      case 'instagram': return <Instagram size={28} />;
      case 'twitter': return <Twitter size={28} />;
      default: return <ExternalLink size={28} />;
    }
  };

  const handleLinkClick = (url: string) => {
    import { ExternalLink, Share2, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
    import { Link, useParams } from 'react-router-dom';
    import { supabase } from '../src/lib/supabaseClient';
    import { AppState } from '../App';

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

      if (loading) {
        return (
          <div className="flex h-full w-full items-center justify-center text-white">
            <Loader2 className="animate-spin" size={32} />
          </div>
        );
      }

      if (error || !data) {
        return (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
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
              ))
    }
            </div >
          </div >

        </div >
      </div >
    </div >
  );
};