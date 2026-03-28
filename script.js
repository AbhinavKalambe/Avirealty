// Tailwind config
tailwind.config = {
    theme: {
        extend: {
            colors: {
                emerald: { 900: '#064e3b', 950: '#022c22' },
                amber: { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' },
                stone: { 
                    50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4',
                    300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c',
                    600: '#57534e', 800: '#292524', 900: '#1c1917'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'pulse-slow': 'pulse 3s infinite',
            }
        }
    }
};


// ===== YOUR FULL JS (UNCHANGED) =====
// Paste everything from your original file here

// Example start:
const PROJECTS = [/* SAME DATA */];

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    document.getElementById('year-main').textContent = new Date().getFullYear();
    document.getElementById('year-landing').textContent = new Date().getFullYear();
    renderHomeLocations();
    renderProjectsList();
});

// KEEP ALL FUNCTIONS SAME (navigate, renderProjectsList, etc.)