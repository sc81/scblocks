<?php

/**
 * Plugin Name: ScBlocks
 * Description: ScBlocks is a set of blocks that facilitate the creation of a page in the new editor.
 * Author: sc81
 * Version: 0.1
 * Text Domain: scblocks
 * Domain Path: /languages
 * Tested up to: 5.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SCBLOCKS_VERSION', '0.1' );

define( 'SCBLOCKS_CSS_VERSION', '0.1' );

define( 'SCBLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

define( 'SCBLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

add_action( 'plugins_loaded', 'scblocks_pro_load_textdomain' );

/**
 * Load ScBlocks translated strings.
 */
function scblocks_pro_load_textdomain() {
	load_plugin_textdomain( 'scblocks', false, dirname( plugin_basename( SCBLOCKS_PLUGIN_DIR ) ) . '/languages/' );
}

if ( ! version_compare( PHP_VERSION, '5.6', '>=' ) ) {
	add_action( 'admin_notices', 'scblocks_fail_php_version' );
} elseif ( ! version_compare( get_bloginfo( 'version' ), '5.4', '>=' ) ) {
	add_action( 'admin_notices', 'scblocks_fail_wp_version' );
} else {
	require SCBLOCKS_PLUGIN_DIR . 'includes/plugin.php';
}
/**
 * ScBlocks admin notice for minimum PHP version.
 *
 * Warning when the site doesn't have the minimum required PHP version.
 *
 * @since 1.0.0
 *
 * @return void
 */
function scblocks_fail_php_version() {
	/* translators: %s: PHP version */
	$message      = sprintf( esc_html__( 'ScBlocks requires PHP version %s+, plugin is currently NOT RUNNING.', 'scblocks' ), '5.6' );
	$html_message = sprintf( '<div class="error">%s</div>', wpautop( $message ) );
	echo wp_kses_post( $html_message );
}
/**
 * ScBlocks admin notice for minimum WordPress version.
 *
 * Warning when the site doesn't have the minimum required WordPress version.
 *
 * @since 1.0.0
 */
function scblocks_pro_fail_wp_version() {
	/* translators: %s: WordPress version */
	$message      = sprintf( esc_html__( 'ScBlocks requires WordPress version %s+. Because you are using an earlier version, the plugin is currently NOT RUNNING.', 'scblocks' ), '5.4' );
	$html_message = sprintf( '<div class="error">%s</div>', wpautop( $message ) );
	echo wp_kses_post( $html_message );
}
