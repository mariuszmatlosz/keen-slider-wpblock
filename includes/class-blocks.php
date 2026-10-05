<?php
/**
 * Block registration.
 *
 * @package KeenSliderWPBlock
 */

namespace KeenSliderWPBlock;

defined( 'ABSPATH' ) || exit;

/**
 * Registers the slider and slide blocks from compiled block metadata.
 *
 * Hooks are attached from the plugin bootstrap, not from a constructor,
 * so registration stays easy to unhook and to call directly.
 */
class Blocks {

	/**
	 * Register each block that has a compiled block.json.
	 *
	 * A missing build file is skipped so a fresh checkout does not fatal
	 * before the frontend assets have been generated.
	 *
	 * @return void
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
