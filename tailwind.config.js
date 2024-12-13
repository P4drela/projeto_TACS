/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'serif', 'monospace'], 
      },
    },
  },
  variants: {
    extend: {
      fill: ['hover', 'focus'], 
      stroke: ['hover', 'focus'], 
    },
  },
  plugins: [],
};
