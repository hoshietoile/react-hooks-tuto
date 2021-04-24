import React from 'react'
// material-ui
import { makeStyles, withTheme } from '@material-ui/core/styles'
import DialogActions from '@material-ui/core/DialogActions'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// molecules
import BaseModal from './../molecules/BaseModal'
import FormInput from './../molecules/FormInput'

const EditorModal = ({ theme, open, dialogClose, imageSrc, handleSaveApply, form, dispatch }) => {
  const classes = makeStyles({
    editorDialogContent: {
      display: 'flex',
    },
    editorDialogForm: {
      padding: theme.spacing(2),
    },
  })()

  // セーブキャンセル
  const handleSaveCancel = () => {
    dialogClose()
  }
  // タイトル入力時ハンドラ
  const handleTitleInput = (e) => {
    dispatch({ type: 'title', payload: { value: e.target.value, message: '' } })
  }
  // 備考入力時ハンドラ
  const handleDescriptionInput = (e) => {
    dispatch({ type: 'description', payload: { value: e.target.value, message: '' } })
  }
  // モーダルフッターのテンプレート
  const footerTemplate = () => (
    <DialogActions>
      <Button autoFocus onClick={handleSaveCancel} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleSaveApply} color="primary">
        Ok
      </Button>
    </DialogActions>
  )

  return (
    <BaseModal title="ドット絵を保存する" open={open} handleClose={dialogClose} footerTemplate={footerTemplate}>
      <div className={classes.editorDialogContent}>
        <img src={imageSrc} />
        <Grid container direction="column" className={classes.editorDialogForm}>
          <FormInput
            label="タイトル"
            value={form.title.value}
            onChange={handleTitleInput}
            isInvalid={form.title.message.length > 0}
            feedback={form.title.message}
          />
          <FormInput
            label="備考"
            value={form.description.value}
            onChange={handleDescriptionInput}
            multiline
            rowsMax={12}
            error={form.description.message.length > 0}
          />
        </Grid>
      </div>
    </BaseModal>
  )
}

export default withTheme(EditorModal)
