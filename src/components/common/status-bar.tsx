import { transparentize } from "polished"
import styled from "styled-components"
import type { RaribleConnectorState } from "../../business/blockchain/domain"
import { Address } from "./address"
import { Touchable } from "./touchable"

export type StatusBarProps = {
  state: RaribleConnectorState
}

export function StatusBar({ state }: StatusBarProps) {
  if (state.status === "initializing" || state.status === "connecting") {
    return <span>Connecting..</span>
  }
  if (state.status === "connected") {
    return (
      <div>
        <CurrentAddress address={state.connection.address} />
        {state.disconnect && <DisconnectButton onClick={state.disconnect}>disconnect</DisconnectButton>}
      </div>
    )
  }
  return null
}

const CurrentAddress = styled(Address)`
  font-weight: bold;
  display: block;
`

const DisconnectButton = styled(Touchable)`
  display: block;
  font-size: 14px;

  color: ${p => p.theme.colors.primary};
  &:hover,
  &:active,
  &:focus {
    color: ${p => transparentize(0.1, p.theme.colors.primary)};
  }
`
