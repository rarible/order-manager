export function getAssetLinkRarible(contract: string, id: string) {
  return `https://rarible.com/token/${contract}:${id}`
}

export function getAssetLinkOpensea(contract: string, id: string) {
  return `https://opensea.io/assets/${contract}/${id}`
}
