import type { Order, OrderControllerApi } from "@rarible/ethereum-api-client"
import { OrderStatus, Platform } from "@rarible/ethereum-api-client"
import styled from "styled-components"
import { Atom } from "@rixio/atom"
import { useCallback, useMemo, useState } from "react"
import { useAtom } from "@rixio/react"
import { TabNav } from "../common/tab-nav"
import { createTabNav } from "../common/tab-nav/utils"
import type { ListResponse } from "../common/list"
import { OrderList } from "../common/order-list"
import { useAppContext } from "../../business/context"

export function OrdersPage() {
  const { address, sdk } = useAppContext()
  const [tab$] = useState(() => Atom.create<OrderStatus>(OrderStatus.INACTIVE))
  const status = useAtom(tab$)

  const loadMore = useCallback(
    async (continuation: string | undefined) => {
      const x = await loadOrders(sdk.apis.order, address, status, continuation)
      return {
        data: x.orders,
        continuation: x.continuation,
      } as ListResponse<Order>
    },
    [address, sdk.apis.order, status],
  )

  const handleCancel = useMemo(() => {
    if (status !== OrderStatus.CANCELLED) {
      return (order: Order) => sdk.order.cancel(order)
    }
    return undefined
  }, [status, sdk])

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
  width: 100%;
`

const ContentWrapper = styled.div`
  margin-top: 8px;
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

function loadOrders(api: OrderControllerApi, maker: string, status: OrderStatus, continuation: string | undefined) {
  return api.getSellOrdersByMakerAndByStatus({
    maker: maker,
    platform: Platform.RARIBLE,
    status: [status],
    continuation,
  })
}
