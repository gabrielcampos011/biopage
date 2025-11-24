import React, { useState } from 'react';
import { GlassButton } from '../components/GlassButton';
import { Input } from '../components/Input';
import { KeyRound, ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { Link } from 'react-router-dom';

export const ForgotPasswordView: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            });

            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Falha ao enviar e-mail de redefinição');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex h-full w-full items-center justify-center p-4">
                <div className="w-full max-w-md glass-card p-8 rounded-3xl flex flex-col gap-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Verifique seu e-mail</h2>
                    <p className="text-white/60">
                        Se existir uma conta para <strong>{email}</strong>, enviamos um link de redefinição de senha.
                    </p>
                    <Link to="/login">
                        <GlassButton variant="secondary" className="mt-4">
                            Voltar para Login
                        </GlassButton>
                    </Link>
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
                        <KeyRound size={24} />
                    </div>
                    <div className="w-6" />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Redefinir Senha</h2>
                    <p className="text-white/60 mt-2">Digite seu e-mail para receber um link de redefinição</p>
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
                        {error && <p className="text-red-300 text-sm text-center">{error}</p>}
                    </div>

                    <GlassButton type="submit" variant="primary" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Enviar Link'}
                    </GlassButton>
                </form>
            </div>
        </div>
    );
};
