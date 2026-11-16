import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AmanDevs Brand Colors
        brand: {
          black: "#000000",
          lime: "#D2F946",
          white: "#FFFFFF",
          surface: "#0B120E",
        },
        ink: {
          DEFAULT: "#000000",
          light: "#0B120E",
          muted: "#141F19",
          soft: "#1C2A22",
        },
        surface: {
          DEFAULT: "#0B120E",
          card: "#111A15",
          border: "#1E2E25",
          light: "#18241D",
        },
        paper: {
          DEFAULT: "#F7F8F5",
          card: "#FFFFFF",
          muted: "#EFEFEA",
          border: "#E2E4DC",
        },
        lime: {
          DEFAULT: "#D2F946",
          hover: "#C1E838",
          light: "#F0FDC2",
          dark: "#A3C724",
        },
        violet: {
          DEFAULT: "#8B75FF",
          hover: "#755CF6",
          light: "#EAE6FF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        body: ["var(--font-body)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
} satisfies Config;
