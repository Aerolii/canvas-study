import { defineConfig, loadEnv } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {
	// 加载环境变量
	const env = loadEnv(mode, process.cwd())
	const API_BASE_URL = env.VITE_API_BASE_URL

	return {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		base: '/',
		server: {
			proxy: {
				'/gw': {
					target: 'https://it.kusaauto.com:11443',
					changeOrigin: true,
					secure: false, // 忽略证书错误
				},
			},
		},
	}
})
