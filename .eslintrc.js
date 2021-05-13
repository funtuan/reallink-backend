module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    'require-jsdoc': 0,
    'max-len': 0,
    'semi': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'new-cap': ['error', { 'capIsNew': false }],
  },
}
