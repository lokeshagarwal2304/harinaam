import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spiritual: {
          canvas: "#FAF8F5",       // Sacred parchment warm white
          ink: "#23201D",          // Deep sacred ink black
          saffron: "#E06D1A",      // Traditional saffron / bhagwa
          gold: "#D4AF37",         // Subtle divine gold
          maroon: "#800020",       // Sacred vermilion / maroon
          slate: "#3A3530",        // Writing slate deep grey
          border: "#EADDCF",       // Subtle paper border
          muted: "#8C8275"         // Serene muted text
        }
      },
      fontFamily: {
        devanagari: ["var(--font-devanagari)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
