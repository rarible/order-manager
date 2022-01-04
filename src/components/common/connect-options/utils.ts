import type { ProviderOption } from "@rarible/sdk-wallet-connector"
import { DappType } from "@rarible/sdk-wallet-connector/build/connectors/ethereum/injected"
import type { Connection, SupportedConnectionType } from "../../../business/blockchain/domain"
import { ethereumIcon } from "./assets/ethereum"
import { metamaskIcon } from "./assets/metamask"
import { MEWIcon } from "./assets/mew"
import { torusIconWallet } from "./assets/torus"
import { walletlinkIcon } from "./assets/walletlink"
import type { ConnectOption } from "./domain"

export function mapOption(o: ProviderOption<SupportedConnectionType, Connection>): ConnectOption {
  if (o.option === "mew") {
    return {
      label: "MyEtherWallet",
      logo: MEWIcon,
      option: o,
    }
  }
  if (o.option === "torus") {
    return {
      label: "Torus",
      logo: torusIconWallet,
      option: o,
    }
  }
  if (o.option === "walletlink") {
    return {
      label: "Coinbase",
      logo: walletlinkIcon,
      option: o,
    }
  }
  if (o.option === DappType.Metamask) {
    return {
      label: "Metamask",
      logo: metamaskIcon,
      option: o,
    }
  }
  return {
    label: "Injected provider",
    logo: ethereumIcon,
    option: o,
  }
}
