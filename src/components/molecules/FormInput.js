import React from 'react'

// material-ui
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

const FormInput = ({ label, value, onChange, multiline, rowsMax, isInvalid, feedback }) => {
  return (
    <FormControl error>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        multiline={multiline}
        rowsMax={rowsMax}
        error={isInvalid}
      />
      <FormHelperText>{feedback}</FormHelperText>
    </FormControl>
  )
}

export default FormInput
