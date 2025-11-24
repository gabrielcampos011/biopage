import React, { useState, useEffect } from 'react';
import { supabase } from '../src/lib/supabaseClient';
import { User, Link as LinkIcon, Plus, Trash2, Save, LogOut, Loader2, GripVertical, Check, Layout, Share2 } from 'lucide-react';
import { GlassButton } from '../components/GlassButton';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { themes, ThemeType } from '../src/lib/themes';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  order: number;
}

interface ProfileData {
  username: string;
  role: string;
  avatarUrl: string;
  theme?: string;
}

export const AdminView: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('default_dark');
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    profile: {
      username: '',
      role: '',
      avatarUrl: ''
    },
    newLink: {
      title: '',
      url: ''
    }
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setUser(user);
    loadUserData(user.id);
  };

  const loadUserData = async (userId: string) => {
    try {
      // Load profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        setProfileData(profile);
        setFormData(prev => ({
          ...prev,
          profile: {
            username: profile.username || '',
            role: profile.role || '',
            avatarUrl: profile.avatar_url || ''
          }
        }));
        if (profile.theme && themes[profile.theme as ThemeType]) {
          setSelectedTheme(profile.theme as ThemeType);
        }
      }

      // Load links
      const { data: userLinks } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', userId)
        .order('order', { ascending: true });

      if (userLinks) {
        setLinks(userLinks);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const addLink = () => {
    if (!formData.newLink.title || !formData.newLink.url) return;

    const newLink: LinkItem = {
      id: crypto.randomUUID(),
      title: formData.newLink.title,
      url: formData.newLink.url,
      order: links.length
    };

    setLinks([...links, newLink]);
    setFormData(prev => ({
      ...prev,
      newLink: { title: '', url: '' }
    }));
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Save profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          username: formData.profile.username,
          role: formData.profile.role,
          avatar_url: formData.profile.avatarUrl,
          theme: selectedTheme,
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      // Delete existing links and insert new ones
      // Note: In a real app, you'd want to be smarter about updates vs deletes
      await supabase.from('links').delete().eq('user_id', user?.id);

      if (links.length > 0) {
        const { error: linksError } = await supabase
          .from('links')
          .insert(
            links.map((link, index) => ({
              user_id: user?.id,
              title: link.title,
              url: link.url,
              order: index
            }))
          );

        if (linksError) throw linksError;
      }

      alert('Alterações salvas com sucesso!');
    } catch (error: any) {
      alert('Erro ao salvar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
        <Loader2 className="animate-spin text-white" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white pb-24">
      <div className="bg-radial-dark"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Layout size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            {profileData?.username && (
              <a
                href={`/${profileData.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium border border-white/10"
              >
                <Share2 size={16} />
                Ver página
              </a>
            )}
            <button
              onClick={handleSignOut}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-red-400"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8 animate-fade-in">
        <div className="grid md:grid-cols-12 gap-8">

          {/* Left Column - Profile & Theme */}
          <div className="md:col-span-5 space-y-8">

            {/* Profile Card */}
            <div className="bg-gray-800/50 border border-white/5 border-l-4 border-l-indigo-500 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <User size={20} className="text-indigo-400" />
                Perfil
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gray-700 border-2 border-indigo-500/30 flex items-center justify-center overflow-hidden mb-4 relative group">
                    {formData.profile.avatarUrl ? (
                      <img src={formData.profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} className="text-white/20" />
                    )}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-xs font-medium">Alterar</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/40">Clique para alterar foto</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider ml-1">Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">biopage.app/</span>
                    <Input
                      value={formData.profile.username}
                      onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, username: e.target.value } })}
                      placeholder="seu-usuario"
                      className="pl-28 bg-gray-900/50 border-white/10 focus:border-indigo-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider ml-1">Bio / Cargo</label>
                  <Input
                    value={formData.profile.role}
                    onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, role: e.target.value } })}
                    placeholder="Ex: Designer & Developer"
                    className="bg-gray-900/50 border-white/10 focus:border-indigo-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="bg-gray-800/50 border border-white/5 border-l-4 border-l-purple-500 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <Layout size={20} className="text-purple-400" />
                Aparência
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(themes) as ThemeType[]).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => setSelectedTheme(themeKey)}
                    className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left group overflow-hidden ${selectedTheme === themeKey
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-white/5 hover:border-white/20 bg-gray-900/50'
                      }`}
                  >
                    <div className={`w-full h-16 rounded-lg mb-3 ${themes[themeKey].pageBackground} bg-cover bg-center shadow-inner border border-white/5`}></div>
                    <span className="text-xs font-medium text-white block truncate">{themes[themeKey].name}</span>
                    {selectedTheme === themeKey && (
                      <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-0.5 shadow-lg">
                        <Check size={12} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Links */}
          <div className="md:col-span-7">
            <div className="bg-gray-800/50 border border-white/5 border-l-4 border-l-pink-500 rounded-2xl p-6 shadow-xl h-full">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <LinkIcon size={20} className="text-pink-400" />
                Seus Links
              </h3>

              {/* Add Link Form */}
              <div className="bg-gray-900/50 p-4 rounded-xl border border-white/5 mb-8">
                <div className="grid gap-4">
                  <Input
                    placeholder="Título do botão (Ex: Meu Instagram)"
                    value={formData.newLink.title}
                    onChange={(e) => setFormData({ ...formData, newLink: { ...formData.newLink, title: e.target.value } })}
                    className="bg-gray-800 border-white/10 focus:border-pink-500/50"
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="URL (https://...)"
                      value={formData.newLink.url}
                      onChange={(e) => setFormData({ ...formData, newLink: { ...formData.newLink, url: e.target.value } })}
                      className="bg-gray-800 border-white/10 focus:border-pink-500/50"
                    />
                    <button
                      onClick={addLink}
                      disabled={!formData.newLink.title || !formData.newLink.url}
                      className="px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Links List */}
              <div className="space-y-3">
                {links.length === 0 ? (
                  <div className="text-center py-12 text-white/20 border-2 border-dashed border-white/5 rounded-xl">
                    <LinkIcon size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Nenhum link adicionado ainda</p>
                  </div>
                ) : (
                  links.map((link) => (
                    <div
                      key={link.id}
                      className="group bg-gray-900/80 p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:border-white/20 transition-all"
                    >
                      <div className="cursor-grab active:cursor-grabbing text-white/20 hover:text-white/60">
                        <GripVertical size={20} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-medium text-white truncate">{link.title}</h4>
                        <p className="text-xs text-white/40 truncate">{link.url}</p>
                      </div>
                      <button
                        onClick={() => removeLink(link.id)}
                        className="text-white/20 hover:text-red-400 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={saveChanges}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </div>
  );
};