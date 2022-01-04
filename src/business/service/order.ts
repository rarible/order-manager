import type { Observable } from "rxjs"
import type { Wrapped } from "@rixio/wrapped"
import type { AssetType, NftCollection, NftItem, Order } from "@rarible/ethereum-api-client"
import type { KeyCache } from "@rixio/cache"
import { rxObject } from "@rixio/react"

type OW<T> = Observable<Wrapped<T>>
type OrderData = {
  order: Order
  item: NftItem
  collection: NftCollection
}

class OrderService {
  constructor(
    private readonly itemCache: KeyCache<string, NftItem>,
    private readonly collectionCache: KeyCache<string, NftCollection>,
  ) {}

  getItemData(order: Order): OW<OrderData> {
    const id = getNftItemId(order.make.assetType)
    return rxObject<OrderData>({
      order,
      item: this.itemCache.single(`${id.contract}:${id.tokenId}`),
      collection: this.collectionCache.single(id.contract),
    })
  }
}

function getNftItemId(assetType: AssetType) {
  switch (assetType.assetClass) {
    case "ERC721":
    case "ERC1155":
    case "ERC721_LAZY":
    case "ERC1155_LAZY":
    case "CRYPTO_PUNKS":
      return { contract: assetType.contract, tokenId: assetType.tokenId }
    default:
      throw new Error(`Incorrect asset type ${JSON.stringify(assetType)}`)
  }
}
