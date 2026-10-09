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

namespace KeenSliderWPBlock;

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/inc/namespace.php';

bootstrap();
