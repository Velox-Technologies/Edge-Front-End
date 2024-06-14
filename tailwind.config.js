const { text } = require("stream/consumers");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        Manrope: ["Manrope", "sans-serif"],
      },
      colors: {
        TF: {
          primary: "#0D1117",
          accent: "#FF5A5F",
          text: "#d7d7d7",
          textSecondary: "#d7d7d788",
        },
      },
    },
  },
  plugins: [],
};
