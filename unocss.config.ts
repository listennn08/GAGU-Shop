import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  theme: {
    colors: {
      primary: '#333d51',
    },
  },
  // core options
  shortcuts: [
    [
      'logo',
      'text-4xl no-underline leading-tight text-primary font-extrabold hover:text-primary/90',
    ],
    [
      'navbar-item',
      'text-lg no-underline leading-tight text-primary font-extrabold hover:text-primary/90',
    ],
    ['min-h-app-screen', 'min-h-[calc(100vh-162px)]'],
  ],
  rules: [],
  safelist: [
    'i-fa-solid-minus',
    'i-fa-solid-plus',
    'i-fa-solid-angle-double-up',
    'i-fa-solid-angle-double-down',
    'i-fa-solid-check',
    'i-fa-solid-exclamation-triangle',
  ],
})
