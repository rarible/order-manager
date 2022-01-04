import { connector } from "../../business/blockchain"
import { SdkWalletConnector } from "../common/connector"

export function IndexPage() {
  return (
    <SdkWalletConnector connector={connector}>{({ address }) => <div>connected: {address}</div>}</SdkWalletConnector>
  )
}
