import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettierConfig,
  {
    rules: {
      // 自定義ESLint規則
      'react/react-in-jsx-scope': 'off', // 在Next.js中不需要引入React
      'jsx-a11y/anchor-is-valid': 'warn', // 提醒可能的可訪問性問題
      'no-unused-vars': 'warn', // 警告未使用的變量
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 允許不明確的返回類型

      // 嚴格的JSX規則
      'react/prop-types': 'off', // 使用TypeScript時不需要prop-types
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': 'warn',
    },
    ignores: ['.next/', 'node_modules/', 'out/', 'public/', 'next-env.d.ts'],
  },
];

export default eslintConfig;
