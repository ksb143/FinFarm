module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',  // TypeScript 규칙을 적용합니다.
    'plugin:react-hooks/recommended',  // React Hooks 규칙을 적용합니다.
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],  // 무시할 파일/폴더 패턴을 지정합니다.
  parser: '@typescript-eslint/parser',  // TypeScript 파싱을 위한 파서를 지정합니다
  plugins: ['react-refresh'],  // 사용할 플러그인 목록입니다.
  rules: {
    'react-refresh/only-export-components': [
      'warn',  // 컴포넌트만을 export할 때 경고를 출력합니다.
      { allowConstantExport: true },
    ],
  },
}
