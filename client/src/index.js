import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {  ThemeProvider } from '@mui/material/styles'
import AdapterMoment from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import theme from './style/theme'
import { CssBaseline } from '@mui/material'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CssBaseline />
      <App />
    </LocalizationProvider>
  </ThemeProvider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
