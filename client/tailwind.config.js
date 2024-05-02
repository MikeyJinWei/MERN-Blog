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
        btnPrimaryText: "rgb(var(--btn-primary-text))",

        bgPrimary: "rgb(var(--bg-primary))",
        bgSecondary: "rgb(var(--bg-secondary))",
        bgLightGrey: "rgb(var(--bg-light-grey))",
        btnDefault: "rgb(var(--btn-default))",
        btnPrimary: "rgb(var(--btn-primary))",
        btnDefaultActive: "rgb(var(--btn-default-active))",
        btnWarning: "rgb(var(--btn-warning))",

        borderPrimary: "rgb(var(--border-primary))",
        borderSecondary: "rgb(var(--border-secondary))",

        inputPrimaryBorder: "rgb(var(--input-primary-border))",

        shadowPrimary: "rgb(var(--shadow-primary))",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
