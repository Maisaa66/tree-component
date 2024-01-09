module.exports = {
  env: {
    "browser": true,
    "node": true,
    "es2021": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
    
  ],
  ignorePatterns: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: ".",
    createDefaultProgram: true,
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "import"
  ],
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 0,
    'object-shorthand': 0,
    'import/order': 0,
    'yoda': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'indent': ['error', 2, { SwitchCase: 1 }],
    'no-plusplus': 0,
    'no-continue': 0,
    'prefer-object-spread': 'warn',
    'react/jsx-boolean-value': 0,
    'import/no-webpack-loader-syntax': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/no-array-index-key': 0,
    'no-case-declarations': 0,
    'max-classes-per-file': 0,
    'import/no-duplicates': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/no-namespace': 0,
    'no-bitwise': 0,
    'global-require': 0,
    'no-await-in-loop': 'warn',
    'jest/no-mocks-import': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-cycle': 'warn',
    'import/extensions': 0,
    'react/jsx-filename-extension': ['error', { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    'lines-between-class-members': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    'react/function-component-definition': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'no-restricted-syntax': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 0,
  }
}
