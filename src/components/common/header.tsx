import { transparentize } from "polished"
import { useCallback } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import type { RaribleConnectorState } from "../../business/blockchain/domain"
import { OrderTypeEnum } from "../../business/domain"
import { generateOrdersPath } from "../pages/routes"
import { Container } from "./container"
import { Heading1 } from "./heading"
import { Logo } from "./logo"
import { StatusBar } from "./status-bar"

export type HeaderProps = {
  state: RaribleConnectorState
}

export function Header({ state }: HeaderProps) {
  return (
    <Container>
      <HorizontalMenu>
        <LeftSide>
          <Logo />
          <Menu state={state} />
        </LeftSide>
        <StatusBar state={state} />
      </HorizontalMenu>
    </Container>
  )
}

type MenuProps = {
  state: RaribleConnectorState
}

function Menu({ state }: MenuProps) {
  const activeCn = useCallback((isActive: boolean) => {
    return isActive ? "active" : "non-active"
  }, [])
  if (state.status === "connected") {
    return (
      <Ul>
        <NavLink className={activeCn} to={generateOrdersPath(OrderTypeEnum.SELL)}>
          <li>Sells</li>
        </NavLink>
        <NavLink className={activeCn} to={generateOrdersPath(OrderTypeEnum.BID)}>
          <li>Bids</li>
        </NavLink>
      </Ul>
    )
  }
  return <Heading1>Order manager</Heading1>
}

const Ul = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  list-style-type: none;
  margin: 0;
  margin-left: 16px;
  padding: 0;

  & > a {
    text-decoration: none;
    color: ${p => p.theme.colors.sub};
    border-bottom: 2px solid transparent;
    &:hover,
    &:focus,
    &:active {
      color: ${p => transparentize(0.1, p.theme.colors.contrast)};
    }

    &.active {
      color: ${p => p.theme.colors.contrast};
      border-color: ${p => p.theme.colors.contrast};
    }
  }

  & > *:not(:last-child) {
    margin-right: 16px;
  }
`

const LeftSide = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const HorizontalMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`
