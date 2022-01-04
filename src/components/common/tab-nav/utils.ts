import type { ReactElement } from "react"
import type { TabNavOption } from "./domain"

export function createTabNav<T extends string>(value: T, label: string | ReactElement): TabNavOption<T> {
  return {
    value,
    label,
    data: {},
  }
}
