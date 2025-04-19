module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    '@typescript-eslint/ban-ts-comment': 'warn',
    
    // General rules
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-duplicate-case': 'error',
    'no-empty': 'warn',
    'no-extra-semi': 'warn',
    'no-irregular-whitespace': 'warn',
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        // Disable certain rules for declaration files
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'docs/',
    '*.js',
  ],
};
