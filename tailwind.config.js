/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Arial",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        "BIZ UDPGothic",
        "Meiryo",
        "sans-serif",
      ],
      serif: ["serif"],
    },
  },
  plugins: [],
};
