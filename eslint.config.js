import humanmadeConfig from '@humanmade/eslint-config';
import reactPlugin from 'eslint-plugin-react';

export default [
	{
		ignores: [
			'vendor/**',
			'node_modules/**',
			'build/**',
		],
	},
	...humanmadeConfig,
	{
		files: [ '**/*.{js,jsx,mjs}' ],
		plugins: {
			react: reactPlugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',
		},
	},
	{
		files: [ 'scripts/**/*.mjs' ],
		rules: {
			'no-console': 'off',
		},
	},
	{
		files: [ '**/*.test.js' ],
		languageOptions: {
			globals: {
				describe: 'readonly',
				expect: 'readonly',
				it: 'readonly',
			},
		},
	},
];
