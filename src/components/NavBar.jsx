import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { AuthContext } from '../context/AuthContext'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

export default function NavBar() {
  const currDate = new Date().toLocaleDateString()
  const { isLogin, logout } = useContext(AuthContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='subtitle1'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            СЕРВИСНЫЙ ЦЕНТР&nbsp;&nbsp; F10.BY
          </Typography>
          <Typography variant='subtitle1' component='div' sx={{ flexGrow: 2 }}>
            Сегодня:&nbsp; {currDate}
          </Typography>
          {isLogin ? (
            <Button
              endIcon={<ExitToAppIcon />}
              color='inherit'
              variant='outlined'
              size='small'
              onClick={logout}
            >
              Выйти
            </Button>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
