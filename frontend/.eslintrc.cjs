module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'functional/no-conditional-statements': 'off',
    'functional/no-expression-statements': 'off',
    'functional/immutable-data': 'off',
    'functional/functional-parameters': 'off',
    'functional/no-try-statements': 'off',
    'functional/no-throw-statements': 'off',
    'functional/no-return-void': 'off',
    'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'testing-library/no-debug': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-fragments': ['error', 'syntax'],
    semi: ['error', 'always'],
  },
  overrides: [
    {
      files: ['*.jsx'],
      rules: {
        semi: ['error', 'always'],
      },
    },
  ],
}
