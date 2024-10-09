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

const position = {
	min_x: -17.1547012,
	max_x: 153.325134,
	min_y: -217.522934,
	max_y: 19.217865,
	scale: 10,
}

export function translatePoint(x, y) {
	x = (x - position.min_x) * position.scale
	y = (position.max_y - y) * position.scale
	return { x, y }
}
