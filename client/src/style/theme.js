import { createTheme } from '@mui/material/styles'
import { pink, blue, grey } from '@mui/material/colors';

const getTheme = (mode) => ({
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
    })
    
  },
});

export default getTheme
