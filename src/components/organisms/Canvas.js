import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
// material-ui
import { makeStyles } from '@material-ui/core/styles'
// consts
import consts from './../../config/consts'

const Canvas = ({ color, cell }, canvasRef) => {
  const canvas = useRef(null)
  const [w, setW] = useState(0)
  const [h, setH] = useState(0)
  const [cellSize, setCellSize] = useState(0)
  const [drawing, setDrawing] = useState(false)

  const classes = makeStyles({
    canvasWrapper: {
      width: '100%',
      height: '100%',
    },
  })()
  // https://numb86-tech.hatenablog.com/entry/2019/12/06/122217
  useImperativeHandle(canvasRef, () => ({
    initializeCanvas: () => {
      clearCanvas()
      drawRule()
    },
    getDataUrl: () => {
      const base64 = canvas.current.toDataURL('image/jpeg')
      return base64
    },
  }))

  // 初回レンダリング時実行
  useEffect(() => {
    initCanvas()
  }, [])
  // 更新時処理
  useEffect(() => {
    initCanvas()
  }, [w, h, cellSize, cell])
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
  // キャンバスの縦 横取得
  const getCanvasSize = (cnvs) => {
    let w = 0
    let h = 0
    if (cnvs && cnvs.parentNode) {
      const parentNodeRect = cnvs.parentNode.getBoundingClientRect()
      const cellNum = cell
      const maxHeight = consts.CANVAS_MAX_SIZE
      const { width, height } = parentNodeRect

      if (cellNum !== 0) {
        const cellW = Math.floor(width / cellNum) // とりあえず 横幅基準でサイズ指定
        w = Math.min(cellW * cellNum, maxHeight)
        h = Math.min(cellW * cellNum, maxHeight)
      }
    }
    return [w, h]
  }
  // キャンバス再描画
  const initCanvas = () => {
    const cnvs = canvas.current
    const [w, h] = getCanvasSize(cnvs)
    setCellSize(w / cell)
    setW(w)
    setH(h)
    clearCanvas()
    drawRule()
  }
  // キャンバスクリア
  const clearCanvas = () => {
    const ctxt = canvas.current.getContext('2d')
    ctxt.clearRect(0, 0, w, h)
    ctxt.fillStyle = '#fff'
    ctxt.fillRect(0, 0, w, h)
  }
  // 罫線描画
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
    const cnvs = canvas.current
    const ctxt = cnvs.getContext('2d')
    const col = Math.floor(e.layerX / cellSize)
    const row = Math.floor(e.layerY / cellSize)
    ctxt.fillStyle = color
    ctxt.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
  }
  return (
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
  )
}

export default forwardRef(Canvas)
