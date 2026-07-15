import designPreset from '../tailwind-preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [designPreset],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
