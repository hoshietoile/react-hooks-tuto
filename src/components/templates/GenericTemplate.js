import React, { useState } from 'react'
// dependencies
import clsx from 'clsx'
// material-ui
import * as colors from '@material-ui/core/colors'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
// consts
import styleConsts from './../../config/styleConsts'
// organisms
import TheHeader from './../organisms/TheHeader'
import TheSidebar from './../organisms/TheSidebar'

// https://dev.classmethod.jp/articles/react-material-ui/
const theme = createMuiTheme({
  typography: {
    fontFamily: styleConsts.FONT.FAMILY,
  },
  palette: {
    primary: { main: colors.purple[900] }, // テーマの色
  },
})
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    main: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(8),
      height: '100vh',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
  })
)

const GenericTemplate = ({ children }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <TheHeader isDrawerOpen={open} handleDrawerToggle={handleDrawerToggle} />
        <TheSidebar isDrawerOpen={open} />
        <main className={classes.main}>
          <Container maxWidth="lg" className={classes.container}>
            {children}
          </Container>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default GenericTemplate
