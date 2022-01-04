import { transparentize } from "polished"
import styled from "styled-components"
import type { TouchableProps } from "../../touchable"
import { Touchable } from "../../touchable"
import type { TabNavOption } from "../domain"

export type TabNavItemDefaultProps<T extends string, K extends object = {}> = TouchableProps & {
  data: TabNavOption<T, K>
  active: boolean
}

export function TabNavItemDefault<T extends string, K extends object = {}>({
  data,
  active,
  ...restProps
}: TabNavItemDefaultProps<T, K>) {
  return (
    <Button role="tab" aria-selected={active} active={active} {...restProps}>
      <LabelText children={data.label} />
      <Divider active={active} />
    </Button>
  )
}

const LabelText = styled.span`
  white-space: nowrap;
  vertical-align: middle;
  font-size: 16px;
  font-weight: bold;
  line-height: 36px;
`

type Active = {
  active: boolean
}

const Button = styled(Touchable)<Active>`
  color: ${p => transparentize(p.active ? 0 : 0.4, p.theme.colors.contrast)};
  justify-content: center;
  position: relative;
  padding-bottom: 2px;
  &:hover {
    color: ${p => p.theme.colors.contrast};
  }
`

const Divider = styled.div<Active>`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  background: ${p => transparentize(p.active ? 0 : 1, p.theme.colors.contrast)};
  height: 2px;
  border-radius: 2px 2px 0 0;
  width: 100%;
`
