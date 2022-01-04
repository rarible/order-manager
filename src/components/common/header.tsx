import styled from "styled-components"
import type { RaribleConnectorState } from "../../business/blockchain/domain"
import { Container } from "./container"
import { Heading1 } from "./heading"
import { StatusBar } from "./status-bar"

export type HeaderProps = {
  state: RaribleConnectorState
}

export function Header({ state }: HeaderProps) {
  return (
    <Container>
      <HorizontalMenu>
        <Heading1>Order manager</Heading1>
        <StatusBar state={state} />
      </HorizontalMenu>
    </Container>
  )
}

const HorizontalMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`
