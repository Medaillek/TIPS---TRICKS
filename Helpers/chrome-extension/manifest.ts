import { defineDynamicResource, defineManifest } from '@crxjs/vite-plugin'
import { loadEnv } from 'vite'

export default defineManifest((env) => {
	process.env = { ...process.env, ...loadEnv(env.mode, process.cwd()) }
	return {
		name: '',
		description: '',
		version: '1.0.0',
		manifest_version: 3,
		minimum_chrome_version: '105',
		icons: {
			16: 'img/16.png',
			32: 'img/32.png',
			48: 'img/48.png',
			128: 'img/128.png',
		},
		background: {
			service_worker: 'src/service_worker/index.ts',
			type: 'module',
		},
		action: {
			default_title: '',
		},

		content_scripts: [
			{
				js: ['./content-script.ts'],
				run_at: 'document_end',
				matches: [`${process.env.VITE_WEBSITE_URL}/*`],
			},
		],

		permissions: [
			'storage',
			'scripting',
			'tabs',
			'webRequest',
			'unlimitedStorage',
		],
		web_accessible_resources: [
			defineDynamicResource({ matches: [process.env.VITE_WEBSITE_URL + '/*'] }),
		],

		host_permissions: [`${process.env.VITE_WEBSITE_URL}/*`],
	}
})
