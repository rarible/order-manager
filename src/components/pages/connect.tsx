import { Rx } from "@rixio/react"
import { useMemo } from "react"
import { defer } from "rxjs"
import type { RaribleConnector, RaribleConnectorState } from "../../business/blockchain/domain"

export type ConnectPageProps = {
  connector: RaribleConnector
  state: RaribleConnectorState
}

export function ConnectPage({ connector, state }: ConnectPageProps) {
  return <Options connector={connector} state={state} />
}

type OptionsProps = {
  connector: RaribleConnector
  state: RaribleConnectorState
}

function Options({ connector, state }: OptionsProps) {
  const options$ = useMemo(() => defer(() => connector.getOptions()), [connector])
  return (
    <Rx value$={options$}>
      {options => (
        <div>
          <p>Connect to:</p>
          {options.map(o => (
            <div key={o.option}>
              <button onClick={() => connector.connect(o)}>{o.option}</button>
              {state.status === "connecting" && state.providerId === o.provider.getId() ? "Connecting..." : null}
            </div>
          ))}
        </div>
      )}
    </Rx>
  )
}
