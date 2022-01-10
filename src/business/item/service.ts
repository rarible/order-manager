import type { AssetType, NftCollection, NftItem } from "@rarible/ethereum-api-client"
import type { KeyMemo } from "@rixio/cache"
import type { Observable } from "rxjs"
import { combineLatest } from "rxjs"
import { map } from "rxjs/operators"
import type { ItemData } from "./domain"

export class ItemService {
  constructor(
    private readonly itemCache: KeyMemo<string, NftItem>,
    private readonly collectionCache: KeyMemo<string, NftCollection>,
  ) {}

  getItemData(assetType: AssetType): Observable<ItemData> {
    const id = getNftItemId(assetType)
    return combineLatest([
      this.itemCache.single(`${id.contract}:${id.tokenId}`),
      this.collectionCache.single(id.contract),
    ]).pipe(map(([item, collection]) => ({ item, collection })))
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
