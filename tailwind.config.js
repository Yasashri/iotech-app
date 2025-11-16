/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          brown: "#4B2615",
          white: "#FFFFFF",
        },
        surface: "#111111",
        brown: {
          500: "#8B5E3C",
          600: "#6F4627",
          700: "#4A2E18",
        },
        navbar: "#4B2615",
      },
    },
  },
  plugins: [],
};
