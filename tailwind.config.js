/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,css,vue,jsx,ts,tsx}"],
  theme: {
    screens: {
      'tablet': '1023px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

