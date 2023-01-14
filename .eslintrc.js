module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // parser: '@babel/eslint-parser',

  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false, // <== ADD THIS
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },

  plugins: [
    'jsx-a11y',
    'react',
  ],
  rules: {
    'no-console': 'warn',
    'import/prefer-default-export': 'warn',
    'no-console': [
      'error',
      {
        allow: ['time', 'timeEnd'],
      },
    ],
    'no-unused-vars': ['error', { 'args': 'none' }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
