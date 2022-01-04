import { connector } from "../business/blockchain"
import { SdkWalletConnector } from "./connector"

export function App() {
  return (
    <div className="App">
      <SdkWalletConnector connector={connector}>{({ address }) => <div>connected: {address}</div>}</SdkWalletConnector>
    </div>
  )
}
