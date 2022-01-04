import type { ProviderOption } from "@rarible/sdk-wallet-connector"
import type { Connection, SupportedConnectionType } from "../../../business/blockchain/domain"

export type ConnectOption = {
  logo: string
  label: string
  option: ProviderOption<SupportedConnectionType, Connection>
}
