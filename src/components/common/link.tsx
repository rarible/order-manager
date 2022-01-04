import styled from "styled-components"
import { transparentize } from "polished"

export const Link = styled.a`
  text-decoration: none;
  color: ${p => p.theme.colors.primary};

  &:hover,
  &:focus,
  &:active {
    background: linear-gradient(126.49deg, #00a3ff 0%, #0066ff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: ${p => transparentize(0.1, p.theme.colors.primary)};
    cursor: pointer;
  }
`
