export type ThemeType = 'clean_white' | 'galaxy' | 'neon_green' | 'sunset_gradient' | 'default_dark';

export interface ThemeConfig {
    name: string;
    pageBackground: string;
    containerStyle: string;
    buttonStyle: string;
    textColor: string;
    descriptionStyle?: string;
}

export const themes: Record<ThemeType, ThemeConfig> = {
    default_dark: {
        name: 'Default Dark',
        pageBackground: 'bg-gray-900',
        containerStyle: 'bg-transparent',
        buttonStyle: 'bg-surface hover:bg-lead-black text-white transition-all duration-300',
        textColor: 'text-white',
        descriptionStyle: 'text-gray-400'
    },
    clean_white: {
        name: 'Clean White',
        pageBackground: 'bg-gray-100',
        containerStyle: 'bg-white shadow-xl rounded-2xl p-6',
        buttonStyle: 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all duration-300 shadow-sm',
        textColor: 'text-gray-900',
        descriptionStyle: 'text-gray-600'
    },
    galaxy: {
        name: 'Dark Galaxy',
        pageBackground: 'bg-[url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop")] bg-cover bg-center bg-no-repeat bg-fixed',
        containerStyle: 'bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6',
        buttonStyle: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300',
        textColor: 'text-white',
        descriptionStyle: 'text-gray-300'
    },
    neon_green: {
        name: 'Neon Green',
        pageBackground: 'bg-black',
        containerStyle: 'bg-transparent',
        buttonStyle: 'bg-[#a3e635] text-black font-bold rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(163,230,53,0.5)] transition-all duration-300',
        textColor: 'text-[#a3e635]',
        descriptionStyle: 'text-gray-400'
    },
    sunset_gradient: {
        name: 'Sunset Gradient',
        pageBackground: 'bg-gradient-to-br from-purple-600 to-blue-600',
        containerStyle: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6',
        buttonStyle: 'border border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300',
        textColor: 'text-white',
        descriptionStyle: 'text-white/80'
    }
};
