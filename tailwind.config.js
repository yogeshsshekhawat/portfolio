/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        neutral: {
          950: '#0a0a0a',
        }
      },
      letterSpacing: {
        superwide: '0.25em',
      }
    },
  },
  plugins: [],
}
