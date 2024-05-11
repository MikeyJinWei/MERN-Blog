/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],

  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        ghost: "rgb(var(--ghost))",
        warning: "rgb(var(--warning))",
        paper: "rgb(var(--paper))",
        whitesmoke: "rgb(var(--whitesmoke))",
        lightGrey: "rgb(var(--light-grey))",
        grey: "rgb(var(--grey))",
        darkerGrey: "rgb(var(--darker-grey))",
        dark: "rgb(var(--dark))",
        shadowPrimary: "rgb(var(--shadow-primary))",
        borderPrimary: "rgb(var(--border-primary))",
        borderSecondary: "rgb(var(--border-secondary))",

        // textPrimary: "rgb(var(--text-primary))",
        // textLight: "rgb(var(--text-light))",
        // btnPrimaryText: "rgb(var(--btn-primary-text))",
        // bgPrimary: "rgb(var(--bg-primary))",
        // bgSecondary: "rgb(var(--bg-secondary))",
        // bgLightGrey: "rgb(var(--bg-light-grey))",
        // btnDefault: "rgb(var(--btn-default))",
        // btnPrimary: "rgb(var(--btn-primary))",
        // btnDefaultActive: "rgb(var(--btn-default-active))",
        // btnWarning: "rgb(var(--btn-warning))",
        // inputPrimaryBorder: "rgb(var(--input-primary-border))",
        // shadowPrimary: "rgb(var(--shadow-primary))",
        // whitesmoke: "rgb(var(--whitesmoke))",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
