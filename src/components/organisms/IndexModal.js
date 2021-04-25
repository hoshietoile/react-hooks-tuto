import React from 'react'
// material-ui
import DialogActions from '@material-ui/core/DialogActions'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// molecules
import BaseModal from './../molecules/BaseModal'

const IndexModal = ({ title, open, handleClose, imageSrc }) => {
  // モーダルフッターのテンプレート
  const footerTemplate = () => (
    <DialogActions>
      <Button autoFocus onClick={handleClose} color="primary">
        Cancel
      </Button>
      {/* <Button onClick={handleSaveApply} color="primary">
        Ok
      </Button> */}
    </DialogActions>
  )
  return (
    <BaseModal title={title} open={open} handleClose={handleClose} footerTemplate={footerTemplate}>
      <div>
        <img src={imageSrc} />
      </div>
    </BaseModal>
  )
}

export default IndexModal
