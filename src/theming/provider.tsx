import React from "react"
import { ThemeProvider as WebThemeProvider } from "styled-components"
import { snowTheme } from "./snow"

type ThemingProviderProps = {
  children: React.ReactElement
}
export function ThemingProvider({ children }: ThemingProviderProps) {
  return <WebThemeProvider theme={snowTheme}>{children}</WebThemeProvider>
}
