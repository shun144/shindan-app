import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "1/12": "8.33%",
        "2/12": "16.67%",
        "3/12": "25%",
        "4/12": "33.33%",
        "5/12": "41.67%",
        "6/12": "50%",
        "7/12": "58.33%",
        "8/12": "66.67%",
        "9/12": "75%",
        "10/12": "83.33%",
        "11/12": "91.67%",
        "12/12": "100%",
      },
    },
  },
  plugins: [
    forms,
    function ({ addUtilities, theme }) {
      const topValues = theme("spacing");

      const customTopUtilities = Object.entries(topValues).reduce((acc, [key, value]) => {
        acc[`.react-flow__panel.top.panel-top-${key}`] = {
          top: value,
        };
        return acc;
      }, {});
      // ユーティリティを追加
      addUtilities(customTopUtilities, ["responsive"]);
    },
  ],
};
