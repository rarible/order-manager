import { generatePath } from "react-router-dom"
import { OrderTypeEnum } from "../../business/domain"

export const routes = {
  index: "/",
  orders: `/orders/:type(${Object.values(OrderTypeEnum).join("|")})`,
}

export function generateOrdersPath(type: OrderTypeEnum): string {
  return generatePath(routes.orders, {
    type,
  })
}
