import React, { useRef, useState, useMemo, useCallback, useReducer } from 'react'
// dependencies
import clsx from 'clsx'
// material-ui
import Card from '@material-ui/core/Card'
import { makeStyles, withTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
// templates
import GenericTemplate from './../templates/GenericTemplate'
// organisms
import EditorModal from './../organisms/EditorModal'
import Canvas from './../organisms/Canvas'
// molecules
import Alert from './../molecules/Alert'
import DropdownMenu from './../molecules/DropdownMenu'
// atoms
import Slider from './../atoms/Slider'
// consts
import consts from './../../config/consts'
// modules
import handleApi from './../../modules/handleApi'
import Api from './../../api/methods'
const api = new Api()

const dropdownList = [
  {
    value: consts.CELL_NUM.SMALL.VALUE,
    text: consts.CELL_NUM.SMALL.TEXT,
  },
  {
    value: consts.CELL_NUM.MEDIUM.VALUE,
    text: consts.CELL_NUM.MEDIUM.TEXT,
  },
  {
    value: consts.CELL_NUM.LARGE.VALUE,
    text: consts.CELL_NUM.LARGE.TEXT,
  },
]

const sliders = [
  {
    value: consts.EDITOR_SLIDER_DEFAULT_VALUE.R.VALUE,
    index: consts.EDITOR_SLIDER_DEFAULT_VALUE.R.INDEX,
  },
  {
    value: consts.EDITOR_SLIDER_DEFAULT_VALUE.G.VALUE,
    index: consts.EDITOR_SLIDER_DEFAULT_VALUE.G.INDEX,
  },
  {
    value: consts.EDITOR_SLIDER_DEFAULT_VALUE.B.VALUE,
    index: consts.EDITOR_SLIDER_DEFAULT_VALUE.B.INDEX,
  },
]

const defaultFormState = { ...consts.EDITOR_FORM }
const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return {
        ...state,
        title: action.payload,
      }
    case 'description':
      return {
        ...state,
        description: action.payload,
      }
    case 'init':
      return {
        ...defaultFormState,
      }
  }
}

