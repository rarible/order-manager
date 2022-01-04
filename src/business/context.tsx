import type { PropsWithChildren } from "react"
import React, { useContext, useMemo } from "react"
import type { RaribleConnectedState } from "./blockchain/domain"
import { ItemService } from "./item/service"
import { createCollectionCache, createItemCache } from "./item/cache"

export type ConnectionContext = {
  state: RaribleConnectedState
  itemService: ItemService
}

const connectionContext = React.createContext<ConnectionContext | undefined>(undefined)

export function useConnectionContext(): ConnectionContext {
  const context = useContext(connectionContext)
  if (!context) {
    throw new Error("Connection provider is not defined")
  }
  return context
}

type ConnectionProviderProps = {
  state: RaribleConnectedState
}

export function ConnectionProvider({ children, state }: PropsWithChildren<ConnectionProviderProps>) {
  const ctx = useMemo(() => createContext(state), [state])
  return <connectionContext.Provider value={ctx}>{children}</connectionContext.Provider>
}

function createContext(state: RaribleConnectedState): ConnectionContext {
  const collectionCache = createCollectionCache(state.connection.sdk)
  const itemCache = createItemCache(state.connection.sdk)

  return {
    state,
    itemService: new ItemService(itemCache, collectionCache),
  }
}
