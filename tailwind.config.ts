import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeGrey: "#232323",
        themeBlack: "#0D0D0D",
        themeMetal: "#C5C0C0",
        themeRed: "#AB0404",
        themeDarkerRed: "#700303",
        themeUnactiveRed: "#5B0C0C",
      },
    },
  },
  plugins: [],
};

export default config;
