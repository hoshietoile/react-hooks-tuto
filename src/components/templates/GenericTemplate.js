import React, { useState, useMemo } from 'react'
// dependencies
import { NavLink, Link } from 'react-router-dom'
import clsx from 'clsx'
// material-ui
import * as colors from '@material-ui/core/colors'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// icons
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import CloseIcon from '@material-ui/icons/Close'
// consts
import styleConsts from './../../config/styleConsts'

const drawerWidth = 240

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
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {},
    menuButtonHidden: {
      display: 'none',
    },
    closeButton: {},
    closeButtonHidden: {
      display: 'none',
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      paddingTop: theme.spacing(8),
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
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
    link: {
      textDecoration: 'none',
      color: styleConsts.TEXT.DEFAULT,
    },
    activeLink: {
      color: styleConsts.TEXT.DISABLE,
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
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close drawer"
              onClick={handleDrawerToggle}
              className={clsx(classes.closeButton, !open && classes.closeButtonHidden)}
            >
              <CloseIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit">
              ReactSampleApp
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
        >
          <List>
            <NavLink exact to="/" className={classes.link} activeClassName={classes.activeLink}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="一覧" />
              </ListItem>
            </NavLink>
            <NavLink to="/editor" className={classes.link} activeClassName={classes.activeLink}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="ドローイング" />
              </ListItem>
            </NavLink>
            <NavLink to="/mylist" className={classes.link} activeClassName={classes.activeLink}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="マイリスト" />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
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
