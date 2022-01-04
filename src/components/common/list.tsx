import type { ReactElement } from "react"
import { useRef } from "react"
import React, { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import { Touchable } from "./touchable"
import { Heading3 } from "./heading"

export type ListResponse<T> = {
  continuation: string
  data: T[]
}

export type ListProps<T> = {
  onLoadMore: (continuation: string | undefined) => Promise<ListResponse<T>>
  renderItem: (entry: T, i: number) => ReactElement
  renderWrapper: (content: ReactElement) => ReactElement
}

type ListState<T> = {
  continuation: string | undefined
  items: T[]
  hasMore: boolean
}

export function List<T>({ renderWrapper, onLoadMore, renderItem }: ListProps<T>) {
  const [state, setState] = useState<ListState<T>>({
    continuation: undefined,
    items: [],
    hasMore: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const firstLoad = useRef(false)

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
    if (!firstLoad.current) {
      loadData(undefined)
      firstLoad.current = true
    }
  }, [loadData])

  if (isLoading && state.items.length === 0) {
    return (
      <BarWrapper>
        <Heading3>Loading..</Heading3>
      </BarWrapper>
    )
  }

  if (state.items.length === 0 && !state.hasMore) {
    return (
      <BarWrapper>
        <Heading3>No entries</Heading3>
        <Description>
          There's no orders with this criteria.{" "}
          <LoadMoreButton onClick={() => loadData(undefined)}>Refresh list</LoadMoreButton>
        </Description>
      </BarWrapper>
    )
  }

  if (hasError) {
    return (
      <BarWrapper>
        <Heading3>Ooops..</Heading3>
        <Description>
          Something went wrong. <LoadMoreButton onClick={() => loadData(undefined)}>Try again</LoadMoreButton>
        </Description>
      </BarWrapper>
    )
  }

  return (
    <div>
      {renderWrapper(
        <React.Fragment>
          {state.items.map((x, i) => (
            <React.Fragment key={i} children={renderItem(x, i)} />
          ))}
        </React.Fragment>,
      )}
      <BarWrapper>
        <Bar onLoadMore={() => loadData(state.continuation)} state={state} isLoading={isLoading} />
      </BarWrapper>
    </div>
  )
}

const Description = styled.span`
  margin-top: 4px;
  display: block;
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
  font-weight: bold;
  color: ${p => p.theme.colors.primary};
`
