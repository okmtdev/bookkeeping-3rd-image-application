import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        asset: '#3B82F6',
        liability: '#EF4444',
        equity: '#EAB308',
        revenue: '#F97316',
        expense: '#22C55E',
      },
    },
  },
  plugins: [],
};
export default config;
