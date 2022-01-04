import type { StyledComponentPropsWithRef } from "styled-components"
import styled from "styled-components"

export const Touchable = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  line-height: normal;
  padding: 0;
  color: inherit;
  overflow: visible;
`

Touchable.defaultProps = {
  type: "button",
}

export type TouchableProps = StyledComponentPropsWithRef<typeof Touchable>