const EditorPage = ({ theme }) => {
  const classes = makeStyles({
    editorCard: {
      padding: theme.spacing(2),
      display: 'flex',
    },
    editorToolbar: {
      width: '100%',
      boxSizing: 'border-box',
      padding: theme.spacing(2),
    },
    clearBtn: {},
    saveBtn: {},
    editorToolbarBtns: {
      paddingTop: theme.spacing(2),
    },
    editorToolbarSliders: {
      marginBottom: 'auto',
    },
    colorPickerInput: {
      display: 'none',
    },
    colorPickerSurface: {
      width: '100px',
      height: '20px',
    },
    editorToolbarColor: {
      width: '100px',
      height: '20px',
      marginLeft: 'auto',
    },
    alert: {},
  })()
  const canvasRef = useRef(null)
  const [form, dispatch] = useReducer(reducer, defaultFormState)
  const [imageSrc, setImageSrc] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [cell, setCell] = useState(consts.CELL_NUM.LARGE.VALUE)
  const [color, setColor] = useState('rgb(0,0,0)')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isShowToastr, setIsShowToastr] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const currentColorStyle = useMemo(() => {
    return { backgroundColor: color }
  }, [color])

  // スライダー移動時ハンドラ
  const sliderHandler = (e, index) => {
    const value = e.target.style.left
    if (!value) return
    const inputPercent = value.replace('%', '')
    const colors = color
      .slice(4, -1)
      .split(',')
      .map((color) => color.trim())
    const inputColor = (parseInt(inputPercent) * 255) / 100
    colors[index] = inputColor
    const newColor = `rgb(${colors.join(',')})`
    setColor(newColor)
  }
  // アラートクローズ時ハンドラ
  const handleToastrClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsShowToastr(false)
  }
  // アラート表示
  const showToastr = () => {
    setIsShowToastr(true)
  }
  // セルの数をセット->useEffectで再描画処理
  const handleCellSizeMenuClick = (cellNum) => {
    setCell(cellNum)
    setAnchorEl(null)
  }
  // セルの数でサイズを判定
  const cellSizeText = useMemo(() => {
    switch (parseInt(cell)) {
      case consts.CELL_NUM.SMALL.VALUE:
        return consts.CELL_NUM.SMALL.TEXT
      case consts.CELL_NUM.MEDIUM.VALUE:
        return consts.CELL_NUM.MEDIUM.TEXT
      case consts.CELL_NUM.LARGE.VALUE:
        return consts.CELL_NUM.LARGE.TEXT
      default:
        return '規格外のサイズ'
    }
  }, [cell])
  //
  const handleCellSetBtnClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  //
  const handleCellSetBtnClose = () => {
    setAnchorEl(null)
  }
  // モーダル閉じる
  const handleDialogClose = () => {
    setDialogOpen(false)
  }
  // キャンバスクリア
  const handleClearClick = () => {
    canvasRef.current.initializeCanvas()
  }
  // ドット絵セーブ
  const handleSaveClick = () => {
    setImageSrc(toDataUrl())
    setDialogOpen(true)
  }
  // ドット絵をbase64に変換
  const toDataUrl = () => {
    return canvasRef.current.getDataUrl()
  }
  // キャンバス初期化
  const initializeCanvas = () => {
    canvasRef.current.initializeCanvas()
  }
  // モーダル初期化
  const initialize = () => {
    initializeCanvas()
    initForm()
  }
  // form初期化
  const initForm = () => {
    dispatch({ type: 'init' })
  }
  // フォームの判定セット
  const handleIsInvalid = (value) => {
    setIsInvalid(value)
  }
  // セーブ時のハンドラ
  const handleSaveApply = async () => {
    if (validateForm()) {
      handleIsInvalid(false)
      const reqBody = {
        title: form.title.value,
        description: form.description.value,
        src: imageSrc,
      }
      await handleApi(
        api.storeImage(reqBody).then((res) => {
          console.log(res)
          initialize()
        })
      )
      handleDialogClose()
    } else {
      handleIsInvalid(true)
    }
    showToastr()
  }
  // フォームのバリデーション
  const validateForm = () => {
    const titleMsg = validateTitle()
    const descriptionMsg = validateDescription()
    const currentTitle = form.title
    const currentDescription = form.description
    dispatch({ type: 'title', payload: { ...currentTitle, message: titleMsg } })
    dispatch({ type: 'description', payload: { ...currentDescription, message: descriptionMsg } })
    if (titleMsg.length > 0 || descriptionMsg.length > 0) {
      return false
    } else {
      return true
    }
  }
  // タイトルのバリデータ
  const validateTitle = () => {
    const titleValue = form.title.value
    if (titleValue.length > consts.EDITOR_FORM_VALIDATION_MSG.TITLE.MAX.VALUE) {
      return consts.EDITOR_FORM_VALIDATION_MSG.TITLE.MAX.TEXT
    }
    if (titleValue.length === 0) {
      return consts.EDITOR_FORM_VALIDATION_MSG.TITLE.REQUIRED.TEXT
    }
    return ''
  }
  // 備考のバリデータ
  const validateDescription = () => {
    const descriptionValue = form.description.value
    if (descriptionValue.length > consts.EDITOR_FORM_VALIDATION_MSG.DESCRIPTION.MAX.VALUE) {
      return consts.EDITOR_FORM_VALIDATION_MSG.DESCRIPTION.MAX.TEXT
    }
    return ''
  }

  return (
    <GenericTemplate>
      <Card className={classes.editorCard}>
        <Canvas ref={canvasRef} color={color} cell={cell} />
        <Paper variant="outlined" className={classes.editorToolbar}>
          <Grid container direction="column" className={classes.editorToolbarSliders}>
            <Grid container direction="row">
              <Typography component="h1" variant="h6" color="inherit">
                Cell Size
              </Typography>
              <DropdownMenu
                ariaControl="editor-cell-size-menu"
                anchorEl={anchorEl}
                items={dropdownList}
                listClickHandler={handleCellSizeMenuClick}
                handleDropdownButtonClick={handleCellSetBtnClick}
                handleDropdownClose={handleCellSetBtnClose}
              />
            </Grid>
            <Divider />
            <Grid container>
              <Typography component="h1" variant="h6" color="inherit">
                {cellSizeText}
              </Typography>
            </Grid>

            <Grid container direction="row">
              <Typography component="h1" variant="h6" color="inherit">
                Current Color
              </Typography>
              <Box className={classes.editorToolbarColor} style={currentColorStyle} />
            </Grid>

            <Divider />
            {/* 本当はmapしたいけどレンダリングごとに三本ともレンダリングかかるのでいったんパス */}
            <Slider
              valueLabelDisplay="auto"
              aria-label="Custom slider"
              defaultValue={sliders[0].value}
              onChange={(e) => sliderHandler(e, sliders[0].index)}
            />
            <Slider
              valueLabelDisplay="auto"
              aria-label="Custom slider"
              defaultValue={sliders[1].value}
              onChange={(e) => sliderHandler(e, sliders[1].index)}
            />
            <Slider
              valueLabelDisplay="auto"
              aria-label="Custom slider"
              defaultValue={sliders[2].value}
              onChange={(e) => sliderHandler(e, sliders[2].index)}
            />
          </Grid>
          <Divider />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            className={classes.editorToolbarBtns}
          >
            <Button color="secondary" className={classes.clearBtn} onClick={handleClearClick}>
              CLEAR
            </Button>
            <Button variant="contained" className={classes.saveBtn} color="primary" onClick={handleSaveClick}>
              SAVE
            </Button>
          </Grid>
        </Paper>
      </Card>

      <EditorModal
        open={dialogOpen}
        imageSrc={imageSrc}
        dialogClose={handleDialogClose}
        form={form}
        dispatch={dispatch}
        handleSaveApply={handleSaveApply}
      />
      <Alert
        isShow={isShowToastr}
        handleClose={handleToastrClose}
        feedback={isInvalid ? '入力を確認してください' : '保存しました'}
      />
    </GenericTemplate>
  )
}

export default withTheme(EditorPage)
