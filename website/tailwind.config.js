import daisyui from './node_modules/daisyui'
import animate from './node_modules/tailwindcss-animate'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    animate,
  ],
}