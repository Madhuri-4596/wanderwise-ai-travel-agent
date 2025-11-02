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
        sunset: {
          light: '#FFF4E0',
          medium: '#FFD8B5',
          card: '#FFF',
          hover: '#FFE2C2',
          text: '#4B3832',
          accent: '#FF7F50',
        },
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(180deg, #FFF4E0, #FFD8B5)',
      },
      boxShadow: {
        'sunset': '0 4px 20px rgba(255, 140, 0, 0.2)',
        'sunset-hover': '0 8px 30px rgba(255, 140, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
