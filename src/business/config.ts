import qs from "qs"
import type { SupportedChain } from "./blockchain/domain"
import { isSupportedChain } from "./blockchain/utils"

export function parseChainId(): SupportedChain {
  if (typeof window !== "undefined" && "location" in window) {
    const current = window.location.search
    const parsed = qs.parse(current, {
      ignoreQueryPrefix: true,
    })

    if ("chainId" in parsed && typeof parsed.chainId === "string") {
      const asInt = parseInt(parsed.chainId)
      if (!isNaN(asInt) && isSupportedChain(asInt)) {
        return asInt
      }
    }
    return 1
  }
  throw new Error("Your browser is not supported, plaese update your browser")
}

export const currentChainId = parseChainId()
