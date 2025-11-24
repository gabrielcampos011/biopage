import React, { useState, useEffect } from 'react';
import { GlassButton } from '../components/GlassButton';
import { Input } from '../components/Input';
import { AvatarUpload } from '../components/AvatarUpload';
import { GripVertical, Plus, Trash2, Save, LogOut, Loader2, ExternalLink, LayoutDashboard, Link as LinkIcon } from 'lucide-react';
import { LinkItem, AppState, ProfileData } from '../types';
import { useAuth } from '../src/contexts/AuthContext';
import { supabase } from '../src/lib/supabaseClient';
import { Link } from 'react-router-dom';

export const AdminView: React.FC = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AppState>({
    profile: {
      username: '',
      role: '',
      avatarUrl: ''
    },
    links: [],
    socials: []
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // Load Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') throw profileError;

      // Load Links
      const { data: linksData, error: linksError } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (linksError) throw linksError;

      setFormData({
        profile: {
          username: profileData?.username || '',
          role: profileData?.role || '',
          avatarUrl: profileData?.avatar_url || ''
        },
        links: linksData?.map(link => ({
          id: link.id,
          title: link.title,
          url: link.url,
          visible: link.visible
        })) || [],
        socials: []
      });

    } catch (error) {
      console.error('Error loading data:', error);
      alert('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const handleLinkChange = (id: string, field: keyof LinkItem, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  const addNewLink = () => {
    const newLink: LinkItem = {
      id: `temp-${Date.now()}`,
      title: 'Novo Link',
      url: 'https://',
      visible: true
    };

    setFormData(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const removeLink = async (id: string) => {
    if (id.startsWith('temp-')) {
      setFormData(prev => ({
        ...prev,
        links: prev.links.filter(link => link.id !== id)
      }));
      return;
    }

    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        links: prev.links.filter(link => link.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting link:', error);
      alert('Erro ao deletar link.');
    }
  };

  const saveChanges = async () => {
    try {
      setSaving(true);

      // 1. Upsert Profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          username: formData.profile.username,
          role: formData.profile.role,
          avatar_url: formData.profile.avatarUrl,
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      // 2. Upsert Links
      const linksToUpsert = formData.links.map(link => {
        const linkData = {
          user_id: user?.id,
          title: link.title,
          url: link.url,
          visible: link.visible
        };

        if (!link.id.startsWith('temp-')) {
          return { ...linkData, id: link.id };
        }
        return linkData;
      });

      const { data: savedLinks, error: linksError } = await supabase
        .from('links')
        .upsert(linksToUpsert)
        .select();

      if (linksError) throw linksError;

      if (savedLinks) {
        setFormData(prev => ({
          ...prev,
          links: savedLinks.map(link => ({
            id: link.id,
            title: link.title,
            url: link.url,
            visible: link.visible
          }))
        }));
      }

      alert('Alterações salvas com sucesso!');
    } catch (error: any) {
      console.error('Error saving:', error);
      alert(`Erro ao salvar: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center text-white"><Loader2 className="animate-spin" size={32} /></div>;
  }

  return (
    <div className="flex h-full w-full flex-col max-w-4xl mx-auto p-4 md:p-8 overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 glass p-6 rounded-2xl animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl text-primary">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-gradient">Painel de Controle</span>
        </h2>
        <div className="flex items-center gap-4">
          {formData.profile.username && (
            <Link
              to={`/${formData.profile.username}`}
              target="_blank"
              className="glass-button-secondary flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
            >
              <ExternalLink size={16} /> Ver Página
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="text-white/60 hover:text-red-400 flex items-center gap-2 text-sm font-semibold transition-colors px-2"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6">

        {/* Profile Section */}
        <div className="md:col-span-4 space-y-6">
          <div className="glass p-6 rounded-3xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Perfil
            </h3>

            <div className="flex flex-col items-center gap-6">
              <AvatarUpload
                url={formData.profile.avatarUrl}
                onUpload={(url) => handleProfileChange('avatarUrl', url)}
                userId={user?.id || ''}
              />

              <div className="w-full space-y-4">
                <Input
                  label="Nome de Usuário"
                  value={formData.profile.username}
                  onChange={(e) => handleProfileChange('username', e.target.value)}
                  placeholder="ex: joaosilva"
                />
                <Input
                  label="Bio / Cargo"
                  value={formData.profile.role}
                  onChange={(e) => handleProfileChange('role', e.target.value)}
                  placeholder="Designer & Developer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="md:col-span-8">
          <div className="glass p-6 rounded-3xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-lg font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-secondary rounded-full"></span>
                Seus Links
              </h3>
              <button
                onClick={addNewLink}
                className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-2 transition-all active:scale-95 border border-white/10"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {formData.links.map((link, index) => (
                <div key={link.id} className="bg-black/20 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center border border-white/5 group hover:border-white/10 transition-colors">
                  <div className="p-3 bg-white/5 rounded-xl text-white/40 cursor-grab active:cursor-grabbing">
                    <GripVertical size={20} />
                  </div>

                  <div className="flex-grow w-full space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                    <Input
                      placeholder="Título do Botão"
                      value={link.title}
                      onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)}
                      className="bg-transparent border-none focus:ring-0 p-0 text-lg font-medium placeholder:text-white/20"
                    />
                    <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/5 focus-within:border-primary/50 transition-colors">
                      <LinkIcon size={14} className="text-white/30 flex-shrink-0" />
                      <input
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                        className="bg-transparent border-none outline-none text-sm text-white/80 w-full placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => removeLink(link.id)}
                    className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {formData.links.length === 0 && (
                <div className="text-center text-white/30 py-12 border-2 border-dashed border-white/5 rounded-2xl">
                  <p>Adicione links para começar a construir sua página.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
        <GlassButton
          variant="primary"
          onClick={saveChanges}
          disabled={saving}
          className="shadow-2xl shadow-primary/20 !rounded-full !px-8 !py-4"
        >
          <span className="flex items-center gap-2 text-lg">
            {saving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
            {saving ? 'Salvando...' : 'Salvar'}
          </span>
        </GlassButton>
      </div>

    </div>
  );
};