/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // adjust according to your project structure
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderColor: {
        border: 'hsl(var(--border))',
      },
      backgroundColor: {
        background: 'hsl(var(--background))',
      },
      textColor: {
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
};
