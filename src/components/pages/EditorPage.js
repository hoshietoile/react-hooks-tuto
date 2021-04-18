import React, { useRef, useEffect, useState, useMemo } from 'react'
// dependencies
import clsx from 'clsx'
// material-ui
import Card from '@material-ui/core/Card'
import { makeStyles, withTheme, withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
// import Alert from '@material-ui/lab/Alert'
// templates
import GenericTemplate from './../templates/GenericTemplate'
// modules
// import api from './../../api/index'
import handleApi from './../../modules/handleApi'
import Api from './../../api/methods'
const api = new Api()

const CustomSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider)

const EditorPage = ({ theme }) => {
  const classes = makeStyles({
    editorCard: {
      padding: theme.spacing(2),
      display: 'flex',
    },
    canvasWrapper: {
      width: '100%',
      height: '100%',
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
      margin: 'auto',
    },
    editorDialogContent: {
      display: 'flex',
    },
    editorDialogForm: {
      padding: theme.spacing(2),
    },
    alert: {},
  })()
  const canvas = useRef(null)
  const [context, setContext] = useState(null)
  const [w, setW] = useState(0)
  const [h, setH] = useState(0)
  const [cellSize, setCellSize] = useState(20)
  const [cell, setCell] = useState(12)
  const [drawing, setDrawing] = useState(false)
  const [color, setColor] = useState('rgb(0,0,0)')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [form, setForm] = useState({
    title: {
      value: '',
      message: '',
    },
    description: {
      value: '',
      message: '',
    },
  })
  const [isInvalid, setIsInvalid] = useState(false)
  const [isShowToastr, setIsShowToastr] = useState(false)

  const currentColorStyle = useMemo(() => {
    return { backgroundColor: color }
  }, [color])

  // キャンバスの縦 横取得
  const getCanvasSize = (cnvs) => {
    let w = 0
    let h = 0
    if (cnvs && cnvs.parentNode) {
      const parentNodeRect = cnvs.parentNode.getBoundingClientRect()
      const cellNum = cell
      // const windowHeight = Math.ceil((window.innerHeight - parentNodeRect.top) / cellNum) * cellNum
      const maxHeight = 480
      const { width, height } = parentNodeRect

      if (cellNum !== 0) {
        const cellW = Math.floor(width / cellNum) // とりあえず 横幅基準でサイズ指定
        // const cellH = Math.floor(height / cellNum)
        w = Math.min(cellW * cellNum, maxHeight)
        h = Math.min(cellW * cellNum, maxHeight)
      }
    }
    return [w, h]
  }
  // キャンバス初期化
  const clearCanvas = () => {
    const ctxt = canvas.current.getContext('2d')
    ctxt.clearRect(0, 0, w, h)
    ctxt.fillStyle = '#fff'
    ctxt.fillRect(0, 0, w, h)
  }
  // 罫線表示
  const drawRule = () => {
    const cnvs = canvas.current
    const ctxt = cnvs.getContext('2d')
    const [w, h] = getCanvasSize(cnvs)
    ctxt.strokeStyle = '#333'
    ctxt.lineWidth = 0.3
    ctxt.beginPath()
    // 縦線
    for (let i = 0; i < cell + 1; i++) {
      ctxt.moveTo(i * cellSize, 0)
      ctxt.lineTo(i * cellSize, w)
    }
    // 横線
    for (let i = 0; i < cell + 1; i++) {
      ctxt.moveTo(0, i * cellSize)
      ctxt.lineTo(h, i * cellSize)
    }
    ctxt.stroke()
  }
  // 描画処理
  const execDraw = (e) => {
    const ctxt = context
    const col = Math.floor(e.layerX / cellSize)
    const row = Math.floor(e.layerY / cellSize)
    ctxt.fillStyle = color
    ctxt.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
  }
  // ドラッグスタート
  const handleMouseDown = (e) => {
    execDraw(e)
    setDrawing(true)
  }
  // ドラッグ時ハンドラ
  const handleMouseDrag = (e) => {
    if (drawing) {
      execDraw(e)
    }
  }
  // ドラッグエンド
  const endDrawing = () => {
    setDrawing(false)
  }
  // ドット絵をbase64に変換
  const toDataUrl = () => {
    const base64 = canvas.current.toDataURL('image/jpeg')
    return base64
  }
  // 初回レンダリング時実行
  useEffect(() => {
    const cnvs = canvas.current
    const ctxt = cnvs.getContext('2d')
    setContext(ctxt)
    const [w, h] = getCanvasSize(cnvs)
    setCellSize(w / cell)
    setW(w)
    setH(h)
    clearCanvas()
    drawRule()
  }, [])
  // 更新時処理
  useEffect(() => {
    if (context) {
      clearCanvas()
      drawRule()
    }
  }, [context, w, h])
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
    const newColor = `rgb(${colors})`
    setColor(newColor)
  }
  // キャンバス初期化
  const handleClearClick = () => {
    clearCanvas()
    drawRule()
  }
  // ドット絵セーブ
  const handleSaveClick = () => {
    setDialogOpen(true)
  }
  const handleEntering = async () => {
    const base64 = toDataUrl()
    setImageSrc(base64)
  }
  const handleSaveCancel = () => {
    setDialogOpen(false)
  }
  // セーブ時のハンドラ
  const handleSaveApply = async () => {
    if (validateForm()) {
      setIsInvalid(false)
      const reqBody = {
        title: form.title.value,
        description: form.description.value,
        src: imageSrc,
      }
      await handleApi(
        api.storeImage(reqBody).then((res) => {
          console.log(res)
        })
      )
      setDialogOpen(false)
    } else {
      setIsInvalid(true)
    }
    setIsShowToastr(true)
  }
  // フォームのバリデーション
  const validateForm = () => {
    const titleMsg = validateTitle()
    const descriptionMsg = validateDescription()
    const currentTitle = form.title
    const currentDescription = form.description
    setForm({
      title: { ...currentTitle, message: titleMsg },
      description: { ...currentDescription, message: descriptionMsg },
    })
    if (titleMsg.length > 0 || descriptionMsg.length > 0) {
      return false
    } else {
      return true
    }
  }
  // タイトルのバリデータ
  const validateTitle = () => {
    const titleValue = form.title.value
    if (titleValue.length > 20) {
      return '20文字以内にしてください'
    }
    if (titleValue.length === 0) {
      return 'タイトルは必須入力です'
    }
    return ''
  }
  // 備考のバリデータ
  const validateDescription = () => {
    const descriptionValue = form.description.value
    if (descriptionValue.length > 100) {
      return '100文字以内にしてください'
    }
    return ''
  }
  // タイトル入力時ハンドラ
  const handleTitleInput = (e) => {
    const prevForm = { ...form }
    const newForm = {
      ...prevForm,
      title: {
        value: e.target.value,
        message: '',
      },
    }
    setForm(newForm)
  }
  // 備考入力時ハンドラ
  const handleDescriptionInput = (e) => {
    const prevForm = { ...form }
    const newForm = {
      ...prevForm,
      description: {
        value: e.target.value,
        message: '',
      },
    }
    setForm(newForm)
  }
  // トースタークローズ時ハンドラ
  const handleToastrClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsShowToastr(false)
  }
  return (
    <GenericTemplate>
      <Card className={classes.editorCard}>
        <div className={classes.canvasWrapper}>
          <canvas
            ref={canvas}
            id="canvas"
            width={w}
            height={h}
            onMouseDown={(e) => handleMouseDown(e.nativeEvent)}
            onMouseMove={(e) => handleMouseDrag(e.nativeEvent)}
            onMouseUp={() => endDrawing()}
            onMouseLeave={() => endDrawing()}
          />
        </div>
        <Paper variant="outlined" className={classes.editorToolbar}>
          <Grid container direction="column" className={classes.editorToolbarSliders}>
            <Grid container direction="row">
              <Typography component="h1" variant="h6" color="inherit">
                Current Color
              </Typography>
              <Box className={classes.editorToolbarColor} style={currentColorStyle} />
            </Grid>

            <Divider />
            <CustomSlider
              valueLabelDisplay="auto"
              aria-label="Custom slider"
              defaultValue={20}
              onChange={(e) => sliderHandler(e, 0)}
            />
            <CustomSlider
              valueLabelDisplay="auto"
              aria-label="Custom slider"
              defaultValue={20}
              onChange={(e) => sliderHandler(e, 1)}
            />
            <CustomSlider
              valueLabelDisplay="auto"
              aria-label="Custom slider"
              defaultValue={20}
              onChange={(e) => sliderHandler(e, 2)}
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

      <Dialog maxWidth="lg" onEntering={handleEntering} open={dialogOpen}>
        <DialogTitle>ドット絵を保存する</DialogTitle>
        <DialogContent dividers>
          <div className={classes.editorDialogContent}>
            <img src={imageSrc} />
            <Grid container direction="column" className={classes.editorDialogForm}>
              <FormControl error>
                <TextField
                  label="タイトル"
                  value={form.title.value}
                  onChange={handleTitleInput}
                  error={form.title.message.length > 0}
                />
                <FormHelperText>{form.title.message}</FormHelperText>
              </FormControl>
              <FormControl error>
                <TextField
                  label="備考"
                  value={form.description.value}
                  onChange={handleDescriptionInput}
                  multiline
                  rowsMax={6}
                  error={form.description.message.length > 0}
                />
                <FormHelperText>{form.description.message}</FormHelperText>
              </FormControl>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveApply} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        className={classes.alert}
        open={isShowToastr}
        onClose={handleToastrClose}
        autoHideDuration={5000}
        message={isInvalid ? '入力を確認してください' : '保存しました'}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleToastrClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </GenericTemplate>
  )
}

export default withTheme(EditorPage)
