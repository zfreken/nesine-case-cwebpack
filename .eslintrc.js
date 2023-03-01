module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [ 'airbnb', 'plugin:prettier/recommended' , 'prettier'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
	  'react-hooks',
	  'prettier'
  ],
  rules: {
  },
};
