import {TextField} from '@mui/material'
import React from 'react';
import {useController} from 'react-hook-form'

export default function FormTextField({
  id,
  name,
  control,
  InputProps = {},
  onValueChange,
  ...props
}) {
  
  const {
    field: {onBlur, value, ref, onChange},
    fieldState: {invalid, error = {}},
  } = useController({
    name, control,
  })

  
  const handleOnChange = (event) => {
    onValueChange && onValueChange(event)
    onChange(event)
  }

  return (
    <TextField
      fullWidth
      variant='standard'
      ref={ref}
      id={id}
      name={name}
      value={value}
      error={invalid}
      helperText={error.message || ''}
      onChange={handleOnChange}
      onBlur={onBlur}
      InputProps={InputProps}
      {...props}
    />
  )
}