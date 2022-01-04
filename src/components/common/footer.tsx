import styled from "styled-components"
import { Container } from "./container"
import { Link } from "./link"

export function Footer() {
  return (
    <Wrapper as="footer">
      <span>
        Made with love by{" "}
        <BoldLink href="https://rarible.com" target="_blank" rel="noopener noreferrer">
          Rarible
        </BoldLink>{" "}
        team using{" "}
        <BoldLink href="https://rarible.org" target="_blank" rel="noopener noreferrer">
          Rarible Protocol
        </BoldLink>
      </span>
    </Wrapper>
  )
}

const Wrapper = styled(Container).attrs({
  as: "footer",
})``

const BoldLink = styled(Link)`
  font-weight: bold;
`
