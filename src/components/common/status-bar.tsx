import { transparentize } from "polished"
import styled from "styled-components"
import type { RaribleConnectorState } from "../../business/blockchain/domain"
import { getChainLabel } from "../../business/blockchain/utils"
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
        <Description>
          You're connected to {getChainLabel(state.connection.chainId)}{" "}
          {state.disconnect && <DisconnectButton onClick={state.disconnect}>disconnect</DisconnectButton>}
        </Description>
      </div>
    )
  }
  return null
}

const Description = styled.span`
  display: block;
  font-size: 14px;
`

const CurrentAddress = styled(Address)`
  font-weight: bold;
  display: block;
`

const DisconnectButton = styled(Touchable)`
  color: ${p => p.theme.colors.primary};
  &:hover,
  &:active,
  &:focus {
    color: ${p => transparentize(0.1, p.theme.colors.primary)};
  }
`
