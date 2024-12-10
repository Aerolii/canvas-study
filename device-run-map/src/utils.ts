export const BMapGL = window.BMapGL

export type BMapGLType = typeof BMapGL // 可以根据实际 BMapGL 类型进行完善

export type PointType = {
	lng: number
	lat: number
	degress?: number
}

export type TPoint = { lng: number; lat: number }

export type TLngLat = [longitude: number, latitude: number]

export interface IGeo {
	type: string
	coordinates: TLngLat[]
}

/**
 * 将角度转换为旋转角度
 * @param radian 角度
 * @returns 旋转角度
 */
export function translateAngle(radian: number) {
	// 将弧度转换为角度
	let degrees = radian * (180 / Math.PI)
	// 以正东为0度,逆时针旋转90度使12点方向为0度
	degrees = (90 - degrees) % 360
	// 处理负角度
	if (degrees < 0) {
		degrees += 360
	}

	if (Math.abs(degrees) > 360) {
		degrees = degrees >= 0 ? degrees - 360 : degrees + 360
	}
	return degrees
}

// 经纬度坐标元组类型
export type LngLat = [number, number]

// 定义常量
const x_PI = (Math.PI * 3000.0) / 180.0
const PI = Math.PI
const a = 6378245.0 // 长半轴
const ee = 0.0066934216229659 // 扁率

// WGS-84 转 GCJ-02
function wgs84ToGcj02(lat: number, lon: number): LngLat {
	if (outOfChina(lat, lon)) {
		return [lat, lon]
	}
	let dLat = transformLat(lon - 105.0, lat - 35.0)
	let dLon = transformLon(lon - 105.0, lat - 35.0)
	const radLat = (lat / 180.0) * PI
	let magic = Math.sin(radLat)
	magic = 1 - ee * magic * magic
	const sqrtMagic = Math.sqrt(magic)
	dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI)
	dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * PI)
	const mgLat = lat + dLat
	const mgLon = lon + dLon
	return [mgLon, mgLat]
}

function transformLat(x: number, y: number) {
	let ret =
		-100.0 +
		2.0 * x +
		3.0 * y +
		0.2 * y * y +
		0.1 * x * y +
		0.2 * Math.sqrt(Math.abs(x))
	ret +=
		((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
		3.0
	ret +=
		((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0
	ret +=
		((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) *
			2.0) /
		3.0
	return ret
}

function transformLon(x: number, y: number) {
	let ret =
		300.0 +
		x +
		2.0 * y +
		0.1 * x * x +
		0.1 * x * y +
		0.1 * Math.sqrt(Math.abs(x))
	ret +=
		((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
		3.0
	ret +=
		((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0
	ret +=
		((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) *
			2.0) /
		3.0
	return ret
}

function outOfChina(lat: number, lon: number) {
	return !(lon > 73.66 && lon < 135.05 && lat > 3.86 && lat < 53.55)
}

// GCJ-02 转 BD-09
function gcj02ToBd09(lat: number, lon: number): LngLat {
	const z = Math.sqrt(lat * lat + lon * lon) + 0.00002 * Math.sin(lat * x_PI)
	const theta = Math.atan2(lat, lon) + 0.000003 * Math.cos(lon * x_PI)
	const bd_lat = z * Math.sin(theta) + 0.006
	const bd_lon = z * Math.cos(theta) + 0.0065
	return [bd_lon, bd_lat]
}

// WGS-84 转 BD-09
export function wgs84ToBd09(lon: number, lat: number) {
	const [gcjLon, gcjLat] = wgs84ToGcj02(lat, lon)
	return gcj02ToBd09(gcjLat, gcjLon)
}
