import React, { useState, useEffect } from 'react';
import { GlassButton } from '../components/GlassButton';
import { Input } from '../components/Input';
import { GripVertical, Plus, Trash2, Save, LogOut, Loader2, ExternalLink } from 'lucide-react';
import { LinkItem, AppState, ProfileData } from '../App';
import { useAuth } from '../contexts/AuthContext';
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
    socials: [] // TODO: Implement socials editing
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
    // For new links, we use a temporary ID until saved to DB, 
    // or we could insert immediately. Let's insert immediately for simplicity or handle in save.
    // Here we'll just add to state with a temp ID, but 'save' will handle upsert.
    // Actually, for simplicity with Supabase upsert, it's better if we treat them as new.
    // But to keep UI responsive, we add to state.
    const newLink: LinkItem = {
      id: `temp-${Date.now()}`,
      title: 'Novo Link',
      url: 'https://',
      visible: true
    };

    setFormData(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const removeLink = async (id: string) => {
    // If it's a temp link, just remove from state
    if (id.startsWith('temp-')) {
      setFormData(prev => ({
        ...prev,
        links: prev.links.filter(link => link.id !== id)
      }));
      return;
    }

    // If it's a real link, delete from DB
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
      // We need to separate new links (temp-id) from existing ones
      const linksToUpsert = formData.links.map(link => {
        const linkData = {
          user_id: user?.id,
          title: link.title,
          url: link.url,
          visible: link.visible
        };

        // If it has a real UUID, include it. If it's temp, let Supabase generate ID.
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

      // Update state with saved links (to get real IDs for new links)
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
    return <div className="flex h-full items-center justify-center text-white"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="flex h-full w-full flex-col max-w-[800px] mx-auto p-4 md:p-8 overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 glass-card p-4 rounded-2xl">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="bg-white/20 p-2 rounded-lg"><GripVertical size={20} /></span>
          Editor
        </h2>
        <div className="flex items-center gap-4">
          {formData.profile.username && (
            <Link
              to={`/${formData.profile.username}`}
              target="_blank"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <ExternalLink size={16} /> Ver Página
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6 rounded-3xl mb-6">
        <h3 className="text-white text-xl font-bold mb-4">Detalhes do Perfil</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div
                className="w-24 h-24 rounded-full bg-cover bg-center border-4 border-white/30 shadow-inner bg-gray-800"
                style={{ backgroundImage: formData.profile.avatarUrl ? `url("${formData.profile.avatarUrl}")` : undefined }}
              />
            </div>
            <div className="flex-grow w-full space-y-4">
              <Input
                label="Nome de Usuário (URL)"
                value={formData.profile.username}
                onChange={(e) => handleProfileChange('username', e.target.value)}
                placeholder="ex: joaosilva"
              />
              <Input
                label="Função / Bio"
                value={formData.profile.role}
                onChange={(e) => handleProfileChange('role', e.target.value)}
              />
              <Input
                label="URL do Avatar"
                value={formData.profile.avatarUrl}
                onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="glass-card p-6 rounded-3xl mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-xl font-bold">Links</h3>
          <button
            onClick={addNewLink}
            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {formData.links.map((link) => (
            <div key={link.id} className="bg-black/20 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-end border border-white/5 animate-fade-in">
              <div className="flex-grow w-full md:w-auto space-y-3">
                <Input
                  placeholder="Título do Botão"
                  value={link.title}
                  onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)}
                />
                <Input
                  placeholder="URL (https://...)"
                  value={link.url}
                  onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => removeLink(link.id)}
                  className="p-3 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500/40 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {formData.links.length === 0 && (
            <div className="text-center text-white/40 py-8">
              Nenhum link ainda. Adicione um acima!
            </div>
          )}
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="sticky bottom-4 z-50">
        <GlassButton variant="primary" onClick={saveChanges} disabled={saving} className="shadow-xl shadow-black/20">
          <span className="flex items-center gap-2">
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </span>
        </GlassButton>
      </div>

    </div>
  );
};