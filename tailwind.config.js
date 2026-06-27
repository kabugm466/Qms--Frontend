/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#1E3A8A",
          light: "#2a4fa0",
          dark: "#162d6e",
          sidebar: "#1a3378",
        },
        green: {
          brand: "#00A86B",
          hover: "#008f5a",
          light: "#F0FDF4",
        },
        gold: {
          brand: "#FBBF24",
          light: "#FEF9C3",
        },
        page: "#F0F4FF",
      },
    },
  },
  plugins: [],
};
