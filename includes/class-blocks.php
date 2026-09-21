<?php
/**
 * Block registration.
 *
 * @package KeenSliderWPBlock
 */

namespace KeenSliderWPBlock;

defined( 'ABSPATH' ) || exit;

/**
 * Registers plugin blocks from the build directory.
 */
class Blocks {

	/**
	 * Register blocks.
	 */
	public static function register(): void {
		$blocks = array( 'slider', 'slide' );

		foreach ( $blocks as $block ) {
			$block_path = KEEN_SLIDER_WPBLOCK_PATH . "build/blocks/{$block}";

			if ( ! file_exists( $block_path . '/block.json' ) ) {
				continue;
			}

			register_block_type( $block_path );
		}
	}
}
