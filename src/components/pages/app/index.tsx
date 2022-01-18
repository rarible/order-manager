import type { StateConnected } from "@rarible/sdk-wallet-connector"
import { Switch } from "react-router-dom"
import type { match } from "react-router"
import { Redirect, Route } from "react-router"
import type { Connection } from "../../../business/blockchain/domain"
import { ConnectionProvider } from "../../../business/context"
import { generateOrdersPath, routes } from "../routes"
import { OrderTypeEnum } from "../../../business/domain"
import { isKnownOrderType } from "../../../business/domain"
import { OrdersPage } from "./orders"

export type AppPageProps = {
  state: StateConnected<Connection>
}

export function AppPage({ state }: AppPageProps) {
  return (
    <ConnectionProvider state={state}>
      <Switch>
        <Route
          exact
          path={routes.orders}
          render={({ match }) => {
            const type = parseType(match)
            if (type) {
              return <OrdersPage type={type} />
            }
            return <Redirect to={generateOrdersPath(OrderTypeEnum.SELL)} />
          }}
        />
        <Route render={() => <Redirect to={generateOrdersPath(OrderTypeEnum.SELL)} />} />
      </Switch>
    </ConnectionProvider>
  )
}

function parseType(match: match<any>): OrderTypeEnum | undefined {
  if ("type" in match.params && typeof match.params.type === "string") {
    if (isKnownOrderType(match.params.type)) {
      return match.params.type
    }
  }
  return undefined
}
