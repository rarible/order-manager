import React, { FC } from 'react';
import './App.css';
import { SdkWalletConnector } from "./connector/component";
import { connector } from "./connector";

const App: FC = () => (
    <div className="App">
      <SdkWalletConnector connector={connector}>{
          ({ sdk, address }) => <div>connected: {address}</div>
      }</SdkWalletConnector>
    </div>
);

export default App;