import React, { useState } from "react"
import { SnackbarProvider } from 'notistack'
import TodoListContract from "./contracts/TodoList.json"
import getWeb3 from "./getWeb3"
import AppBar from "./components/AppBar"
import Main from "./components/Main"
import "./App.css"
import useNetwork from "./hooks/useNetwork"
import useContract from "./hooks/useContract"
import Notify from "./components/Notify"


const App = () => { 
  const [msg, setMsg] = useState(['info', ""]);
  const [{
    network,
    account,
    web3,
    wallet
  }, connectNetwork, disconnectNetwork] = useNetwork({ setMsg })
  const [{ createTask }] = useContract({ web3, account, setMsg })

  return (
    <div className="App">
      <AppBar {...{
        wallet, account, network, connectNetwork,
        disconnectNetwork, setMsg
      }} />
      <Main {...{ createTask }} />
      <SnackbarProvider maxSnack={3}>
        <Notify {...{ msg }} />
      </SnackbarProvider>
    </div>
  );
}

export default App;
