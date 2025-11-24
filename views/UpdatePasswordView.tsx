import React, { useState, useEffect } from 'react';
import { GlassButton } from '../components/GlassButton';
import { Input } from '../components/Input';
import { Lock, Loader2 } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const UpdatePasswordView: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have a session (which happens after clicking the email link)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate('/login');
            }
        });
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;
            navigate('/admin');
        } catch (err: any) {
            setError(err.message || 'Falha ao atualizar senha');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full w-full items-center justify-center p-4">
            <div className="w-full max-w-md glass-card p-8 rounded-3xl flex flex-col gap-6">
                <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <Lock size={24} />
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Definir Nova Senha</h2>
                    <p className="text-white/60 mt-2">Por favor, digite sua nova senha abaixo</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Nova Senha"
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
                                placeholder="Confirmar Nova Senha"
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
                        {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Atualizar Senha'}
                    </GlassButton>
                </form>
            </div>
        </div>
    );
};
