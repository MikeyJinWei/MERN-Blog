/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],

  theme: {
    extend: {
      colors: {
        whitesmoke: "rgb(var(--whitesmoke))",

        secondary: "rgb(var(--secondary))",

        textPrimary: "rgb(var(--text-primary))",
        textLight: "rgb(var(--text-light))",

        bgPrimary: "rgb(var(--bg-primary))",
        bgSecondary: "rgb(var(--bg-secondary))",
        bgLightGrey: "rgb(var(--bg-light-grey))",

        borderPrimary: "rgb(var(--border-primary))",
        borderSecondary: "rgb(var(--border-secondary))",

        btnPrimary: "rgb(var(--btn-primary))",
        btnPrimaryText: "rgb(var(--btn-primary-text))",
        btnDefaultHover: "rgb(var(--btn-default-hover))",
        btnGhost: "rgb(var(--btn-primary))",
        btnGhostText: "rgb(var(--btn-primary-text))",

        shadowPrimary: "rgb(var(--shadow-primary))",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
