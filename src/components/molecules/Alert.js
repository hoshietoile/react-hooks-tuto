import React from 'react'
// material-ui
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const Alert = ({ isShow, handleClose, feedback }) => {
  return (
    <Snackbar
      open={isShow}
      onClose={handleClose}
      autoHideDuration={5000}
      message={feedback}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default Alert
