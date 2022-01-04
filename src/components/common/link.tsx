import type { StyledComponentPropsWithRef } from "styled-components"
import styled from "styled-components"
import { transparentize } from "polished"

export const Link = styled.a`
  text-decoration: none;
  color: ${p => p.theme.colors.primary};

  &:hover,
  &:focus,
  &:active {
    color: ${p => transparentize(0.1, p.theme.colors.primary)};
    cursor: pointer;
  }
`

export type LinkProps = StyledComponentPropsWithRef<typeof Link>

export function ExternalLink(props: LinkProps) {
  return <Link target="_blank" rel="noopener noreferrer" {...props} />
}
