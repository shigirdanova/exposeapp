module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	plugins: ['@typescript-eslint', 'compat', 'import', 'unicorn'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-essential',
		'@vue/eslint-config-typescript',
		'plugin:compat/recommended',
		'eslint:recommended',
		'@vue/eslint-config-prettier',
	],

	rules: {
		'no-console': 'warn',
		'no-debugger': 'warn',
		'comma-dangle': ['error', 'always-multiline'],
		'arrow-parens': ['error', 'always'],
		'unicorn/filename-case': [
			'warn',
			{
				case: 'kebabCase',
			},
		],
		'object-property-newline': [
			'error',
			{
				allowAllPropertiesOnSameLine: false,
			},
		],
		'no-else-return': 'error',
		'no-unneeded-ternary': 'error',
		'no-unsafe-optional-chaining': 'warn',
		'vue/multi-word-component-names': 'off',
		'vue/no-reserved-component-names': 'off',
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 3,
				multiline: 1,
			},
		],
		'vue/first-attribute-linebreak': [
			'error',
			{
				singleline: 'ignore',
				multiline: 'below',
			},
		],
		'vue/v-on-event-hyphenation': [
			'error',
			'always',
			{
				autofix: true,
			},
		],
		'vue/attributes-order': [
			'error',
			{
				order: [
					'CONDITIONALS',
					'DEFINITION',
					'LIST_RENDERING',
					'RENDER_MODIFIERS',
					'TWO_WAY_BINDING',
					'GLOBAL',
					['UNIQUE', 'SLOT'],
					'OTHER_DIRECTIVES',
					['ATTR_STATIC', 'ATTR_DYNAMIC', 'ATTR_SHORTHAND_BOOL'],
					'EVENTS',
					'CONTENT',
				],
				alphabetical: false,
			},
		],
		'vue/html-quotes': ['error', 'double', { avoidEscape: false }],
		'vue/order-in-components': [
			'error',
			{
				order: [
					['template', 'render'],
					'el',
					'name',
					'key',
					'parent',
					'functional',
					['delimiters', 'comments'],
					['components', 'directives', 'filters'],
					'extends',
					'mixins',
					['provide', 'inject'],
					'ROUTER_GUARDS',
					'layout',
					'middleware',
					'validate',
					'scrollToTop',
					'transition',
					'loading',
					'inheritAttrs',
					'model',
					'emits',
					['props', 'propsData'],
					'setup',
					'asyncData',
					'data',
					'fetch',
					'head',
					'computed',
					'watch',
					'watchQuery',
					'LIFECYCLE_HOOKS',
					'methods',
					'renderError',
				],
			},
		],
		'vue/block-tag-newline': [
			'error',
			{
				singleline: 'ignore',
				multiline: 'always',
				maxEmptyLines: 1,
			},
		],
		'vue/html-button-has-type': [
			'error',
			{
				button: true,
				submit: true,
				reset: true,
			},
		],
		'prefer-rest-params': 1,
	},

	overrides: [
		{
			files: ['scripts/*', '_templates/**', '*.js'],
			env: {
				node: true,
			},
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'no-console': 'off',
			},
		},
	],
}
