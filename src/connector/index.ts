import Web3 from "web3"
import { Web3Ethereum } from "@rarible/web3-ethereum"
import {
    AbstractConnectionProvider,
    ConnectionProvider,
    Connector,
    EthereumProviderConnectionResult,
    IConnectorStateProvider,
    InjectedWeb3ConnectionProvider,
    MEWConnectionProvider,
    TorusConnectionProvider,
    WalletLinkConnectionProvider,
} from "@rarible/sdk-wallet-connector";
import { createRaribleSdk, RaribleSdk } from "@rarible/protocol-ethereum-sdk";


const ethereumRpcMap: Record<number, string> = {
    1: "https://node-mainnet.rarible.com",
    3: "https://node-ropsten.rarible.com",
    4: "https://node-rinkeby.rarible.com",
    17: "https://node-e2e.rarible.com",
}

type Connection = {
    sdk: RaribleSdk
    address: string
}

function mapToSdk<O>(provider: AbstractConnectionProvider<O, EthereumProviderConnectionResult>): ConnectionProvider<O, Connection> {
    return provider.map(conn => {
        const web3 = new Web3(conn.provider)
        return {
            sdk: createRaribleSdk(new Web3Ethereum({ web3, from: conn.address }), "rinkeby"),
            address: conn.address,
        }
    })
}

const injected = mapToSdk(new InjectedWeb3ConnectionProvider())

const mew = mapToSdk(new MEWConnectionProvider({
    networkId: 4,
    rpcUrl: ethereumRpcMap[4]
}))

const torus = mapToSdk(new TorusConnectionProvider({
    network: {
        host: "rinkeby"
    }
}))

const walletlink = mapToSdk(new WalletLinkConnectionProvider({
    estimationUrl: ethereumRpcMap[4],
    networkId: 4,
    url: ethereumRpcMap[4]
}, {
    appName: "Rarible",
    appLogoUrl: "https://rarible.com/static/logo-500.static.png",
    darkMode: false,
}))

// Providers required secrets
// const walletConnect = mapToSdk(new WalletConnectConnectionProvider({
// 	infuraId: "INFURA_ID",
// 	rpcMap: ethereumRpcMap,
// 	networkId: 4
// }))
// const fortmatic = mapToSdk(new FortmaticConnectionProvider({ apiKey: "FORTMATIC_API_KEY" }))
// const portis = mapToSdk(new PortisConnectionProvider({ apiKey: "PORTIS_API_KEY", network: "rinkeby" }))

const state: IConnectorStateProvider = {
    async getValue(): Promise<string | undefined> {
        const value = localStorage.getItem("saved_provider")
        return value ? value : undefined
    },
    async setValue(value: string | undefined): Promise<void> {
        localStorage.setItem("saved_provider", value || "")
    },
}

export const connector = Connector
    .create(injected, state)
    .add(torus)
    .add(walletlink)
    .add(mew)
