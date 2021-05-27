module.exports = {
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue'],
    options: {
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/
      ]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    theme: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
