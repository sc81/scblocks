<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Blocks {

	private $plugin_settings_name = 'scblocks_settings';

	public function register_actions() {
		add_filter( 'block_categories', array( $this, 'register_category' ), 10, 2 );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_assets' ) );
	}

	public function register_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'scblocks',
					'title' => __( 'ScBlocks', 'scblocks' ),
					'icon'  => 'welcome-widgets-menus',
				),
			)
		);
	}
	public function editor_assets() {
		wp_enqueue_script(
			'scblocks-editor',
			untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) ) . '/build/index.js',
			array( 'wp-element', 'wp-components', 'wp-editor', 'wp-data', 'wp-edit-post', 'wp-plugins', 'wp-i18n', 'wp-blocks', 'wp-api-fetch' ),
			time(),
			true
		);

		wp_enqueue_style(
			'scblocks-editor',
			untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) ) . '/build/index.css',
			array(),
			SCBLOCKS_VERSION
		);
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'scblocks-editor', 'scblocks' );
		}
	}
	public function frontend_assets() {
		wp_enqueue_style(
			'scblocks-style',
			untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) ) . '/build/style-index.css',
			array(),
			SCBLOCKS_VERSION
		);
	}
}
