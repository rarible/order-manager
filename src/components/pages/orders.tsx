import type { StateConnected } from "@rarible/sdk-wallet-connector"
import type { Connection } from "../../business/blockchain/domain"

export type ConnectPageProps = {
  state: StateConnected<Connection>
}

export function OrdersPage({ state }: ConnectPageProps) {
  return (
    <div>
      {state.disconnect && <button onClick={state.disconnect}>disconnect</button>}
      <p>
        {state.status}: {state.connection.address}
      </p>
    </div>
  )
}
