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
        // Wonderlust Butter Yellow Theme
        'butter': '#FBE79B',
        'cream': '#FFF8E7',
        'glow': '#FFE18C',
        'charcoal': '#3C3C3C',
        'charcoal-light': '#6B6B6B',
        'textsoft': '#3C3C3C',
        'textlight': '#6B6B6B',
      },
      boxShadow: {
        'warm': '0 8px 20px rgba(245, 230, 211, 0.4)',
        'glow-butter': '0 0 25px rgba(255, 225, 140, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
