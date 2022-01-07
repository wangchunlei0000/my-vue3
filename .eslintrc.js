module.exports = {
  // 扩展
  extends: ['plugin:vue/vue3-essential', 'eslint:all', '@vue/prettier'],
  plugins: ['vue'],
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
  // 解析器配置
  root: true,
  // 预设环境全局变量
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // globals方式预设变量，防止eslint报错writable|readonly
  globals: {
    BUILD_TAG: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 规则
    semi: ['error', 'never'],
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-alert': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': 'warn',
    'sort-keys': 'off',
    'no-magic-numbers': 'off',
    'sort-imports': 'off',
    'no-ternary': 'off',
    'capitalized-comments': 'off',
    'one-var': ['error', 'never'],
    'require-unicode-regexp': 'off',
    'prettier/prettier': 'error',
    'prefer-named-capture-group': 'off',
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    complexity: 'off',
    camelcase: ['error', { properties: 'never' }],
    'id-length': 'off',
    'require-atomic-updates': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'multiline-comment-style': 'off',
    'no-bitwise': 'off',
    'new-cap': 'off',
    'no-warning-comments': 'off',
    'no-undefined': 'off',
  },
}
