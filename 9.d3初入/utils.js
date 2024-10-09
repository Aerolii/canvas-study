/**
 *
 * @param {number} x 点 x 坐标
 * @param {number} y 点 y 坐标
 * @param {number} min_x 图片最小 x 坐标
 * @param {number} max_y 图片最大 y 坐标
 * @param {number} scale 图片缩放比例
 * @returns { { x: number, y: number } } 返回转换后点在图片坐标系的位置 { x: number, y: numer}
 */
export function translatePoint(x, y, min_x, max_y, scale) {
	x = (x - min_x) * scale
	y = (max_y - y) * scale
	return { x, y }
}
