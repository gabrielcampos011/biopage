import React from 'react';
import { Link } from 'react-router-dom';
import { GlassButton } from '../components/GlassButton';
import { Sparkles, Share2, Shield, Zap, Globe, Palette } from 'lucide-react';

export const LandingView: React.FC = () => {
    return (
        <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
            <div className="noise"></div>

            {/* Background Blobs */}
            <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Navbar */}
            <nav className="w-full p-6 flex justify-between items-center z-10 animate-fade-in">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                        <Sparkles className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">BioPage</span>
                </div>
                <div className="flex gap-4">
                    <Link to="/login">
                        <button className="text-white/80 hover:text-white font-medium px-4 py-2 transition-colors">
                            Entrar
                        </button>
                    </Link>
                    <Link to="/register">
                        <GlassButton variant="primary" className="!px-6 !py-2 !rounded-full">
                            Começar Grátis
                        </GlassButton>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 z-10">
                <div className="max-w-4xl space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-4 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Nova versão 2.0 disponível
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                        Seu link único para <br />
                        <span className="text-gradient">tudo que importa.</span>
                    </h1>

                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Crie uma página bonita e personalizada para compartilhar todos os seus links, redes sociais e conteúdo em um só lugar. Simples, rápido e gratuito.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link to="/register">
                            <GlassButton variant="primary" className="!text-lg !px-8 !py-4 shadow-xl shadow-primary/20 hover:shadow-primary/40">
                                Criar minha BioPage
                            </GlassButton>
                        </Link>
                        <Link to="/demo">
                            <GlassButton className="!text-lg !px-8 !py-4">
                                Ver Demonstração
                            </GlassButton>
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-32 w-full px-4">
                    <FeatureCard
                        icon={<Palette size={32} />}
                        title="Design Premium"
                        description="Templates modernos com glassmorphism e gradientes que destacam sua marca."
                        delay="0.1s"
                    />
                    <FeatureCard
                        icon={<Globe size={32} />}
                        title="Link Personalizado"
                        description="Garanta seu username único (biopage.app/voce) antes que alguém pegue."
                        delay="0.2s"
                    />
                    <FeatureCard
                        icon={<Zap size={32} />}
                        title="Ultra Rápido"
                        description="Carregamento instantâneo e otimizado para todos os dispositivos móveis."
                        delay="0.3s"
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full p-8 text-center text-white/20 text-sm z-10 border-t border-white/5 mt-20">
                <p>&copy; 2024 BioPage. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string, delay: string }> = ({ icon, title, description, delay }) => (
    <div className="glass p-8 rounded-3xl hover:bg-white/15 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: delay }}>
        <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 leading-relaxed">
            {description}
        </p>
    </div>
);
