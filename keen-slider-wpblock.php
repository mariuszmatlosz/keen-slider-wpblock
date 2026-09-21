<?php
/**
 * Plugin Name:       Keen Slider Block
 * Plugin URI:        https://github.com/quantenwerft/keen-slider-wpblock
 * Description:       Gutenberg block that initializes Keen Slider on the frontend.
 * Version:           1.0.0
 * Requires at least: 6.3
 * Requires PHP:      8.0
 * Author:            Marius
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       keen-slider-wpblock
 *
 * @package KeenSliderWPBlock
 */

defined( 'ABSPATH' ) || exit;

define( 'KEEN_SLIDER_WPBLOCK_VERSION', '1.0.0' );
define( 'KEEN_SLIDER_WPBLOCK_FILE', __FILE__ );
define( 'KEEN_SLIDER_WPBLOCK_PATH', plugin_dir_path( __FILE__ ) );
define( 'KEEN_SLIDER_WPBLOCK_URL', plugin_dir_url( __FILE__ ) );

require_once KEEN_SLIDER_WPBLOCK_PATH . 'includes/class-blocks.php';

add_action(
	'init',
	static function (): void {
		KeenSliderWPBlock\Blocks::register();
	}
);
