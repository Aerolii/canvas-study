function createPolygon(ctx, n, dx, dy, size) {
	ctx.beginPath()
	let degree = (2 * Math.PI) / n

	for (let i = 0; i < n; i++) {
		// const element = array[i]
		const x = dx + size * Math.cos(i * degree)
		const y = Math.sin(i * degree) * size + dy

		ctx.lineTo(x, y)
	}

	ctx.closePath()
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.style.width = '400px'
canvas.style.height = '400px'
canvas.width = 400 * (devicePixelRatio || 1)
canvas.height = 400 * (devicePixelRatio || 1)

window.onload = () => {
	ctx.scale(devicePixelRatio, devicePixelRatio)
	ctx.strokeStyle = 'red'
	createPolygon(ctx, 3, 100, 100, 10)
	ctx.stroke()
	createPolygon(ctx, 4, 100, 100, 10)
	ctx.fillStyle = 'rgba(0,255,0,0.4)'
	ctx.fill()

	createPolygon(ctx, 5, 120, 130, 100)
	ctx.fillStyle = 'rgba(0,255,0,0.1)'
	ctx.fill()

	createPolygon(ctx, 8, 170, 230, 100)
	ctx.fillStyle = 'rgba(0,255,255,0.5)'
	ctx.fill()
}
