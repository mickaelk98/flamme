import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF5A5F",
        secondary: "#FFC1CC",
        mainText: "#2A4D69",
        secondaryText: "#D1D1D1",
        gold: "#FFC857",
        myWhite: "#F9F9F9",
        myRed: "#E63946",
        mygreen: "#88B04B",
      },
    },
  },
  plugins: [],
};
export default config;
