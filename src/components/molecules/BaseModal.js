import React from 'react'
// material-ui
import { makeStyles, withTheme } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'

const BaseModal = ({ theme, children, title, footerTemplate, open, handleClose }) => {
  const classes = makeStyles({
    dialog: {
      position: 'relative',
    },
    dialogClose: {
      position: 'absolute',
      display: 'inline-block',
      top: '10px',
      right: '10px',
      width: '50px',
      height: '30px',
      lineHeight: '30px',
      backgroundColor: theme.palette.error.main,
      color: theme.palette.primary.contrastText,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
  })()

  const renderFooter = () => {
    const template = footerTemplate ? footerTemplate() : null
    return template
  }

  return (
    <Dialog maxWidth="lg" open={open} className={classes.dialog}>
      <button className={classes.dialogClose} onClick={handleClose}>
        ✖
      </button>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {renderFooter()}
    </Dialog>
  )
}

export default withTheme(BaseModal)
