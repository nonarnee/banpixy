import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // auto import
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'import/prefer-default-export': 'warn',
    },
    overrides: [
      {
        files: ['*.jsx', '*.tsx'],
        rules: {
          '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
      },
    ],
  },
];

export default eslintConfig;
