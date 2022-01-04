import type { ReactElement } from "react"
import React, { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import { Touchable } from "./touchable"
import { ActivityIndicator } from "./activity-indicator"
import { Jumbotron } from "./jumbotron"

export type ListResponse<T> = {
  continuation: string
  data: T[]
}

export type ListProps<T> = {
  onLoadMore: (continuation: string | undefined) => Promise<ListResponse<T>>
  renderItem: (entry: T, i: number) => ReactElement
  renderWrapper: (content: ReactElement) => ReactElement
  getItemKey: (data: T) => string
}

type ListState<T> = {
  continuation: string | undefined
  items: T[]
  hasMore: boolean
}

export function List<T>({ renderWrapper, getItemKey, onLoadMore, renderItem }: ListProps<T>) {
  const [state, setState] = useState<ListState<T>>(() => getDefaulState())
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [firstLoadDid, setFirstLoadDid] = useState(false)

  useEffect(() => {
    setFirstLoadDid(false)
    setState(getDefaulState())
  }, [onLoadMore])

  const loadData = useCallback(
    (continuation: string | undefined) => {
      setIsLoading(true)
      setHasError(false)
      onLoadMore(continuation)
        .then(x => {
          setState(prev => ({
            items: [...prev.items, ...x.data],
            continuation: x.continuation,
            hasMore: Boolean(x.continuation) && x.data.length > 0,
          }))
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false))
    },
    [onLoadMore],
  )

  useEffect(() => {
    if (!firstLoadDid) {
      loadData(undefined)
      setFirstLoadDid(true)
    }
  }, [loadData, firstLoadDid])

  if (isLoading && state.items.length === 0) {
    return <ActivityIndicator />
  }

  if (state.items.length === 0 && !state.hasMore) {
    return (
      <Jumbotron
        label="No entries"
        description={
          <React.Fragment>
            There's no orders with this criteria.{" "}
            <LoadMoreButton onClick={() => loadData(undefined)}>Refresh list</LoadMoreButton>
          </React.Fragment>
        }
      />
    )
  }

  if (hasError) {
    return (
      <Jumbotron
        label="Ooops.."
        description={
          <React.Fragment>
            Something went wrong. <LoadMoreButton onClick={() => loadData(undefined)}>Try again</LoadMoreButton>
          </React.Fragment>
        }
      />
    )
  }

  return (
    <Wrapper>
      {renderWrapper(
        <React.Fragment>
          {state.items.map((x, i) => (
            <React.Fragment key={getItemKey(x)} children={renderItem(x, i)} />
          ))}
        </React.Fragment>,
      )}
      <BarWrapper>
        <Bar onLoadMore={() => loadData(state.continuation)} state={state} isLoading={isLoading} />
      </BarWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const BarWrapper = styled.div`
  margin-top: 32px;
`

type BarProps<T> = {
  state: ListState<T>
  onLoadMore: () => void
  isLoading: boolean
}

function Bar<T>({ state, onLoadMore, isLoading }: BarProps<T>) {
  if (isLoading) {
    return <span>Loading..</span>
  }
  if (state.hasMore && state.items.length > 0) {
    return <LoadMoreButton onClick={onLoadMore}>Load more →</LoadMoreButton>
  }
  return null
}

const LoadMoreButton = styled(Touchable)`
  font-size: 16px;
  color: ${p => p.theme.colors.primary};
`

function getDefaulState<T>(): ListState<T> {
  return {
    continuation: undefined,
    items: [],
    hasMore: true,
  }
}
