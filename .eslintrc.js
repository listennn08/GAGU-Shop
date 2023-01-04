module.exports = {
  extends: ['./base'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
      env: {
        browser: true,
        es2021: true,
        'vue/setup-compiler-macros': true,
      },
      extends: ['plugin:vue/vue3-recommended'],
      plugins: ['nuxt', 'vue'],
      rules: {
        'max-len': 0,
        'no-undef': 0,
        'vue/multi-word-component-names': 0,
        'vue/max-len': [
          'error',
          {
            code: 80,
            template: 300,
          },
        ],
        'vue/no-v-html': 0,
        'vue/script-setup-no-uses-vars': 0,
      },
    },
  ],
}
