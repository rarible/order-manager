import { Rx } from "@rixio/react"
import { map } from "rxjs/operators"
import { useCallback, useMemo } from "react"
import { defer } from "rxjs"
import styled from "styled-components"
import type { RaribleConnector, RaribleConnectorState } from "../../../business/blockchain/domain"
import { ActivityIndicator } from "../activity-indicator"
import { Touchable } from "../touchable"
import type { ConnectOption } from "./domain"
import { mapOption } from "./utils"

type OptionsProps = {
  connector: RaribleConnector
  state: RaribleConnectorState
}

export function ConnectOptions({ connector, state }: OptionsProps) {
  const options$ = useMemo(() => defer(() => connector.getOptions()).pipe(map(x => x.map(mapOption))), [connector])

  const getIsConnecting = useCallback(
    (option: ConnectOption) => {
      return state.status === "connecting" && state.providerId === option.option.provider.getId()
    },
    [state],
  )

  const handleConnect = useCallback((option: ConnectOption) => connector.connect(option.option), [connector])

  return (
    <Rx value$={options$}>
      {options => (
        <Grid>
          {options.map((o, i) => (
            <Entry isConnecting={getIsConnecting} onConnect={handleConnect} key={i} option={o} />
          ))}
        </Grid>
      )}
    </Rx>
  )
}

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 16px;
`

type EntryProps = {
  option: ConnectOption
  onConnect: (option: ConnectOption) => void
  isConnecting: (option: ConnectOption) => boolean
}

function Entry({ option, isConnecting, onConnect }: EntryProps) {
  const connecting = isConnecting(option)

  return (
    <EntryWrapper onClick={() => onConnect(option)}>
      <ImageWrapper>
        {connecting ? (
          <ActivityIndicator />
        ) : (
          <img src={option.logo} alt={`Connect to ${option.label}`} width="32px" height="32px" />
        )}
      </ImageWrapper>
      <EntryContent>
        <EntryHeading>{option.label}</EntryHeading>
      </EntryContent>
    </EntryWrapper>
  )
}

const ImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EntryContent = styled.div`
  padding-left: 16px;
`

const EntryHeading = styled.h3`
  font-size: 18px;
  font-weight: bold;
`

const EntryWrapper = styled(Touchable)`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  border: 1px solid ${p => p.theme.colors.line};
  border-radius: 16px;
  padding: 16px;
  transition: 0.2s all ease-in-out;

  &:hover,
  &:focus,
  &:active {
    border-color: ${p => p.theme.colors.sub};
  }
`
