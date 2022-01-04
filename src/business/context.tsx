import type { PropsWithChildren } from "react"
import React, { useContext, useMemo } from "react"
import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk"
import type { CacheState } from "@rixio/cache"
import { KeyCacheImpl, toListDataLoader } from "@rixio/cache"
import type { NftCollection, NftItem } from "@rarible/ethereum-api-client"
import { Atom } from "@rixio/atom"
import { Map as IM } from "immutable"
import { ItemService } from "./service/item"

export type AppContext = {
  address: string
  sdk: RaribleSdk
  itemService: ItemService
}

const appContext = React.createContext<AppContext>(undefined as any)

export function useAppContext(): AppContext {
  return useContext(appContext)
}

type AppRootProps = {
  address: string
  sdk: RaribleSdk
}

export function AppRoot({ children, address, sdk }: PropsWithChildren<AppRootProps>) {
  const ctx = useMemo(() => createContext(address, sdk), [address, sdk])
  return <appContext.Provider value={ctx}>{children}</appContext.Provider>
}

type State = {
  items: IM<string, CacheState<NftItem>>
  collections: IM<string, CacheState<NftCollection>>
}

const state = Atom.create<State>({
  items: IM(),
  collections: IM(),
})

function createContext(address: string, sdk: RaribleSdk): AppContext {
  const itemCache = new KeyCacheImpl<string, NftItem>(
    state.lens("items"),
    toListDataLoader(itemId => sdk.apis.nftItem.getNftItemById({ itemId })),
  )
  const collectionCache = new KeyCacheImpl<string, NftCollection>(
    state.lens("collections"),
    toListDataLoader(collection => sdk.apis.nftCollection.getNftCollectionById({ collection })),
  )
  return {
    address,
    sdk,
    itemService: new ItemService(itemCache, collectionCache),
  }
}
