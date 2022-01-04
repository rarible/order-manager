import React from "react"
import styled from "styled-components"
import { Heading2 } from "./heading"

type JumbotronProps = {
  label: string
  description: string | React.ReactElement
}

export function Jumbotron({ label, description }: JumbotronProps) {
  return (
    <Wrapper>
      <Heading2>{label}</Heading2>
      <Description>{description}</Description>
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
