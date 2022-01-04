import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk"
import type { ConnectionState, DappType, IConnector } from "@rarible/sdk-wallet-connector"

export type Connection = {
  sdk: RaribleSdk
  address: string
}

export type RaribleConnector = IConnector<DappType | "mew" | "torus" | "walletlink", Connection>
export type RaribleConnectorState = ConnectionState<Connection>
