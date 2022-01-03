import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

export default function ButtonAppBar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '',
        }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid container item 
              justifyContent='flex-start'
              alignItems='flex-start'
               xs={9}>
              <Typography color="secondary.main"
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
            <Grid container justifyContent='right' item xs={3}>
              <Button color="inherit" variant='outlined'
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
                  Connect
                </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
