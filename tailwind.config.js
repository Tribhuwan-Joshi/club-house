/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{pug,html}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        res: "repeat(auto-fit,minmax(250px,500px)",
      },
    },
  },
  plugins: [],
};
