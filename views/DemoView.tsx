import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Play, Check, ExternalLink } from 'lucide-react';
import { themes } from '../src/lib/themes';

export const DemoView: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-gray-900 text-white overflow-x-hidden">
            <div className="bg-radial-dark"></div>

            {/* Background Blobs */}
            <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Navbar */}
            <nav className="w-full p-6 flex justify-between items-center z-10 relative animate-fade-in">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
                        <Sparkles className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">BioPage</span>
                </Link>
                <div className="flex gap-4">
                    <Link to="/login">
                        <button className="text-white/80 hover:text-white font-medium px-4 py-2 transition-colors">
                            Entrar
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="px-6 py-2 rounded-full font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105">
                            Criar Grátis
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Section 1: Hero with Video */}
            <section className="relative z-10 flex flex-col items-center text-center px-4 py-16 md:py-24 max-w-6xl mx-auto">
                <div className="animate-fade-in-up space-y-6 mb-12">
                    <h1 className="text-4xl md:text-6xl font-black leading-tight">
                        Veja como é simples criar <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">sua vitrine digital.</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Em menos de 30 segundos, você estará conectado com o mundo.
                    </p>
                </div>

                {/* Video Placeholder / Mockup */}
                <div className="w-full max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/20 bg-gray-900/80 backdrop-blur-xl aspect-video flex items-center justify-center group">

                        {/* Browser Bar Mockup */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2 z-20">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="mx-auto bg-white/5 px-4 py-1 rounded-md text-xs text-white/40 font-mono">
                                biopage.app/demo
                            </div>
                        </div>

                        {/* Video Embed */}
                        <div className="w-full h-full pt-10">
                            <iframe
                                src="https://jumpshare.com/embed/8R2v1sf2Mldle6NCx4QA"
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                className="w-full h-full"
                                title="BioPage Demo"
                            ></iframe>
                        </div>

                    </div>
                </div>
            </section>

            {/* Section 2: Themes Showcase */}
            <section className="relative z-10 py-24 px-4 bg-black/20 backdrop-blur-sm border-y border-white/5">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16">
                        Escolha o seu Estilo. <span className="text-indigo-400">Sua Marca.</span> Seu Link.
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {/* Mockup 1: Clean White */}
                        <ThemeMockup
                            theme="clean_white"
                            name="Clean White"
                            username="@minimalist"
                            bgClass="bg-gray-100"
                            textClass="text-gray-900"
                            btnClass="bg-white shadow-sm border border-gray-200 text-gray-900"
                        />

                        {/* Mockup 2: Neon Green */}
                        <ThemeMockup
                            theme="neon_green"
                            name="Neon Green"
                            username="@gamer_pro"
                            bgClass="bg-black"
                            textClass="text-green-400"
                            btnClass="bg-black border border-green-500 text-green-400 hover:bg-green-500/10"
                            isCenter={true}
                        />

                        {/* Mockup 3: Dark Galaxy */}
                        <ThemeMockup
                            theme="galaxy"
                            name="Dark Galaxy"
                            username="@stardust"
                            bgClass="bg-gradient-to-b from-indigo-900 to-black"
                            textClass="text-white"
                            btnClass="bg-white/10 backdrop-blur-md border border-white/20 text-white"
                        />
                    </div>
                </div>
            </section>

            {/* Section 3: CTA */}
            <section className="relative z-10 py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        Pronto para criar sua <br />
                        BioPage Profissional?
                    </h2>
                    <p className="text-xl text-white/60">
                        Comece agora e tenha seu link exclusivo em minutos. É grátis!
                    </p>

                    <Link to="/register">
                        <button className="text-xl px-10 py-5 rounded-full font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-2xl shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                            Criar Minha Conta Grátis Agora
                        </button>
                    </Link>

                    <p className="text-sm text-white/30 pt-4">
                        Não é necessário cartão de crédito.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full p-8 text-center text-white/20 text-sm z-10 border-t border-white/5">
                <p>
                    &copy; 2025 BioPage. Todos os direitos reservados - <a href="http://instagram.com/gabriel.campos011" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Gabriel Campos</a>.
                </p>
            </footer>
        </div>
    );
};

// Mini Mockup Component
const ThemeMockup: React.FC<{
    theme: string;
    name: string;
    username: string;
    bgClass: string;
    textClass: string;
    btnClass: string;
    isCenter?: boolean;
}> = ({ theme, name, username, bgClass, textClass, btnClass, isCenter }) => (
    <div className={`flex flex-col items-center gap-6 group ${isCenter ? 'md:-mt-12' : ''}`}>
        <div className={`relative w-full aspect-[9/19] max-w-[280px] rounded-[2.5rem] border-8 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2 ${isCenter ? 'shadow-indigo-500/20' : ''}`}>
            {/* Screen Content */}
            <div className={`w-full h-full p-6 flex flex-col items-center pt-12 ${bgClass}`}>

                {/* Avatar */}
                <div className={`w-20 h-20 rounded-full mb-4 ${theme === 'clean_white' ? 'bg-gray-300' : 'bg-white/20'}`}></div>

                {/* Username */}
                <div className={`h-4 w-24 rounded-full mb-2 ${theme === 'clean_white' ? 'bg-gray-300' : 'bg-white/20'}`}></div>
                <div className={`text-sm font-medium mb-8 ${textClass}`}>{username}</div>

                {/* Buttons */}
                <div className="w-full space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-full h-10 rounded-lg ${btnClass}`}></div>
                    ))}
                </div>

            </div>

            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl"></div>
        </div>

        <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
            <Link to={`/register`}>
                <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 mx-auto transition-colors">
                    Usar este tema <ExternalLink size={14} />
                </button>
            </Link>
        </div>
    </div>
);
