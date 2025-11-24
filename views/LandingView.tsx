import React from 'react';
import { Link } from 'react-router-dom';
import { GlassButton } from '../components/GlassButton';
import { Sparkles, Share2, Shield, Zap, Globe, Palette, Layout, ArrowRight } from 'lucide-react';

export const LandingView: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-gray-900 text-white overflow-hidden relative">
            <div className="bg-radial-dark"></div>

            {/* Navbar */}
            <nav className="w-full p-6 flex justify-between items-center z-10 relative animate-fade-in">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
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
                        <button className="px-6 py-2 rounded-full font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all">
                            Cadastrar
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center px-4 py-20 relative z-10 text-center">
                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        A plataforma de links do futuro
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight">
                        Seus links, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
                            tudo que importa.
                        </span>
                    </h1>

                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Crie uma página única para todos os seus links. Simples, bonito e gratuito.
                        Junte-se a milhares de criadores que usam o BioPage.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to="/register" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 hover:-translate-y-1">
                                Começar Grátis
                                <ArrowRight className="inline-block ml-2" size={20} />
                            </button>
                        </Link>
                        <Link to="/demo" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all hover:scale-105">
                                Ver Demonstração
                            </button>
                        </Link>
                    </div>

                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-6xl w-full px-4">
                    <FeatureCard
                        icon={<Layout className="text-indigo-400" size={32} />}
                        title="Design Premium"
                        description="Temas modernos e responsivos que se adaptam ao seu estilo."
                        delay="0.1s"
                    />
                    <FeatureCard
                        icon={<Share2 className="text-purple-400" size={32} />}
                        title="Compartilhamento"
                        description="Compartilhe seu perfil em qualquer rede social com um único link."
                        delay="0.2s"
                    />
                    <FeatureCard
                        icon={<Shield className="text-pink-400" size={32} />}
                        title="Seguro e Rápido"
                        description="Seus dados protegidos e carregamento instantâneo para seus visitantes."
                        delay="0.3s"
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-8 text-center text-white/20 text-sm relative z-10 border-t border-white/5 mt-20">
                <p>&copy; 2025 BioPage. Todos os direitos reservados - <a href="http://instagram.com/gabriel.campos011" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Gabriel Campos</a>.</p>
            </footer>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string, delay?: string }> = ({ icon, title, description, delay }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group animate-fade-in-up hover:-translate-y-1 flex flex-col items-center text-center" style={{ animationDelay: delay }}>
        <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-lg">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 leading-relaxed">
            {description}
        </p>
    </div>
);
