import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types"
import type { SupportedChain } from "./domain"
import { supportedChains } from "./domain"

export function isSupportedChain(chainId: number): chainId is SupportedChain {
  return supportedChains.indexOf(chainId as SupportedChain) !== -1
}

export function chainIdToEnv(chainId: SupportedChain): EthereumNetwork {
  if (chainId === 1) return "mainnet"
  if (chainId === 3) return "ropsten"
  if (chainId === 4) return "rinkeby"
  if (chainId === 17) return "e2e"
  throw new Error("Unsupported chain id")
}

export function getChainLabel(chainId: number) {
  if (chainId === 1) return "Mainnet"
  if (chainId === 3) return "Ropsten"
  if (chainId === 4) return "Rinkeby"
  if (chainId === 17) return "Rarible dev"
  return "Unknown"
}
