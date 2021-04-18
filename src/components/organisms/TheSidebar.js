import React from 'react'
// dependencies
import clsx from 'clsx'
// material-ui
import { withTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
// icons
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/List'
import GestureIcon from '@material-ui/icons/Gesture'
// molecules
import ListLink from './../molecules/ListLink'
// consts
import styleConsts from './../../config/styleConsts'

const TheSidebar = ({ theme, isDrawerOpen }) => {
  const drawerWidth = styleConsts.DRAWER.WIDTH
  const classes = makeStyles({
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
  })()
  return (
    <Drawer
      variant="permanent"
      open={isDrawerOpen}
      classes={{ paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose) }}
    >
      <List>
        <ListLink linkTo="/" linkTitle="一覧">
          <HomeIcon />
        </ListLink>
        <ListLink linkTo="/editor" linkTitle="ドローイング">
          <GestureIcon />
        </ListLink>
        <ListLink linkTo="/mylist" linkTitle="マイリスト">
          <ListIcon />
        </ListLink>
      </List>
    </Drawer>
  )
}

export default withTheme(TheSidebar)
