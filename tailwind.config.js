/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"], 
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'], // Font utama
        kids: ['"Fredoka"', 'sans-serif'], // Font khusus headline anak
      },
      colors: {
        // Warna Yayasan (Tetap dipertahankan sebagai Core Identity)
        primary: {
          50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
          400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
          800: '#065f46', 900: '#064e3b', 950: '#022c22',
        },
        // Warna Tambahan "Playful" (Pastel Modern)
        kids: {
            blue: '#60A5FA',
            yellow: '#FBBF24',
            pink: '#F472B6',
            purple: '#A78BFA',
            orange: '#FB923C'
        },
        // warna utama
        secondary: {
          500: '#d4af37',
          600: '#b4942b',
        },
        dark: {
            bg: '#0f172a', card: '#1e293b', border: '#334155'
        }
      },
      // KHUSUS TK INDEX
      backgroundImage: {
        'pattern-paper': "url('https://www.transparenttextures.com/patterns/graphy.png')", // Tekstur halus
      },
      // KHUSUS TK INDEX
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)', // KHUSUS TK INDEX
        'glow-primary': '0 0 20px rgba(16, 185, 129, 0.4)', // KHUSUS TK INDEX
        'glow': '0 0 20px rgba(16, 185, 129, 0.5)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '4xl': '2.5rem',
      }
    },
  },
  plugins: [],
}