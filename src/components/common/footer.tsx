import styled from "styled-components"
import { Container } from "./container"
import { ExternalLink } from "./link"

export function Footer() {
  return (
    <Wrapper as="footer">
      <span>
        Made with love by <ExternalLink href="https://rarible.com">Rarible</ExternalLink> team using{" "}
        <ExternalLink href="https://rarible.org">Rarible Protocol</ExternalLink>. Source code is available on{" "}
        <ExternalLink href="https://github.com/rarible/order-manager">GitHub</ExternalLink>.
      </span>
    </Wrapper>
  )
}

const Wrapper = styled(Container).attrs({
  as: "footer",
})``
