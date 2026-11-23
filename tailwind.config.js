module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#6B5B69",
          light: "#81707E",
          deep: "#4C3D4A",
        },
        gold: {
          DEFAULT: "#CBA94B",
          light: "#D4B97B",
        },
        cream: "#F5F2ED",
        ink: "#1A1A1A",
        muted: "#6B7280",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
};
