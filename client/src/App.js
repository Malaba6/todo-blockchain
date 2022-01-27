import React, { useState, useEffect, useMemo } from "react"
import { SnackbarProvider } from 'notistack'
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles"
import TodoListContract from "./contracts/TodoList.json"
import getWeb3 from "./getWeb3"
import AppBar from "./components/AppBar"
import Main from "./components/Main"
import "./App.css"
import useNetwork from "./hooks/useNetwork"
import useContract from "./hooks/useContract"
import Notify from "./components/Notify"


const App = () => { 
  const theme = useTheme()
  const [msg, setMsg] = useState(['info', ""])
  // const [mode, setMode] = useState('light')
  // const colorMode = useMemo

  const [{
    network,
    account,
    web3,
    wallet
  }, connectNetwork, disconnectNetwork] = useNetwork({ setMsg })

  const [{
    createTask, setTasks, toggleTaskChange, deleteTask
  }, tasks] = useContract({ web3, account, setMsg })
  console.log('Mode ** ', theme.palette.mode);

  return (
      <div className={theme.palette.mode === 'light'
        ? 'App' : 'App-dark'}>
        <AppBar {...{
          wallet, account, network, connectNetwork,
          disconnectNetwork, setMsg
        }} />
        <Main {...{
          createTask, setTasks, toggleTaskChange,
          deleteTask
          }} tasks={tasks} />
        <SnackbarProvider maxSnack={3}>
          <Notify {...{ msg }} />
        </SnackbarProvider>
      </div>
  );
}

export default App;
