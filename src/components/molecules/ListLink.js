import React from 'react'
// dependencies
import { NavLink } from 'react-router-dom'
// material-ui
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// consts
import styleConsts from './../../config/styleConsts'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: styleConsts.TEXT.DEFAULT,
  },
  activeLink: {
    color: styleConsts.TEXT.DISABLE,
  },
})

const ListLink = ({ children, linkTo, linkTitle }) => {
  const classes = useStyles()
  return (
    <NavLink exact to={linkTo} className={classes.link} activeClassName={classes.activeLink}>
      <ListItem button>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={linkTitle} />
      </ListItem>
    </NavLink>
  )
}

export default ListLink
