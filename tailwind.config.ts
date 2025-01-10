import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        high: ["var(--font-high)"],
        sans: ["var(--font-sans)"],
        jakarta: ["var(--font-jakarta)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
