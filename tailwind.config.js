module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        sidebar: "calc(100vh - 64px)",
        sidebarstatic: "800px",
        sidebarsmall: "25vh",
        canvasSmall: "24rem",
        canvasLarge: "40rem",
      },
      width: {
        mobilecontent: "90%",
        smallCanvas: "250px",
        actionBar: "6.66%",
        canvasSmall: "24rem",
        canvasLarge: "40rem",
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
        main: "var(--bg-main)",
        focus: "var(--bg-focus)",
        light: "var(--light)",
        mid: "var(--mid)",
        highcontrast: "var(--high-contrast)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};