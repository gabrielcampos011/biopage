import React from 'react';
import { Link } from 'react-router-dom';
import { GlassButton } from '../components/GlassButton';
import { ArrowRight, Sparkles, Share2, Shield, Zap } from 'lucide-react';

export const LandingView: React.FC = () => {
    return (
        <div className="min-h-screen w-full flex flex-col overflow-y-auto">
            {/* Navbar */}
            <nav className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="text-blue-400" />
                    BioPage
                </div>
                <div className="flex gap-4">
                    <Link to="/login">
                        <GlassButton variant="secondary" size="sm">Entrar</GlassButton>
                    </Link>
                    <Link to="/register">
                        <GlassButton variant="primary" size="sm">Criar Conta</GlassButton>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                    Seu Link Único <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Para Tudo.
                    </span>
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                    Crie uma página bonita e personalizada para compartilhar todos os seus links importantes.
                    Conecte sua audiência ao seu conteúdo em um só lugar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register">
                        <GlassButton variant="primary" size="lg" className="group">
                            Começar Agora
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </GlassButton>
                    </Link>
                    <Link to="/login">
                        <GlassButton variant="secondary" size="lg">
                            Já tenho conta
                        </GlassButton>
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Share2 size={32} className="text-blue-400" />}
                        title="Centralize Links"
                        description="Reúna todas as suas redes sociais, sites e conteúdos em uma única URL fácil de compartilhar."
                    />
                    <FeatureCard
                        icon={<Shield size={32} className="text-purple-400" />}
                        title="Totalmente Seguro"
                        description="Seus dados estão protegidos. Focamos em privacidade e segurança para você e seus visitantes."
                    />
                    <FeatureCard
                        icon={<Zap size={32} className="text-yellow-400" />}
                        title="Design Premium"
                        description="Interfaces modernas e responsivas que impressionam em qualquer dispositivo."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-white/40 text-sm border-t border-white/5">
                <p>© {new Date().getFullYear()} BioPage. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-colors">
        <div className="mb-4 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
);
