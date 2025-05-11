/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  // <== Penting agar semua komponen React terbaca
  ],
  safelist: [
    'blob', 'blob-1', 'blob-2', 'blob-3'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
