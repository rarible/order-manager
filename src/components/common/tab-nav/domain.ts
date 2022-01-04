import type { ReactElement } from "react"
import type { Option } from "../../../business/domain"

export type TabNavOption<T extends string, K extends object = {}> = Omit<Option<T, K>, "label"> & {
  label: string | ReactElement
}
