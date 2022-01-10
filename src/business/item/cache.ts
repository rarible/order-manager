import type { NftCollection, NftItem } from "@rarible/ethereum-api-client"
import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk"
import { Atom } from "@rixio/atom"
import type { CacheState } from "@rixio/cache"
import { KeyMemoImpl, toListDataLoader } from "@rixio/cache"
import { Map as IM } from "immutable"

export function createItemCache(sdk: RaribleSdk) {
  const state$ = Atom.create(IM<string, CacheState<NftItem>>())
  return new KeyMemoImpl<string, NftItem>(
    state$,
    toListDataLoader(itemId => sdk.apis.nftItem.getNftItemById({ itemId })),
  )
}

export function createCollectionCache(sdk: RaribleSdk) {
  const state$ = Atom.create(IM<string, CacheState<NftCollection>>())
  return new KeyMemoImpl<string, NftCollection>(
    state$,
    toListDataLoader(collection => sdk.apis.nftCollection.getNftCollectionById({ collection })),
  )
}
