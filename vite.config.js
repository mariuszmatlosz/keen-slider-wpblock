import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const pluginRoot = fileURLToPath( new URL( '.', import.meta.url ) );

export default defineConfig( {
	root: pluginRoot,
} );
