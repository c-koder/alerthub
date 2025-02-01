/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F0E0FF",
          200: "#D8B8FF",
          300: "#C090FF",
          400: "#A868FF",
          500: "#832AFF", // Updated primary
          600: "#6A22CC",
          700: "#511A99",
          800: "#391266",
          900: "#210A33",
        },
        secondary: {
          100: "#E4D6FF",
          200: "#C9ADFF",
          300: "#AF84FF",
          400: "#945BFF",
          500: "#6B30D1", // Darker than primary
          600: "#5526A6",
          700: "#401C7A",
          800: "#2B1250",
          900: "#160A26",
        },
        dark: {
          100: "#3E2B66",
          200: "#35255A",
          300: "#2C1F4D",
          400: "#231940",
          500: "#1A1333", // Darker base color
          600: "#140F29",
          700: "#0E0A1F",
          800: "#080515",
          900: "#03020A",
        },
        light: {
          100: "#FAF0FF",
          200: "#F5E0FF",
          300: "#EFD0FF",
          400: "#EAC0FF",
          500: "#E5B0FF", // Light variant of primary
          600: "#C799E6",
          700: "#AA82CC",
          800: "#8C6BB3",
          900: "#6F5499",
        },
      },
    },
  },
  plugins: [],
};
