module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        sidebar: "calc(100vh - 48px)",
        sidebarsmall: "calc(100vh - 48px - 585px )",
      },
      width: {
        mobilecontent: "90%",
        smallCanvas: "375px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
