<?php

/**
 * Plugin Name: ScBlocks
 * Description: A collection of Gutenberg Blocks that help you build WordPress sites.
 * Author: sc81
 * Version: 1.2.0
 * Text Domain: scblocks
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SCBLOCKS_VERSION', '1.2.0' );

define( 'SCBLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

define( 'SCBLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

add_action( 'plugins_loaded', 'scblocks_load_plugin_textdomain' );

/**
 * Load ScBlocks textdomain.
 *
 * @return void
 */
function scblocks_load_plugin_textdomain() {
	load_plugin_textdomain( 'scblocks' );
}

if ( ! version_compare( PHP_VERSION, '7.0', '>=' ) ) {
	add_action( 'admin_notices', 'scblocks_fail_php_version' );
} elseif ( ! version_compare( get_bloginfo( 'version' ), '5.5', '>=' ) ) {
	add_action( 'admin_notices', 'scblocks_fail_wp_version' );
} else {
	require SCBLOCKS_PLUGIN_DIR . 'includes/plugin.php';
}
/**
 * ScBlocks admin notice for minimum PHP version.
 *
 * Warning when the site doesn't have the minimum required PHP version.
 *
 * @return void
 */
function scblocks_fail_php_version() {
	/* translators: %s: PHP version */
	$message      = sprintf( esc_html__( 'ScBlocks requires PHP version %s+, plugin is currently NOT RUNNING.', 'scblocks' ), '7.0' );
	$html_message = sprintf( '<div class="error">%s</div>', wpautop( $message ) );
	echo wp_kses_post( $html_message );
}
/**
 * ScBlocks admin notice for minimum WordPress version.
 *
 * Warning when the site doesn't have the minimum required WordPress version.
 *
 * @return void
 */
function scblocks_fail_wp_version() {
	/* translators: %s: WordPress version */
	$message      = sprintf( esc_html__( 'ScBlocks requires WordPress version %s+. Because you are using an earlier version, the plugin is currently NOT RUNNING.', 'scblocks' ), '5.5' );
	$html_message = sprintf( '<div class="error">%s</div>', wpautop( $message ) );
	echo wp_kses_post( $html_message );
}
