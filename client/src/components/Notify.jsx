import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { Button } from '@mui/material'

const Notify = ({ msg }) => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()

  useEffect(() => {
    const [variant, message] = msg

    if (message === "") return

    const action = (key) =>
      <Button onClick={() => closeSnackbar(key)}>
        {'Dismiss'}
      </Button>
    
    const options = {
      variant,
      autoHideDuration: (variant === 'error' ? 20 : 5) * 1000,
      action
    }

    enqueueSnackbar(message, options)
  }, [enqueueSnackbar, closeSnackbar, msg])

  return <></>
}

export default Notify
