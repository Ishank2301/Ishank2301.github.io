module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'glass': 'rgba(15, 23, 42, 0.6)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'accent': '#10b981'
      },
      backdropBlur: {
        md: '12px'
      }
    }
  },
  plugins: []
}
