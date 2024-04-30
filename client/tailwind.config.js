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

        bgPrimary: "rgb(var(--bg-primary))",

        bgSecondary: "rgb(var(--bg-secondary))",

        borderPrimary: "rgb(var(--border-primary))",
        borderSecondary: "rgb(var(--border-secondary))",

        hoverBgDefault: "rgb(var(--hover-bg-default))",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
