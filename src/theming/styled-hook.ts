import "styled-components"
import type { RaribleTheme } from "./domain"

declare module "styled-components" {
  export interface DefaultTheme extends RaribleTheme {}
}
