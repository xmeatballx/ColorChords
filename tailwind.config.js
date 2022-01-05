module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        sidebar: "calc(100vh - 64px)",
        sidebarsmall: "25vh",
      },
      width: {
        mobilecontent: "90%",
        smallCanvas: "250px",
      },
      colors: {
        "adobe-gray-50": "#ffffff",
        "adobe-gray-100": "#fafafa",
        "adobe-gray-200": "#eaeaea",
        "adobe-gray-300": "#e1e1e1",
        "adobe-gray-400": "#cacaca",
        "adobe-gray-500": "#b3b3b3",
        "adobe-gray-600": "#8e8e8e",
        "adobe-gray-700": "#6e6e6e",
        "adobe-gray-800": "#4b4b4b",
        "adobe-gray-900": "#2c2c2c",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
