import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk"
import type { ConnectionState, DappType, IConnector, StateConnected } from "@rarible/sdk-wallet-connector"

export type Connection = {
  sdk: RaribleSdk
  address: string
}

export type SupportedConnectionType = DappType | "mew" | "torus" | "walletlink"
export type RaribleConnector = IConnector<SupportedConnectionType, Connection>
export type RaribleConnectorState = ConnectionState<Connection>
export type RaribleConnectedState = StateConnected<Connection>
