import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  // core options
  shortcuts: [],
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
