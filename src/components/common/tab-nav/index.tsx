import { useCallback } from "react"
import type { Atom } from "@rixio/atom"
import { useAtom } from "@rixio/react"
import type { TabNavOption } from "./domain"
import { TabNavDefault } from "./default"

export type TabNavProps<T extends string> = {
  tabs: TabNavOption<T>[]
  current$: Atom<string | undefined>
}

export function TabNav<T extends string>({ current$, ...restProps }: TabNavProps<T>) {
  const current = useAtom(current$)
  const handleSelect = useCallback((val?: string) => current$.set(val), [current$])

  return <TabNavDefault handleSelect={handleSelect} current={current} {...restProps} />
}
