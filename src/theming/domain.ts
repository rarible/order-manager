export type RaribleTheme = {
  key: ThemeKey
  colors: {
    contrast: string
    sub: string
    line: string
    lineTransparentize: string
    base: string
    primary: string
    red: string
    secondary: string
    success: string
    warning: string
  }
  breakpoints: string[] & {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export type WithTheme<T extends {}> = T & {
  theme: RaribleTheme
}

export const themeKeys = ["snow"] as const
export type ThemeKey = typeof themeKeys[number]
