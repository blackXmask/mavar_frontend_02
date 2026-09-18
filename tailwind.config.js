/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#050914",
          900: "#070B14",
          850: "#0A0F1C",
          800: "#0C1222",
          700: "#101830",
          600: "#16203A",
        },
        line: {
          DEFAULT: "rgba(99,125,180,0.16)",
          strong: "rgba(99,125,180,0.28)",
        },
        accent: {
          blue: "#4D7CFE",
          indigo: "#6366F1",
          violet: "#8B5CF6",
          cyan: "#22D3EE",
          green: "#34D399",
          amber: "#F59E0B",
          red: "#F87171",
        },
        text: {
          primary: "#E6ECF8",
          secondary: "#94A3C4",
          muted: "#5B6A8F",
          faint: "#3D4A6B",
        },
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        micro: ["10px", "14px"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(77,124,254,0.25), 0 0 24px rgba(77,124,254,0.15)",
        card: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(2,6,18,0.5)",
        lift: "0 12px 32px rgba(2,6,18,0.65), 0 0 0 1px rgba(99,125,180,0.25)",
      },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "flow-line": "flowLine 1.6s linear infinite",
        "blink-caret": "blinkCaret 1.1s step-end infinite",
        fadeup: "fadeUp 0.35s ease-out both",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        flowLine: {
          "0%": { strokeDashoffset: "12" },
          "100%": { strokeDashoffset: "0" },
        },
        blinkCaret: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};