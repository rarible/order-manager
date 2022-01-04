import styled from "styled-components"
import { Container } from "./container"
import { ExternalLink } from "./link"

export function Footer() {
  return (
    <Wrapper as="footer">
      <span>
        Made with love by <BoldLink href="https://rarible.com">Rarible</BoldLink> team using{" "}
        <BoldLink href="https://rarible.org">Rarible Protocol</BoldLink>
      </span>
    </Wrapper>
  )
}

const Wrapper = styled(Container).attrs({
  as: "footer",
})``

const BoldLink = styled(ExternalLink)`
  font-weight: bold;
`
