import type { Order } from "@rarible/ethereum-api-client"
import { OrderStatus } from "@rarible/ethereum-api-client"
import styled from "styled-components"
import { Atom } from "@rixio/atom"
import { useCallback, useMemo } from "react"
import { useAtom } from "@rixio/react"
import { TabNav } from "../../common/tab-nav"
import { createTabNav } from "../../common/tab-nav/utils"
import type { ListResponse } from "../../common/list"
import { OrderList } from "../../common/order-list"
import { useConnectionContext } from "../../../business/context"
import type { RaribleConnectedState } from "../../../business/blockchain/domain"
import { OrderTypeEnum } from "../../../business/domain"

export type OrdersPageProps = {
  type: OrderTypeEnum
}

export function OrdersPage({ type }: OrdersPageProps) {
  const { state } = useConnectionContext()
  const status = useAtom(status$)

  const loadMore = useCallback(
    async (continuation: string | undefined) => {
      const x = await loadOrders(state, type, status, continuation)
      return {
        data: x.orders,
        continuation: x.continuation,
      } as ListResponse<Order>
    },
    [state, type, status],
  )

  const handleCancel = useMemo(() => {
    if (status !== OrderStatus.CANCELLED) {
      return (order: Order) => state.connection.sdk.order.cancel(order)
    }
    return undefined
  }, [status, state])

  return (
    <Wrapper>
      <TabNav tabs={statusOptions} current$={status$} />
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

const statusOptions = supportedStatus.map(x => createTabNav(x, labelByStatus[x as SupportedStatus]))
const status$ = Atom.create<OrderStatus>(OrderStatus.INACTIVE)

function loadOrders(
  state: RaribleConnectedState,
  type: OrderTypeEnum,
  status: OrderStatus,
  continuation: string | undefined,
) {
  if (type === OrderTypeEnum.SELL) {
    return state.connection.sdk.apis.order.getSellOrdersByMakerAndByStatus({
      maker: state.connection.address,
      status: [status],
      continuation,
    })
  }
  return state.connection.sdk.apis.order.getOrderBidsByMakerAndByStatus({
    maker: state.connection.address,
    status: [status],
    continuation,
  })
}
