import React from 'react'
// dependencies
import clsx from 'clsx'
// material-ui
import { withTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
// icons
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

const TheHeader = ({ theme, isDrawerOpen, handleDrawerToggle }) => {
  const classes = makeStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {},
    menuButtonHidden: {
      display: 'none',
    },
    closeButton: {},
    closeButtonHidden: {
      display: 'none',
    },
  })()
  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          className={clsx(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close drawer"
          onClick={handleDrawerToggle}
          className={clsx(classes.closeButton, !isDrawerOpen && classes.closeButtonHidden)}
        >
          <CloseIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit">
          ReactSampleApp
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default withTheme(TheHeader)
