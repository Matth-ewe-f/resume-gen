import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        grotesk: ['var(--font-grotesk)'],
        roboto: ['var(--font-roboto)'],
      },
      letterSpacing: {
        ultra: '0.2em',
      },
      fontSize: {
        "mini": "0.65rem",
        "sm": "0.85rem",
        "base": "1rem",
        "4.5xl": '2.375rem',
      }
    },
  },
  plugins: [],
};
export default config;
