/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./views/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                surface: "#1a1a1a",
                "lead-black": "#1C1C1C",
                primary: "#3b82f6",
                secondary: "#8b5cf6",
                accent: "#ec4899",
            },
            backgroundImage: {
                'gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-2': 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
                'gradient-3': 'linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
                'gradient-4': 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
                'gradient-5': 'linear-gradient(135deg, #FBDA61 0%, #FF5ACD 100%)',
            },
            fontFamily: {
                display: ["Plus Jakarta Sans", "sans-serif"],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-in-up': 'fadeInUp 0.5s ease-out',
                'tilt': 'tilt 10s infinite linear',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                tilt: {
                    '0%, 50%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(1deg)' },
                    '75%': { transform: 'rotate(-1deg)' },
                },
            },
        },
    },
    plugins: [],
}
