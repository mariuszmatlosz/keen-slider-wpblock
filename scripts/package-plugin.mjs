import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pluginRoot = resolve( dirname( fileURLToPath( import.meta.url ) ), '..' );
const slug = 'keen-slider-wpblock';
const releaseRoot = resolve( pluginRoot, 'release' );
const pluginDir = resolve( releaseRoot, slug );
const zipName = `${ slug }.zip`;

const itemsToPackage = [
	'plugin.php',
	'inc',
	'build',
	'LICENSE',
];

const requiredEntries = [
	`${ slug }/plugin.php`,
	`${ slug }/inc/namespace.php`,
	`${ slug }/build/blocks/slider/block.json`,
	`${ slug }/build/blocks/slider/view.js`,
	`${ slug }/build/blocks/slide/block.json`,
	`${ slug }/LICENSE`,
];

rmSync( releaseRoot, {
	recursive: true,
	force: true,
} );
mkdirSync( pluginDir, { recursive: true } );

for ( const item of itemsToPackage ) {
	const sourcePath = resolve( pluginRoot, item );

	if ( ! existsSync( sourcePath ) ) {
		throw new Error( `Missing package source: ${ sourcePath }` );
	}

	cpSync( sourcePath, resolve( pluginDir, item ), { recursive: true } );
}

execFileSync( 'zip', [
	'-r',
	'-X',
	zipName,
	slug,
	'-x',
	'*.DS_Store',
], {
	cwd: releaseRoot,
	stdio: 'inherit',
} );

const listing = execFileSync( 'unzip', [ '-Z1', resolve( releaseRoot, zipName ) ], {
	encoding: 'utf8',
} );
const entries = new Set( listing.split( '\n' ) );

for ( const entry of requiredEntries ) {
	if ( ! entries.has( entry ) ) {
		throw new Error( `Release archive is missing ${ entry }` );
	}
}

rmSync( pluginDir, {
	recursive: true,
	force: true,
} );

console.log( `Plugin archive: ${ resolve( releaseRoot, zipName ) }` );
