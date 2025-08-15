module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      scrollBehavior: ['smooth'],
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-medium': 'spin 20s linear infinite',
        'spin-fast': 'spin 10s linear infinite',
      },
    },
  },
  plugins: [],
};
