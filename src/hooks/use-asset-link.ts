import { useConnectionContext } from "../business/context"
import { getAssetLinkRarible } from "../utils/get-asset-link"

export function useAssetLink(contract: string, id: string) {
  const { state } = useConnectionContext()
  return getAssetLinkRarible(state.connection.chainId, contract, id)
}
