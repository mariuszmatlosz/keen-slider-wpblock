<?php
/**
 * Register the slider and slide blocks.
 *
 * @package KeenSliderWPBlock
 */

namespace KeenSliderWPBlock;

const VERSION = '1.0.0';

/**
 * Hook block registration into WordPress.
 *
 * Keep the hook here so this file can load without registering anything.
 */
function bootstrap() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_blocks' );
}

/**
 * Register each block that has a compiled block.json.
 *
 * Skip a missing build file so a fresh checkout does not fatal before the assets exist.
 */
function register_blocks() : void {
	foreach ( [ 'slider', 'slide' ] as $block ) {
		$block_path = plugin_dir() . "/build/blocks/{$block}";

		if ( ! is_readable( $block_path . '/block.json' ) ) {
			continue;
		}

		register_block_type( $block_path );
	}
}

/**
 * Return the absolute path to the plugin root.
 */
function plugin_dir() : string {
	return dirname( __DIR__ );
}
