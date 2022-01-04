import styled from "styled-components"
import type { RaribleConnector, RaribleConnectorState } from "../../business/blockchain/domain"
import { ConnectOptions } from "../common/connect-options"
import { Heading2 } from "../common/heading"

export type ConnectPageProps = {
  connector: RaribleConnector
  state: RaribleConnectorState
}

export function ConnectPage({ connector, state }: ConnectPageProps) {
  return (
    <Wrapper>
      <Heading2>Step 1. Connect wallet</Heading2>
      <Description>
        Connect your wallet to check your active orders with Rarible's protocol API. We do not own your private keys and
        cannot access your funds without your confirmation.
      </Description>
      <ConnectionWrapper>
        <ConnectOptions connector={connector} state={state} />
      </ConnectionWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const Description = styled.p`
  color: ${p => p.theme.colors.sub};
  font-size: 18px;
  margin-top: 16px;
`

const ConnectionWrapper = styled.div`
  margin-top: 24px;
`
