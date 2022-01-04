import Web3 from "web3"
import { Web3Ethereum } from "@rarible/web3-ethereum"
import { createRaribleSdk } from "@rarible/protocol-ethereum-sdk"
import type { AbstractConnectionProvider, ConnectionProvider } from "@rarible/sdk-wallet-connector/build/provider"
import type { EthereumProviderConnectionResult } from "@rarible/sdk-wallet-connector/build/connectors/ethereum/domain"
import { InjectedWeb3ConnectionProvider } from "@rarible/sdk-wallet-connector/build/connectors/ethereum/injected"
import { MEWConnectionProvider } from "@rarible/sdk-wallet-connector/build/connectors/ethereum/mew"
import { TorusConnectionProvider } from "@rarible/sdk-wallet-connector/build/connectors/ethereum/torus"
import { WalletLinkConnectionProvider } from "@rarible/sdk-wallet-connector/build/connectors/ethereum/walletllink"
import { Connector } from "@rarible/sdk-wallet-connector/build/connector"
import { raribleStorageManager } from "../storage"
import type { Connection, RaribleConnector } from "./domain"

const ethereumRpcMap: Record<number, string> = {
  1: "https://node-mainnet.rarible.com",
  3: "https://node-ropsten.rarible.com",
  4: "https://node-rinkeby.rarible.com",
  17: "https://node-e2e.rarible.com",
}

function mapToSdk<O>(
  provider: AbstractConnectionProvider<O, EthereumProviderConnectionResult>,
): ConnectionProvider<O, Connection> {
  return provider.map(conn => {
    const web3 = new Web3(conn.provider)
    return {
      sdk: createRaribleSdk(new Web3Ethereum({ web3, from: conn.address }), "mainnet"),
      address: conn.address,
    }
  })
}

const injected = mapToSdk(new InjectedWeb3ConnectionProvider())

const mew = mapToSdk(
  new MEWConnectionProvider({
    networkId: 4,
    rpcUrl: ethereumRpcMap[4],
  }),
)

const torus = mapToSdk(
  new TorusConnectionProvider({
    network: {
      host: "mainnet",
    },
  }),
)

const walletlink = mapToSdk(
  new WalletLinkConnectionProvider(
    {
      estimationUrl: ethereumRpcMap[4],
      networkId: 4,
      url: ethereumRpcMap[4],
    },
    {
      appName: "Rarible",
      appLogoUrl: "https://rarible.com/static/logo-500.static.png",
      darkMode: false,
    },
  ),
)

/**
 * @todo add providers with secrets
 * These providers requires secret key so it can be done later
 */

// const walletConnect = mapToSdk(new WalletConnectConnectionProvider({
// 	infuraId: "INFURA_ID",
// 	rpcMap: ethereumRpcMap,
// 	networkId: 4
// }))
// const fortmatic = mapToSdk(new FortmaticConnectionProvider({ apiKey: "FORTMATIC_API_KEY" }))
// const portis = mapToSdk(new PortisConnectionProvider({ apiKey: "PORTIS_API_KEY", network: "rinkeby" }))

const state$ = raribleStorageManager.getValue("CONNECTOR_STATE", undefined)

export const connector: RaribleConnector = Connector.create(injected, {
  getValue: () => Promise.resolve(state$.get()),
  setValue: value => Promise.resolve(state$.set(value)),
})
  .add(torus)
  .add(walletlink)
  .add(mew)
