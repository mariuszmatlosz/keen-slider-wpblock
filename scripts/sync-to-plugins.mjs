import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pluginRoot = resolve( dirname( fileURLToPath( import.meta.url ) ), '..' );
const targetDir = resolve( pluginRoot, '../wp-content/plugins/keen-slider-wpblock' );

const itemsToSync = [
	'plugin.php',
	'inc',
	'build',
	'LICENSE',
];

rmSync( targetDir, {
	recursive: true,
	force: true,
} );
mkdirSync( targetDir, { recursive: true } );

for ( const item of itemsToSync ) {
	const sourcePath = resolve( pluginRoot, item );

	if ( ! existsSync( sourcePath ) ) {
		throw new Error( `Missing sync source: ${ sourcePath }` );
	}

	cpSync( sourcePath, resolve( targetDir, item ), { recursive: true } );
}

console.log( `Synced plugin to ${ targetDir }` );
