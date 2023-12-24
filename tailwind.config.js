/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'BG': "url('/./assets/img/nen.jpg')",
        'CDB': "url('/./assets/img/CD.png')"
      },
      fontFamily: {
        'Regular': ['Regular','Quicksand'],
        'Header': ['Header','DM Serif Display'],
      },
    },
  },
  plugins: [],
}

