/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest", "winter", "dim"],
  },
}

