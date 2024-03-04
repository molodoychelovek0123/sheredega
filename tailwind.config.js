const colors = require("tailwindcss/colors");


const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./shared_components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      teal: colors.cyan,
      green: colors.emerald,
      red: colors.rose,
      purple: colors.purple,
      pink: colors.pink,
      yellow: colors.yellow,
      gray: {
        50: "#F6F6F9",
        100: "#EDECF3",
        150: "#E6E3EF",
        200: "#E1DDEC",
        250: "#C9C5D5",
        300: "#b2adbe",
        400: "#918c9e",
        500: "#716c7f",
        600: "#565165",
        700: "#433e52",
        800: "#363145",
        900: "#252336",
        1000: "#1c1b2e"
      },
      blue: {
        50: "#DCEEFF",
        100: "#B4DBFF",
        200: "#85C5FE",
        300: "#4EABFE",
        400: "#2296fe",
        500: "#0084FF",
        600: "#0574e4",
        700: "#0D5DBD",
        800: "#144696",
        900: "#1D2C6C",
        1000: "#241748"
      },
      orange: {
        200: "#EB7752",
        300: "#EA6C45",
        400: "#E85C30",
        500: "#EC4815",
        600: "#DC4419",
        700: "#D04017",
        800: "#C1360F"
      }
    },
    screens: {
      xs: "400px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1440px",
      "2xl": "1920px"
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px"
    },
    extend: {
      fontSize: {
        "4.5xl": "2.5rem",
        "5.5xl": "3.75rem",
        "8.5xl": "7.5rem",
        "10xl": "10rem",
        "11xl": "11rem",
        "12xl": "12rem"
      },
      textDecoration: ["active"],
      opacity: {
        7: ".075",
        15: ".15"
      },
      padding: {
        7: "1.75rem",
        9: "2.25rem",
        15: "3.75rem"

      },
      inset: {
        15: "3.75rem"
      },
      maxWidth: {
        "8xl": "86rem"
      },
      spacing: {
        128: "32rem"
      },
      zIndex: {
        "-1": "-1"
      }

    }
  },
  variants: {
    extend: { typography: ["tint", "dark", "primary"] }
  },
  plugins: [plugin(({ addComponents, _ }) => {
    addComponents({
      ".a-centered": {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      },
      ".a-x-centered": {
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0)"
      },
      ".a-y-centered": {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%) !important"
      }

    });
  })]
};
