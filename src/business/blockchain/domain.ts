import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk"
import type { ConnectionState, DappType, IConnector, StateConnected } from "@rarible/sdk-wallet-connector"

export type Connection = {
  type: "connected" | "invalid-chain-id"
  sdk: RaribleSdk
  address: string
  chainId: number
  requiredChainId: SupportedChain
}

export type SupportedConnectionType = DappType | "mew" | "torus" | "walletlink"
export type RaribleConnector = IConnector<SupportedConnectionType, Connection>
export type RaribleConnectorState = ConnectionState<Connection>
export type RaribleConnectedState = StateConnected<Connection>

export const supportedChains = [1, 3, 4, 17] as const
export type SupportedChain = typeof supportedChains[number]
