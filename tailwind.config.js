/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "1xl": ["30px", "34.38px"],
      "2xl": ["40px", "44.38px"],
      "3xl": ["50px", "54.38px"],
      "4xl": ["60px", "64.38px"],
      "6xl": ["80px", "84.38px"],
      "7xl": ["90px", "94.38px"],
      "8xl": ["100px", "104.38px"],
    },
    extend: {},
  },
  plugins: [],
};
