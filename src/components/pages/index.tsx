import { Rx } from "@rixio/react"
import styled from "styled-components"
import type { RaribleConnector, RaribleConnectorState } from "../../business/blockchain/domain"
import { Container } from "../common/container"
import { Footer } from "../common/footer"
import { FullHeight } from "../common/full-height"
import { Header } from "../common/header"
import { ActivityIndicator } from "../common/activity-indicator"
import { InvalidChain } from "../common/invalid-chain"
import { ConnectPage } from "./connect"
import { AppPage } from "./app"

export type IndexPageProps = {
  connector: RaribleConnector
}

export function IndexPage({ connector }: IndexPageProps) {
  return (
    <Rx value$={connector.connection}>
      {state => (
        <Wrapper>
          <Header state={state} />
          <FullHeightContainer>
            <Content connector={connector} state={state} />
          </FullHeightContainer>
          <Footer />
        </Wrapper>
      )}
    </Rx>
  )
}

const FullHeightContainer = styled(Container)`
  display: flex;
  flex-grow: 1;
`

const Wrapper = styled(FullHeight)`
  display: flex;
  flex-direction: column;
`

type ContentProps = {
  connector: RaribleConnector
  state: RaribleConnectorState
}

function Content({ connector, state }: ContentProps) {
  if (state.status === "initializing") {
    return <ActivityIndicator />
  }

  if (state.status === "disconnected" || state.status === "connecting") {
    return <ConnectPage connector={connector} state={state} />
  }

  if (state.connection.type === "invalid-chain-id") {
    return <InvalidChain id={state.connection.requiredChainId} />
  }

  return <AppPage state={state} />
}
