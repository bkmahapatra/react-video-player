/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-stale-primary": "#1C1C24",
        "custom-stale-primary-light": "#292A32",
        "custom-stale-secondary": "#12141B",
        "custom-blue-light": "#007AFF",
      },
    },
  },
  plugins: [],
};
