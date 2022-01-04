import styled from "styled-components"
import { getChainLabel } from "../../business/blockchain/utils"
import { Heading2 } from "./heading"

type InvalidChainProps = {
  id: number
}

export function InvalidChain({ id }: InvalidChainProps) {
  return (
    <Wrapper>
      <Heading2>Unsupported chain id</Heading2>
      <Description>Please switch your network to {getChainLabel(id)} network</Description>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: auto;
  text-align: center;
  max-width: 320px;
`

const Description = styled.p`
  margin-top: 12px;
`
