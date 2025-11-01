import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom theme colors
        'electric-cyan': '#00E5FF',
        'deep-indigo': '#3730A3',
        'indigo': {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        'coral': {
          200: '#FFCCCB',
          400: '#FF8A80',
          500: '#FF7F50',
          600: '#FF6B6B',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 229, 255, 0.3)',
        'glow-indigo': '0 0 20px rgba(79, 70, 229, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
