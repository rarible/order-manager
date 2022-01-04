import { Rx } from "@rixio/react"
import type { RaribleConnector } from "../../business/blockchain/domain"
import { ConnectPage } from "./connect"
import { OrdersPage } from "./orders"

export type IndexPageProps = {
  connector: RaribleConnector
}

export function IndexPage({ connector }: IndexPageProps) {
  return (
    <Rx value$={connector.connection}>
      {state => {
        if (state.status === "initializing") {
          return <p>Initializing...</p>
        }

        if (state.status === "disconnected" || state.status === "connecting") {
          return <ConnectPage connector={connector} state={state} />
        }

        return <OrdersPage state={state} />
      }}
    </Rx>
  )
}
