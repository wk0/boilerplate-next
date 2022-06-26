// 1. Import `createTheme`
import { createTheme  } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom values
export const lightTheme = createTheme({
  type: "light", // it could be "light" or "dark"
  className: 'light',
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#ff4ecd',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      myColor: '#ff4ecd',
      $tokenColor: '#4ADE7B',
      $copiedTokenColor: '$tokenColor',
      $$localScopedColor: '$copiedTokenColor',

      // auto css property mapping
      background: '$backgrond',
      color: '$foreground'
    },
    fonts: {
        sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto','Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
        mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono','DejaVu Sans Mono', 'Bitstream Vera Sans Mono'"
    },
    fontSizes: {
        xs: '0.75rem', /* 12px */
        sm: '0.875rem', /* 14px */
        base: '1rem', /* 16px */
        md: '1rem', /* 16px */
        lg: '1.125rem', /* 18px */
        xl: '1.25rem', /* 20px */
        xl2: '1.5rem', /* 24px */
        xl3: '1.875rem', /* 30px */
        xl4: '2.25rem', /* 36px */
        xl5: '3rem', /* 48px */
        xl6: '3.75rem', /* 60px */
        xl7: '4.5rem', /* 72px */
        xl8: '6rem', /* 96px */
        xl9: '8rem', /* 128px */
    },
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900
    },
    lineHeights: {
        xs: 1, /* 16px */
        sm: 1.25, /* 20px */
        base: 1.5, /* 24px */
        md: 1.5, /* 24px */
        lg: 1.75, /* 28px */
        xl: 1.75, /* 28px */
        xl2: 2, /* 32px */
        xl3: 2.25, /* 36px */
        xl4: 2.5, /* 40px */
        xl5: 1,
        xl6: 1,
        xl7: 1,
        xl8: 1,
        xl9: 1
    },
    letterSpacings: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
    },
    radii: {
        xs: '7px',
        sm: '9px',
        md: '12px',
        base: '14px',
        lg: '14px', // preferred value by NextUI components
        xl: '18px',
        squared: '33%',
        rounded: '50%',
        pill: '9999px'
    },
    borderWeights: {
        light: '1px',
        normal: '2px',
        bold: '3px',
        extrabold: '4px',
        black: '5px'
    },
    zIndices: {
        1: '100',
        2: '200',
        3: '300',
        4: '400',
        5: '500',
        10: '1000',
        max: '9999'
    },
    shadows: {
        xs: '0 2px 8px 1px rgb(0 0 0 / 0.07), 0 1px 1px -1px rgb(0 0 0 / 0.04)',
        sm: '0 2px 8px 2px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.04)',
        md: '0 12px 20px 6px rgb(0 0 0 / 0.08)',
        lg: '0 12px 34px 6px rgb(0 0 0 / 0.18)',
        xl: '0 25px 65px 0px rgb(0 0 0 / 0.35)'
      },
    // to use along with css dropShadow utility
    dropShadows: {
        xs: 'drop-shadow(0 2px 4px rgb(0 0 0 / 0.07)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.04))',
        sm: 'drop-shadow(0 2px 8px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.04))',
        md: 'drop-shadow(0 4px 12px rgb(0 0 0 / 0.08)) drop-shadow(0 20px 8px rgb(0 0 0 / 0.04))',
        lg: 'drop-shadow(0 12px 24px rgb(0 0 0 / 0.15)) drop-shadow(0 12px 14px rgb(0 0 0 / 0.1))',
        xl: 'drop-shadow(0 25px 34px rgb(0 0 0 / 0.35))'
    },
    space: {
        0: '0rem',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.375rem',
        xl: '2.25rem',
        px: '1px',
        1: '0.125rem',
        2: '0.25rem',
        3: '0.375rem',
        4: '0.5rem',
        5: '0.625rem',
        6: '0.75rem',
        7: '0.875rem',
        8: '1rem',
        9: '1.25rem',
        10: '1.5rem',
        11: '1.75rem',
        12: '2rem',
        13: '2.25rem',
        14: '2.5rem',
        15: '2.75rem',
        16: '3rem',
        17: '3.5rem',
        18: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem'
      },
      breakpoints: {
        xs: '650px',
        sm: '960px',
        md: '1280px',
        lg: '1400px',
        xl: '1920px'
      }
  }
})