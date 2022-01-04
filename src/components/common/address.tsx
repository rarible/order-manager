import type { StyledComponentPropsWithRef } from "styled-components"
import styled from "styled-components"
import { cutString } from "../../utils/cut-string"

export function Address({ address, ...restProps }: AddressProps) {
  return (
    <Base title={address} {...restProps}>
      {cutString(address, 16)}
    </Base>
  )
}

const Base = styled.span``

export type AddressProps = StyledComponentPropsWithRef<typeof Base> & {
  address: string
}
