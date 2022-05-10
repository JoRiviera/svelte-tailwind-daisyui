import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ out: 'build' }),
		files: {
			lib: 'src/lib'
		},
		vite: {
			server: {
				port: 8000
			}
		}
	}
};

export default config;
