<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our blocks.
 */
class Block_Assets {

	public function register_actions() {
		add_filter( 'block_categories', array( $this, 'register_category' ), 10, 2 );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_assets' ) );
	}

	/**
	 * Registers a category for blocks.
	 */
	public function register_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'scblocks',
					'title' => __( 'ScBlocks', 'scblocks' ),
				),
			)
		);
	}
	/**
	 * Editor assets.
	 */
	public function editor_assets() {
		$asset_file = include SCBLOCKS_PLUGIN_DIR . 'build/index.asset.php';
		wp_enqueue_script(
			'scblocks-editor',
			SCBLOCKS_PLUGIN_URL . 'build/index.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_enqueue_style(
			'scblocks-editor',
			SCBLOCKS_PLUGIN_URL . 'build/index.css',
			array(),
			$asset_file['version']
		);
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'scblocks-editor', 'scblocks' );
		}
	}
	/**
	 * Frontend assets.
	 */
	public function frontend_assets() {
		$css_file_uri = '';
		$inline_css   = '';
		$css_handler  = new Block_Css();

		$post_id = $css_handler->get_post_id();
		// ! singular || preview
		if ( ! $post_id || is_preview() ) {
			$has_block = true;
			$inline_css = $css_handler->get_inline_css();
		} else {
			$css_file_uri = $css_handler->css_file_uri();
			if ( ! $css_file_uri ) {
				$inline_css = $css_handler->get_inline_css();
			}
			$has_block = ! ! $css_file_uri || ! ! $inline_css;

		}

		if ( $has_block ) {
			wp_enqueue_style(
				'scblocks',
				SCBLOCKS_PLUGIN_URL . 'build/style-index.css',
				array(),
				SCBLOCKS_CSS_VERSION
			);
			if ( $css_file_uri ) {
				wp_enqueue_style( 'scblocks-blocks', esc_url( $css_file_uri ), array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			}
			if ( $inline_css ) {
				wp_add_inline_style( 'scblocks', $inline_css );
			}
		}
	}
}
