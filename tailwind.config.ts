import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#f0efe6",
        red: "#b84033",
        yellow: "#ebb33e",
        blue: "#2e64a9",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        grid: "4.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
