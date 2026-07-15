// Shared Tailwind CSS preset for the Sports Jockey frontend.
//
// Usage in any app's tailwind.config.js:
//
//   import designPreset from '../tailwind-preset.js'
//   export default {
//     presets: [designPreset],
//     content: ['./src/**/*.{js,ts,jsx,tsx}'],
//   }
//
// Uses CommonJS internally for Tailwind v3 (jiti) compatibility.
// Dark mode: add class="dark" to <html> to activate dark theme.

const { readFileSync } = require('node:fs')
const { join } = require('node:path')

function loadToken(file) {
  return JSON.parse(readFileSync(join(__dirname, 'tokens', file), 'utf-8'))
}

const colors = loadToken('colors.json')
const typography = loadToken('typography.json')
const spacing = loadToken('spacing.json')
const radii = loadToken('radii.json')
const shadows = loadToken('shadows.json')

// ---------------------------------------------------------------------------
// CSS Custom Property definitions for light/dark semantic colors
// ---------------------------------------------------------------------------

// Light mode values (default)
const lightVars = {
  '--app-background': colors.ui.background.value,
  '--app-surface': colors.ui.surface.value,
  '--app-card': colors.ui.card.value,
  '--app-text-primary': colors.ui.text.primary.value,
  '--app-text-secondary': colors.ui.text.secondary.value,
  '--app-text-tertiary': colors.ui.text.tertiary.value,
  '--app-text-inverse': colors.ui.text.inverse.value,
  '--app-border': colors.ui.border.default.value,
  '--app-border-light': colors.ui.border.light.value,
  '--app-accent': colors.ui.accent.default.value,
  '--app-accent-hover': colors.ui.accent.hover.value,
  '--app-accent-light': colors.ui.accent.light.value,
}

