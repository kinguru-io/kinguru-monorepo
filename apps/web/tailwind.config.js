const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "kinguru": {
          extend: "light",
          colors: {
            background: "#ffffff",
            foreground: "#000000",
            primary: {
              50: "#806c00",
              100: "#998200",
              200: "#b39700",
              300: "#ccad00",
              400: "#e6c200",
              500: "#FFD800",
              600: "#ffe033",
              700: "#ffe866",
              800: "#ffec80",
              900: "#ffef99",
              DEFAULT: "#FFD800",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#000000",
              100: "#080808",
              200: "#111111",
              300: "#191919",
              400: "#222222",
              500: "#2a2a2a",
              600: "#555555",
              700: "#7f7f7f",
              800: "#aaaaaa",
              900: "#d4d4d4",
              DEFAULT: "#2a2a2a",
              foreground: "#ffffff",
            },
            focus: "#ffea00",
          },
        },
      },
    })
  ],
}