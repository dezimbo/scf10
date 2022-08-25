import React, { useState } from 'react'

import { TextField } from '@mui/material'
import { IMaskMixin } from 'react-imask'

const MaskedTextField = IMaskMixin(
  ({ inputRef, defaultValue, ...otherProps }) => (
    <TextField
      {...otherProps}
      inputRef={inputRef}
      value={defaultValue}
      autoComplete='off'
      fullWidth
    />
  )
)

export default function PhoneMask({ name, label, ...otherProps }) {
  const [value, setValue] = useState('')

  return (
    <MaskedTextField
      name={name}
      label={label}
      value={value}
      onAccept={(value) => {
        setValue(value)
      }}
      {...otherProps}
    />
  )
}