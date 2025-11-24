import React, { useState } from 'react';
import { GlassButton } from '../components/GlassButton';
import { Input } from '../components/Input';
import { Lock, ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

export const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Falha ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-8 rounded-3xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Lock size={24} />
          </div>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Bem-vindo de volta</h2>
          <p className="text-white/60 mt-2">Entre para editar seu perfil</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} />}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                required
              />
            </div>
            {error && <p className="text-red-300 text-sm text-center">{error}</p>}

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-white/50 hover:text-white transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <GlassButton type="submit" variant="primary" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Entrar'}
          </GlassButton>
        </form>

        <div className="text-center text-sm text-white/40">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-white hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};