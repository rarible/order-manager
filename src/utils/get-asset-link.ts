import { isSupportedChain } from "../business/blockchain/utils"

export function getAssetLinkRarible(chainId: number, contract: string, id: string) {
  if (isSupportedChain(chainId)) {
    if (chainId === 1) return `https://rarible.com/token/${contract}:${id}`
    if (chainId === 3) return `https://ropsten.rarible.com/token/${contract}:${id}`
    if (chainId === 4) return `https://rinkeby.rarible.com/token/${contract}:${id}`
    if (chainId === 17) return `https://e2e.rarible.com/token/${contract}:${id}`
  }
  throw new Error("Unsupported chain id")
}