// Dark mode overrides
const darkVars = {
  '--app-background': colors.dark.background.value,
  '--app-surface': colors.dark.surface.value,
  '--app-card': colors.dark.card.value,
  '--app-text-primary': colors.dark.text.primary.value,
  '--app-text-secondary': colors.dark.text.secondary.value,
  '--app-text-tertiary': colors.dark.text.tertiary.value,
  '--app-text-inverse': colors.dark.text.inverse.value,
  '--app-border': colors.dark.border.default.value,
  '--app-border-light': colors.dark.border.light.value,
  '--app-accent': colors.dark.accent.default.value,
  '--app-accent-hover': colors.dark.accent.hover.value,
  '--app-accent-light': colors.dark.accent.light.value,
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // Brand palette (for marketing/brand use — static, no dark mode swap)
        'brand-green': colors.brand.green.value,
        'brand-charcoal': colors.brand.charcoal.value,
        'brand-white': colors.brand.white.value,
        'brand-grey': colors.brand.grey.value,

        // Masterbrand colors (Figma: Foundation/Masterbrand Color — static)
        'mb-green': colors.masterbrand.green.value,
        'mb-green-dark': colors.masterbrand.greenDark.value,
        'mb-green-light': colors.masterbrand.greenLight.value,
        'mb-orange': colors.masterbrand.orange.value,
        'mb-orange-dark': colors.masterbrand.orangeDark.value,
        'mb-orange-light': colors.masterbrand.orangeLight.value,
        'mb-peach': colors.masterbrand.peach.value,
        'mb-peach-dark': colors.masterbrand.peachDark.value,
        'mb-peach-light': colors.masterbrand.peachLight.value,
        'mb-pink': colors.masterbrand.pink.value,
        'mb-pink-dark': colors.masterbrand.pinkDark.value,
        'mb-pink-light': colors.masterbrand.pinkLight.value,

        // Gray ramp (Figma Variables: Gray50-Gray700 — static)
        gray: {
          50: colors.gray['50'].value,
          100: colors.gray['100'].value,
          200: colors.gray['200'].value,
          300: colors.gray['300'].value,
          400: colors.gray['400'].value,
          500: colors.gray['500'].value,
          600: colors.gray['600'].value,
          700: colors.gray['700'].value,
        },

        // Semantic UI colors — reference CSS custom properties for dark mode
        background: 'var(--app-background)',
        surface: 'var(--app-surface)',
        card: 'var(--app-card)',
        'text-primary': 'var(--app-text-primary)',
        'text-secondary': 'var(--app-text-secondary)',
        'text-tertiary': 'var(--app-text-tertiary)',
        'text-inverse': 'var(--app-text-inverse)',
        border: 'var(--app-border)',
        'border-light': 'var(--app-border-light)',
        accent: {
          DEFAULT: 'var(--app-accent)',
          hover: 'var(--app-accent-hover)',
          light: 'var(--app-accent-light)',
        },

        // Static semantic colors (no dark mode swap needed)
        highlight: colors.ui.highlight.value,
        error: {
          dark: colors.system.error.dark.value,
          DEFAULT: colors.ui.error.value,
          light: colors.system.error.light.value,
        },
        warning: {
          dark: colors.system.warning.dark.value,
          DEFAULT: colors.ui.warning.value,
          light: colors.system.warning.light.value,
        },
        success: {
          dark: colors.system.success.dark.value,
          DEFAULT: colors.ui.success.value,
          light: colors.system.success.light.value,
        },
        info: {
          dark: colors.system.info.dark.value,
          DEFAULT: colors.ui.info.value,
          light: colors.system.info.light.value,
        },
        destructive: colors.ui.destructive.value,

        // Product line colors (Search, Generate, Embed — static)
        'product-search': {
          dark: colors.product.search.dark.value,
          DEFAULT: colors.product.search.DEFAULT.value,
          light: colors.product.search.light.value,
        },
        'product-generate': {
          dark: colors.product.generate.dark.value,
          DEFAULT: colors.product.generate.DEFAULT.value,
          light: colors.product.generate.light.value,
        },
        'product-embed': {
          dark: colors.product.embed.dark.value,
          DEFAULT: colors.product.embed.DEFAULT.value,
          light: colors.product.embed.light.value,
        },

        // User message (charcoal bg, white text — static)
        'user-bg': colors.brand.charcoal.value,
        'user-text': '#FFFFFF',
      },

      fontFamily: {
        brand: typography.fontFamily.brand.value,
        'brand-bold': typography.fontFamily.brandBold.value,
        'brand-xbold': typography.fontFamily.brandXBold.value,
        system: typography.fontFamily.system.value,
        geist: typography.fontFamily.geist.value,
        mono: typography.fontFamily.mono.value,
      },

      fontSize: Object.fromEntries(
        Object.entries(typography.fontSize).map(([key, token]) => [
          key,
          [
            `${token.value}px`,
            {
              lineHeight: String(token.lineHeight),
              fontWeight: String(token.fontWeight),
              ...(token.letterSpacing ? { letterSpacing: `${token.letterSpacing}px` } : {}),
            },
          ],
        ])
      ),

      spacing: {
        ...Object.fromEntries(
          Object.entries(spacing.spacing).map(([key, token]) => [key, `${token.value}px`])
        ),
        header: `${spacing.sizing.header.value}px`,
        sidebar: `${spacing.sizing.sidebar.value}px`,
        'chat-max': `${spacing.sizing.chatMax.value}px`,
        'content-max': `${spacing.sizing.contentMax.value}px`,
      },

      borderRadius: Object.fromEntries(
        Object.entries(radii.borderRadius).map(([key, token]) => [key, `${token.value}px`])
      ),

      boxShadow: Object.fromEntries(
        Object.entries(shadows.boxShadow).map(([key, token]) => [key, token.value])
      ),
    },
  },

  plugins: [
    // Inject CSS custom properties for light and dark mode.
    // Uses raw plugin function (no require('tailwindcss/plugin') needed)
    // so jiti can resolve this from any consuming project.
    function appDarkMode({ addBase }) {
      addBase({
        ':root': lightVars,
        '.dark': darkVars,
      })
    },
  ],
}
