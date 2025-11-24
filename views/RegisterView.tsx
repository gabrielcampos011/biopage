import React, { useState } from 'react';
import { GlassButton } from '../components/GlassButton';
import { Input } from '../components/Input';
import { UserPlus, ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterView: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Falha ao cadastrar');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex h-full w-full items-center justify-center p-4">
                <div className="w-full max-w-md glass-card p-8 rounded-3xl flex flex-col gap-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mx-auto">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Verifique seu e-mail</h2>
                    <p className="text-white/60">
                        Enviamos um link de confirmação para <strong>{email}</strong>. Por favor, verifique sua caixa de entrada para completar o cadastro.
                    </p>
                    <GlassButton onClick={() => navigate('/login')} variant="secondary">
                        Voltar para Login
                    </GlassButton>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full items-center justify-center p-4">
            <div className="w-full max-w-md glass-card p-8 rounded-3xl flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Link to="/login" className="text-white/50 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <UserPlus size={24} />
                    </div>
                    <div className="w-6" />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Criar Conta</h2>
                    <p className="text-white/60 mt-2">Junte-se a nós para criar sua página bio</p>
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
                                minLength={6}
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Confirmar Senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                icon={<Lock size={18} />}
                                required
                                minLength={6}
                            />
                        </div>
                        {error && <p className="text-red-300 text-sm text-center">{error}</p>}
                    </div>

                    <GlassButton type="submit" variant="primary" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Cadastrar'}
                    </GlassButton>
                </form>

                <div className="text-center text-sm text-white/40">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-white hover:underline">
                        Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
};

