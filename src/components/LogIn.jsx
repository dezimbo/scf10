import React, { useState, useContext } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
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
} from '@mui/material'
// import { Link as RouterLink, } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext)

  const loginHendler = async () => {
    try {
      await axios
        .post(
          'https://scf10.herokuapp.com/api/auth/login',
          { ...values },
          {
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        .then((response) => {
          login(response.data.token, response.data.UserId)
        })
    } catch (error) {
      if (error.response.status === 301) {
        setNameError(error.response.data.msg)
      } else if (error.response.status === 302) {
        setPassError(error.response.data.msg)
      }
    }
  }
  const [nameError, setNameError] = useState(null)
  const [passError, setPassError] = useState(null)
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box
      component='form'
      onSubmit={(event) => {
        event.preventDefault()
      }}
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
        Авторизация
      </Typography>

      <>
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
                  edge='end'
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label='Пароль'
          />
          <FormHelperText id='component-error-text'>{passError}</FormHelperText>
        </FormControl>
      </>

      <Button
        type={'submit'}
        onClick={loginHendler}
        variant='contained'
        size='large'
        sx={{ mt: '1rem' }}
      >
        Войти
      </Button>

      {/* <Button component={RouterLink} to={"/registration"} sx={{ mt: "0.5rem" }}>
                Нет аккаунта?
            </Button> */}
    </Box>
  )
}
