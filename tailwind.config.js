import { colors } from "./src/presentation/styles/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        days_one: ["DaysOne_400Regular"],
        lemon: ["Lemon_400Regular"],
        lexend: ["Lexend_400Regular", "Lexend_700Bold"],
      },
      lineHeight: {
        "extra-loose": "1.1",
      },
    },
  },
  plugins: [],
};
