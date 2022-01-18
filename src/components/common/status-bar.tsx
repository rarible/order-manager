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
        <Delimiter />
        {getChainLabel(state.connection.chainId).toLowerCase()}
        {state.disconnect && (
          <>
            <Delimiter />
            <DisconnectButton onClick={state.disconnect}>disconnect</DisconnectButton>
          </>
        )}
      </div>
    )
  }
  return null
}

function Delimiter() {
  return <DelimiterText> | </DelimiterText>
}

const DelimiterText = styled.span`
  color: ${p => p.theme.colors.line};
`

const CurrentAddress = styled(Address)``

const DisconnectButton = styled(Touchable)`
  color: ${p => p.theme.colors.primary};
  font-size: 16px;
  &:hover,
  &:active,
  &:focus {
    color: ${p => transparentize(0.1, p.theme.colors.primary)};
  }
`
