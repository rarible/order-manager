import type { Order } from "@rarible/ethereum-api-client"
import React, { useCallback } from "react"
import styled from "styled-components"
import type { ListResponse } from "../list"
import { List } from "../list"
import { OrderRow } from "./row"

export type OrderListProps = {
  onCancel: ((order: Order) => void) | undefined
  onLoadMore: (continuation: string | undefined) => Promise<ListResponse<Order>>
}

export function OrderList({ onLoadMore, onCancel }: OrderListProps) {
  const renderEntry = useCallback(
    (order: Order, i: number) => {
      return <OrderRow onCancel={onCancel} index={i} order={order} />
    },
    [onCancel],
  )
  return <List renderWrapper={renderWrapper} onLoadMore={onLoadMore} renderItem={renderEntry} />
}

function renderWrapper(content: React.ReactElement) {
  return (
    <Table>
      <thead>
        <th scope="col">#</th>
        <th scope="col">Make</th>
        <th scope="col">Take</th>
        <th scope="col">Actions</th>
      </thead>
      <tbody>{content}</tbody>
    </Table>
  )
}

const Table = styled.table`
  width: 100%;
  font-size: 15px;

  th {
    font-weight: bold;
    text-align: left;
  }

  th:nth-child(1) {
    min-width: 40px;
  }

  thead {
    border-bottom: 2px solid ${p => p.theme.colors.sub};
  }

  td,
  th {
    padding: 12px 0;
  }

  tr {
    border-bottom: 1px solid ${p => p.theme.colors.line};
  }
`
