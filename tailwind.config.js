/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        synthwave: {
          ...require("daisyui/src/theming/themes")["night"],
          "*": {
            color: "white",
          },
          input: {
            color: "black",
          },
        },
      },
      {
        emerald: {
          ...require("daisyui/src/theming/themes")["emerald"],
          "*": {
            color: "black",
          },
          input: {
            color: "black",
          },
          ".AddToCart": {
            // Corrected this part to ensure valid JavaScript object notation

            color: "white",
          },
        },
      },
      "emerald",
      "synthwave",
    ],
  },
};
