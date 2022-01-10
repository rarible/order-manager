import Web3 from "web3"
import { Web3Ethereum } from "@rarible/web3-ethereum"
import { createRaribleSdk } from "@rarible/protocol-ethereum-sdk"
import { Connector, DefaultConnectionStateProvider, InjectedWeb3ConnectionProvider } from "@rarible/connector"
import type {
  EthereumProviderConnectionResult,
  AbstractConnectionProvider,
  ConnectionProvider,
} from "@rarible/connector"
import { MEWConnectionProvider } from "@rarible/connector-mew"
import { TorusConnectionProvider } from "@rarible/connector-torus"
import { WalletLinkConnectionProvider } from "@rarible/connector-walletlink"
import { currentChainId } from "../config"
import type { Connection, RaribleConnector, SupportedChain } from "./domain"
import { chainIdToEnv } from "./utils"

const ethereumRpcMap: Record<SupportedChain, string> = {
  1: "https://node-mainnet.rarible.com",
  3: "https://node-ropsten.rarible.com",
  4: "https://node-rinkeby.rarible.com",
  17: "https://node-e2e.rarible.com",
}

function mapToSdk<O>(
  provider: AbstractConnectionProvider<O, EthereumProviderConnectionResult>,
): ConnectionProvider<O, Connection> {
  return provider.map(x => {
    const web3 = new Web3(x.provider)
    const sdk = createRaribleSdk(
      new Web3Ethereum({
        web3,
        from: x.address,
      }),
      chainIdToEnv(currentChainId),
    )
    return {
      type: x.chainId === currentChainId ? "connected" : "invalid-chain-id",
      sdk,
      requiredChainId: currentChainId,
      address: x.address,
      chainId: x.chainId,
    }
  })
}

const injected = mapToSdk(new InjectedWeb3ConnectionProvider())

const mew = mapToSdk(
  new MEWConnectionProvider({
    networkId: currentChainId,
    rpcUrl: ethereumRpcMap[currentChainId],
  }),
)

const torus = mapToSdk(
  new TorusConnectionProvider({
    network: {
      host: chainIdToEnv(currentChainId),
    },
  }),
)

const walletlink = mapToSdk(
  new WalletLinkConnectionProvider(
    {
      estimationUrl: ethereumRpcMap[currentChainId],
      networkId: currentChainId,
      url: ethereumRpcMap[currentChainId],
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

const state = new DefaultConnectionStateProvider("order-checker:CONNECTOR_STATE")
export const connector: RaribleConnector = Connector.create(injected, state).add(torus).add(walletlink).add(mew)
