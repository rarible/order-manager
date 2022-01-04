import type { Order } from "@rarible/ethereum-api-client"
import { OrderStatus, Platform } from "@rarible/ethereum-api-client"
import styled from "styled-components"
import { Atom } from "@rixio/atom"
import { useCallback, useMemo, useState } from "react"
import { useAtom } from "@rixio/react"
import { TabNav } from "../common/tab-nav"
import { createTabNav } from "../common/tab-nav/utils"
import type { ListResponse } from "../common/list"
import { OrderList } from "../common/order-list"
import { useConnectionContext } from "../../business/context"
import type { RaribleConnectedState } from "../../business/blockchain/domain"

export function OrdersPage() {
  const { state } = useConnectionContext()
  const [tab$] = useState(() => Atom.create<OrderStatus>(OrderStatus.INACTIVE))
  const status = useAtom(tab$)

  const loadMore = useCallback(
    async (continuation: string | undefined) => {
      const x = await loadOrders(state, status, continuation)
      return {
        data: x.orders,
        continuation: x.continuation,
      } as ListResponse<Order>
    },
    [state, status],
  )

  const handleCancel = useMemo(() => {
    if (status !== OrderStatus.CANCELLED) {
      return (order: Order) => state.connection.sdk.order.cancel(order)
    }
    return undefined
  }, [status, state])

  return (
    <Wrapper>
      <TabNav tabs={options} current$={tab$} />
      <ContentWrapper>
        <OrderList onCancel={handleCancel} key={status} onLoadMore={loadMore} />
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
`

const ContentWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-grow: 1;
`

/**
 * @todo add more statuses here if it needed
 */

const supportedStatus = [OrderStatus.INACTIVE, OrderStatus.ACTIVE, OrderStatus.CANCELLED] as const
type SupportedStatus = typeof supportedStatus[number]

const labelByStatus: Record<SupportedStatus, string> = {
  [OrderStatus.INACTIVE]: "Inactive",
  [OrderStatus.ACTIVE]: "Active",
  [OrderStatus.CANCELLED]: "Cancelled",
}

const options = supportedStatus.map(x => createTabNav(x, labelByStatus[x as SupportedStatus]))

function loadOrders(state: RaribleConnectedState, status: OrderStatus, continuation: string | undefined) {
  return state.connection.sdk.apis.order.getSellOrdersByMakerAndByStatus({
    maker: state.connection.address,
    platform: Platform.OPEN_SEA,
    status: [status],
    continuation,
  })
}
