import { getChainLabel } from "../../business/blockchain/utils"
import { Jumbotron } from "./jumbotron"

type InvalidChainProps = {
  id: number
}

export function InvalidChain({ id }: InvalidChainProps) {
  return (
    <Jumbotron
      label="Unsupported chain id"
      description={`Please switch your network to ${getChainLabel(id)} network`}
    />
  )
}
