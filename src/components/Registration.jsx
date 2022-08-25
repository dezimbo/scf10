import React, { useState } from 'react'
import {
  IconButton,
  Button,
  Typography,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Box,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios'

export default function Registration() {
  const registerHendler = async () => {
    try {
      await axios
        .post(
          'https://scf10.herokuapp.com/api/auth/registration',
          { ...values },
          {
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setState({
              ...state,
              alert: res.data.msg,
              severity: 'success',
            })
          }
          if (res.status === 202) {
            setState({
              ...state,
              alert: res.data.msg,
              severity: 'error',
            })
          }
        })
    } catch (error) {
      console.log(error.response.data[0])
      if (error.response.data) {
        const newState = {
          nameError: '',
          passError: '',
        }
        error.response.data.forEach((item) => {
          if (item.param === 'username') {
            newState.nameError = item.msg
          }
          if (item.param === 'password') {
            newState.passError = item.msg
          }
        })
        setState({ ...state, ...newState })
      }
    }
  }

  const [state, setState] = useState({
    nameError: '',
    passError: '',
    alert: false,
    severity: 'success',
  })
  const { nameError, passError, alert, severity } = state

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
    if (event.target.value.length > 2) {
      setState({
        ...state,
        nameError: false,
        passError: false,
      })
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: '8rem',
      }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h2' component='h1' gutterBottom>
        Регистрация
      </Typography>

      <TextField
        error={!!nameError}
        id='outlined-basic'
        label='Имя Фамилия'
        value={values.username}
        onChange={handleChange('username')}
        sx={{ m: 1, mt: 2, width: '35ch' }}
        helperText={nameError}
      />

      <FormControl
        error={!!passError}
        variant='outlined'
        sx={{ m: 1, mt: 2, width: '35ch' }}
      >
        <InputLabel htmlFor='outlined-adornment-password'>Пароль</InputLabel>
        <OutlinedInput
          id='outlined-adornment-password'
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label='Password'
        />
        <FormHelperText id='component-error-text'>{passError}</FormHelperText>
      </FormControl>

      <Button
        variant='contained'
        size='large'
        sx={{ mt: '1rem' }}
        onClick={registerHendler}
      >
        Зарегистрировать
      </Button>

      <Button component={RouterLink} to={'/login'} sx={{ mt: '0.5rem' }}>
        Уже Есть аккаунт?
      </Button>
      <Snackbar
        open={!!alert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setState({ ...state, alert: null })
          }}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {alert}
        </Alert>
      </Snackbar>
    </Box>
  )
}
