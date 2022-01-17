import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Grid, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Send } from '@mui/icons-material'

export default function ButtonAppBar({
  wallet, network, account, isConnected,
  connectNetwork, disconnectNetwork, setMsg
}) {
  const [loading, setLoading] = useState(false)
  const [isConnBtnOn, setIsConnBtnOn] = useState(true)

  const handleWalletInfoChange = (e) => {
    console.log(e.target.value);
  }

  const handleConnect = () => {
    setLoading(true)
    if (!isConnected) connect()
    else disconnect()

    setLoading(false)
  }

  const handleDisconnect = () => {
    setLoading(true)
    disconnect()
    setLoading(false)
  }

  const connect = () => {
    try {
      connectNetwork()
      setIsConnBtnOn(false)
    } catch (err) {
      err
        ? setMsg(['info', 'Something went wrong!'])
        : setMsg(['error', 'An error occured while connecting to the network!'])
    }
  }

  const disconnect = () => {
    try {
      disconnectNetwork()
      setIsConnBtnOn(true)
    } catch (err) {
      err
        ? setMsg(['info', 'Something went wrong!'])
        : setMsg(['error', 'An error occured while disconnecting to the network!'])
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: '',
        }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid container item 
              justifyContent='flex-start'
              alignItems='flex-start'
               xs={6}>
              <Typography
                color="secondary.main"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  textShadow: `0px 3px 0px #BBDEFB,
                  0px 14px 10px rgba(13,71,161, 0.1),
                  0px 24px 2px rgba(13,71,161, 0.1),
                  0px 34px 30px rgba(13,71,161, 0.1)`,
                  lineHeight: 1,
                  fontStyle: 'italic',
                }}>
                TACHE
              </Typography>
            </Grid>
            <Grid container xs={6} direction='row'>
              <Grid
                container
                item
                xs={10}>
                <TextField 
                  id="wallet-info"
                  label="Connection Info: Wallet/ChainID NetworkID (Network TYpe)/Account"
                  value={`${wallet} / ${network} / ${account}`}
                  onChange={handleWalletInfoChange}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    flexGrow: 1,
                    mr: 2
                  }}
                />
              </Grid>
              <Grid
                container 
                item
                justifyContent={'flex-end'}
                xs={2}
                >
                <LoadingButton
                  color="inherit"
                  variant='outlined'
                  loading={loading}
                  // endIcon={<Send />}
                  onClick={isConnBtnOn ? handleConnect : handleDisconnect}
                  // loadingPosition='end'
                  sx={{
                    color: 'secondary.main',
                    pl: 3,
                    pr: 3,
                    pt: 1,
                    pb: 1,
                    position: 'relative',
                    borderRadius: '5px',
                    ':before': {
                      content: '""',
                      boxSizing: 'inherit',
                      position: 'absolute',
                      width: 0,
                      height: 0,
                      border: 'thin solid transparent',
                      borderRadius: '5px',
                      top: 0,
                      left: 0,
                    },
                    ':after': {
                      content: '""',
                      boxSizing: 'inherit',
                      position: 'absolute',
                      width: 0,
                      height: 0,
                      border: 'thin solid transparent',
                      borderRadius: '5px',
                      bottom: 0,
                      right: 0,
                    },
                    ':hover': {
                      color: 'info.main'
                    },
                    ':hover:before': {
                      width: '100%',
                      height: '100%',
                      borderTopColor: 'info.main',
                      borderRightColor: 'info.main',
                      borderRadius: '5px',
                      transition: `width 0.5s ease-in-out, height 0.75s ease-in-out`,
                    },
                    ':hover:after': {
                      width: '100%',
                      height: '100%',
                      borderBottomColor: 'info.main',
                      borderLeftColor: 'info.main',
                      borderRadius: '5px',
                      transition: `border-color 0s ease-in-out 0.5s, width 0.25s ease-in-out 0.5s, height 0.25s ease-in-out 0.75s`,
                    },
                    transition: 'color 0.2s',
                  }}>
                    {isConnBtnOn ? 'Connect' : 'Disconnect'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
