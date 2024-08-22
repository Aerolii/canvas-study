/**
 * 使用 canvas 绘制多边形
 */
// import { setCanvasRatio } from './../utils'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

setCanvasRatio(canvas, 400, 400)

/**
 *
 * @param {CanvasRenderingContext2D} ctx 画笔
 * @param {Number} x 箭头起始 x 点
 * @param {Number} y 箭头起始 y 点
 * @param {Number} w 箭头宽度
 * @param {Number} h 箭头高度
 */
function drawArrow(ctx, x, y, w, h) {
	// ctx.lineWidth = devicePixelRatio || 1
	ctx.scale(devicePixelRatio, devicePixelRatio)
	ctx.beginPath()
	ctx.moveTo(200, 100)
	ctx.lineTo(300, 100)
	ctx.lineTo(300, 90)
	ctx.lineTo(320, 105)
	ctx.lineTo(300, 120)
	ctx.lineTo(300, 110)
	ctx.lineTo(200, 110)
	ctx.lineTo(200, 100)
	ctx.strokeStyle = 'red'
	// ctx.fill()
	ctx.stroke()
	// ctx.closePath()
}

canvas.addEventListener('click', (e) => {})

drawArrow(ctx, 100, 100)
