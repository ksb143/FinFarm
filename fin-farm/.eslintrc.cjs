module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  parserOptions: {
    ecmaVersion: 12, // ES2021
    sourceType: 'module', // 모듈 시스템 사용
  },

  settings: {
    'import/resolver': {
      typescript: {
        // Vite와 같이 사용하는 프로젝트의 tsconfig 경로를 지정합니다.
        // project 키를 사용해 tsconfig.json의 위치를 정확히 지정할 수 있습니다.
        project: './tsconfig.json',
      },
    },
  },
};
