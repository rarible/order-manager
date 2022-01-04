import styled from "styled-components"
import type { TabNavOption } from "../domain"
import { TabNavItemDefault } from "./item"

export type TabNavDefaultProps<T extends string> = {
  handleSelect: (value?: string) => void
  current: string | undefined
  tabs: TabNavOption<T>[]
}

export function TabNavDefault<T extends string>({ tabs, handleSelect, current }: TabNavDefaultProps<T>) {
  return (
    <Container>
      {tabs.map((entry, i) => (
        <TabNavItemDefault
          key={i}
          active={current === entry.value}
          data={entry}
          onClick={(e: any) => handleSelect(entry.value)}
        />
      ))}
    </Container>
  )
}

const Container = styled.div.attrs({ role: "tablist" })`
  flex-flow: row nowrap;
  align-items: stretch;
  max-width: initial;
  min-width: 100%;
  width: auto;
  border-bottom: 1px solid ${p => p.theme.colors.line};
  & > *:not(:last-child) {
    margin-right: 22px;
  }
`
