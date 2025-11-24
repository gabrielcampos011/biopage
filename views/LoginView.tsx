import React, { useState } from 'react';
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
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-radial-dark"></div>

      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50 rounded-3xl p-8 flex flex-col gap-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">
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
                className="bg-gray-900/50 border-white/10 focus:border-indigo-500/50 text-white placeholder:text-white/20"
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
                className="bg-gray-900/50 border-white/10 focus:border-indigo-500/50 text-white placeholder:text-white/20"
              />
            </div>
            {error && <p className="text-red-300 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>}

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-white/50 hover:text-white transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar'}
          </button>
        </form>

        <div className="text-center text-sm text-white/40">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-white hover:underline font-medium">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};