/**
 *
 * @param {HTMLCanvasElement} canvas canvas 元素
 * @param {Number} width 画布宽度
 * @param {Number} height 画布高度
 */
function setCanvasRatio(canvas, width, height) {
	const ratio = devicePixelRatio || 1

	canvas.style.width = `${width}px`
	canvas.style.height = `${height}px`

	canvas.width = width * ratio
	canvas.height = height * ratio
}

// export { setCanvasRatio }
