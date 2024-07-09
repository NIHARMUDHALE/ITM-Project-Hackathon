/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin.js";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(226 20% 21%)",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const typography = {
        a: {
          "letter-spacing": "-0.025rem",
        },

        hr: {
          margin: "1rem 0",
          border: "0",
          opacity: ".25",
        },

        img: {
          maxWidth: "none",
        },

        label: {
          display: "inline-block",
        },

        p: {
          "line-height": "1.625",
          "font-weight": "400",
          "margin-bottom": "1rem",
        },

        small: {
          "font-size": ".875em",
        },

        svg: {
          display: "inline",
        },

        table: {
          "border-collapse": "inherit",
        },

        "h1, h2, h3, h4, h5, h6": {
          "margin-bottom": ".5rem",
          color: "#344767",
        },

        "h1, h2, h3, h4": {
          "letter-spacing": "-0.05rem",
        },

        "h1, h2, h3": {
          "font-weight": "700",
        },
        "h4, h5, h6": {
          "font-weight": "600",
        },

        h1: {
          "font-size": "3rem",
          "line-height": "1.25",
        },
        h2: {
          "font-size": "2.25rem",
          "line-height": "1.3",
        },
        h3: {
          "font-size": "1.875rem",
          "line-height": "1.375",
        },
        h4: {
          "font-size": "1.5rem",
          "line-height": "1.375",
        },
        h5: {
          "font-size": "1.25rem",
          "line-height": "1.375",
        },
        h6: {
          "font-size": "1rem",
          "line-height": "1.625",
        },
      };
      addComponents(typography);
    }),
  ],
};
