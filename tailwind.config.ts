import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F25D9C",
        "blush-soft": "#F8A8C8",
        "blush-bg": "#FDEAF2",
        cocoa: "#4A2A24",
        "cocoa-soft": "#7A4A3A",
        cream: "#FFF7F2",
        gold: "#D9A65A",
        ink: "#1F1A17"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(242, 93, 156, 0.20)",
        card: "0 18px 60px rgba(74, 42, 36, 0.10)"
      },
      backgroundImage: {
        "hero-wash":
          "radial-gradient(circle at top left, rgba(248, 168, 200, 0.55), transparent 34%), radial-gradient(circle at top right, rgba(217, 166, 90, 0.22), transparent 22%), linear-gradient(180deg, #FFF7F2 0%, #FDEAF2 100%)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      }
    }
  },
  plugins: []
};

export default config;
