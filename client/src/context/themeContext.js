import { createContext, useState, useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { pink, blue, grey } from '@mui/material/colors';

export const ThemeContext = createContext({toggleColorMode: () => {}})

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light')
  console.log('mode', mode)
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
    }
  }), [])

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light' 
        ? {
            primary: {
              main: '#fff',
              dark: grey[400],
              light: grey[100],
            },
            info: {
              main: pink[600],
            },
            secondary: {
              main: blue[600],
              light: blue[100],
            }
          }
        : {
          primary: {
            main: '#333',
            dark: '#333',
            light: '#121212',
          },
          info: {
            main: pink[600],
          },
          secondary: {
            main: blue[600],
            light: blue[100],
          }}
        )
      
    }
  }), [mode])

  return <ThemeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  </ThemeContext.Provider>
}