import type { RaribleTheme } from "./domain"

const breakpoints = ["578px", "768px", "981px", "1366px"] as string[] & {
  sm: string
  md: string
  lg: string
  xl: string
}

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const colors = {
  contrast: "rgba(4, 4, 5, 1)",
  line: "rgba(230, 230, 230, 1)",
  lineTransparentize: "rgba(4, 4, 5, 0.1)",
  sub: "rgba(110, 110, 110, 1)",
  base: "rgba(255, 255, 255, 1)",
  primary: "rgba(0, 102, 255, 1)",
  red: "rgba(255, 87, 87, 1)",
  secondary: "rgba(254, 218, 3, 1)",
  protocol: "rgba(0, 163, 255, 1)",
  success: "rgba(40, 184, 51, 1)",
  overlay: "rgba(255, 255, 255, 1)",
  warning: "rgba(175, 162, 63, 1)",
}

export const snowTheme: RaribleTheme = {
  key: "snow",
  colors,
  breakpoints,
}
