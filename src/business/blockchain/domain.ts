import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk"

export type Connection = {
  sdk: RaribleSdk
  address: string
}
