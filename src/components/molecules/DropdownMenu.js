import React from 'react'
// material-ui
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const DropdownMenu = ({
  ariaControl,
  anchorEl,
  items,
  listClickHandler,
  handleDropdownButtonClick,
  handleDropdownClose,
}) => {
  const classes = makeStyles({
    iconButton: {
      padding: '0',
      marginLeft: 'auto',
    },
  })()
  const renderList = () => {
    return items.map((item, index) => (
      <MenuItem key={index} onClick={() => listClickHandler(item.value)}>
        {item.text}
      </MenuItem>
    ))
  }

  return (
    <>
      <IconButton
        aria-controls={ariaControl}
        aria-haspopup="true"
        className={classes.iconButton}
        onClick={handleDropdownButtonClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id={ariaControl} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleDropdownClose} keepMounted>
        {renderList()}
      </Menu>
    </>
  )
}

export default DropdownMenu
