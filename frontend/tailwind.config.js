/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      boxShadow: { card: "0 10px 30px -12px rgba(99,102,241,0.25)" },
      keyframes: { pop: { "0%": { transform: "scale(.9)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } } },
      animation: { pop: "pop .3s ease-out" },
    },
  },
  plugins: [],
};
