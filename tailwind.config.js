module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.tsx'],
  },
  darkMode: 'media', // false | 'media' | 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
