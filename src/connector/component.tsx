import { ConnectionState, IConnector } from "@rarible/sdk-wallet-connector";
import { Rx, useRxOrThrow } from "@rixio/react";
import { useMemo } from "react";
import { from } from "rxjs";
import { Button } from "antd";

type SdkWalletConnectorProps<C> = {
    connector: IConnector<string, C>
    children: (conn: C) => JSX.Element
}

export function SdkWalletConnector<O, C>({ connector, children }: SdkWalletConnectorProps<C>) {
    const conn = useRxOrThrow(connector.connection)

    if (conn.status === "disconnected" || conn.status === "connecting") {
        return <Options connector={connector} connectionState={conn}/>
    } else if (conn.status === "initializing") {
        return <p>Initializing...</p>
    } else {
        return (
            <div>
                {conn.disconnect && <Button onClick={conn.disconnect}>disconnect</Button>}
                {children(conn.connection)}
            </div>
        )
    }

}

interface OptionsProps<C> {
    connector: IConnector<string, C>
    connectionState: ConnectionState<C>
}

function Options<C>({ connector, connectionState }: OptionsProps<C>) {
    const options$ = useMemo(() => from(connector.getOptions()), [connector])
    return <Rx value$={options$}>{options => (
        <div>
            <p>Connect to:</p>
            {options.map(o => <div key={o.option}>
                <Button onClick={() => connector.connect(o)}>{o.option}</Button>
                {connectionState.status === "connecting" && connectionState.providerId === o.provider.getId() ? "Connecting..." : null}
            </div>)}
        </div>
    )}</Rx>
}