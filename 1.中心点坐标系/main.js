// 初始化时执行
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

function drawRect(x, y, w, h) {
	const ctx = canvas.getContext('2d')
	ctx.beginPath()
	ctx.moveTo(x - w / 2, y - h / 2)
	ctx.strokeStyle = 'rgba(255,0,0,0.5)'
	ctx.strokeRect(x - w / 2, y - h / 2, w, h)

	// // 你可以在这里绘制一些图形来测试
	// ctx.strokeStyle = 'rgba(255,0,0,0.5)'
	// ctx.strokeRect(0, 0, w, h)
	ctx.closePath()
}

let isDrawing = false
let startX, startY

canvas.addEventListener('mousedown', (e) => {
	const { offsetX: x, offsetY: y } = e

	isDrawing = true
	console.log('x, y :>> ', x, y)
	startX = x
	startY = y
})

canvas.addEventListener('mousemove', (e) => {
	if (!isDrawing) {
		return false
	}
	const { offsetX: x, offsetY: y } = e
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	console.log('x, y :>> ', x, y)
	ctx.beginPath()
	ctx.moveTo(startX, startY)
	ctx.lineTo(x, y)
	ctx.stroke()
})

canvas.addEventListener('mouseup', (e) => {
	const { offsetX: x, offsetY: y } = e

	console.log('x, y :>> ', x, y)
	isDrawing = false
})

canvas.addEventListener('mouseout', (e) => {
	isDrawing = false
})

// canvas.addEventListener('click', (e) => {
// 	// console.log('e :>> ', e)
// 	const { offsetX, offsetY } = e
// 	drawRect(offsetX, offsetY, 50, 50)
// })

function setupCanvas(canvas) {
	// 设置 canvas 的 CSS 宽高
	canvas.style.width = Math.ceil(document.body.clientWidth / 2) + 'px'
	canvas.style.height = Math.ceil(document.body.clientHeight / 2) + 'px'
	canvas.style.minWidth = '400px'
	const ctx = canvas.getContext('2d')

	// 获取 canvas 的 CSS 宽高
	const width = canvas.clientWidth
	const height = canvas.clientHeight

	// 获取设备的像素比
	const devicePixelRatio = window.devicePixelRatio || 1

	// 设置 canvas 的实际像素宽高
	canvas.width = width * devicePixelRatio
	canvas.height = height * devicePixelRatio

	// 缩放 canvas 上下文
	ctx.scale(devicePixelRatio, devicePixelRatio)

	// 你可以在这里绘制一些图形来测试
	ctx.strokeStyle = 'rgba(255,0,0,0.5)'
	ctx.strokeRect(0, 0, width, height)
}

// 设置高分辨率绘制
setupCanvas(canvas)

// 当窗口大小改变时，重新调整和绘制
window.addEventListener('resize', () =>
	requestAnimationFrame(() => setupCanvas(canvas))
)
