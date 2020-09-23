<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our blocks.
 */
class Block_Assets {

	private $dist_dir_name;

	public function __construct() {
		if ( @file_exists( SCBLOCKS_PLUGIN_DIR . 'build' ) ) {
			$this->dist_dir_name = 'build';
		} else {
			$this->dist_dir_name = 'dist';
		}
	}

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
		$asset_file = include SCBLOCKS_PLUGIN_DIR . $this->dist_dir_name . '/index.asset.php';
		wp_enqueue_script(
			'scblocks-editor',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . '/index.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_enqueue_style(
			'scblocks-editor',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . '/index.css',
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
		$css          = new Block_Css();

		$post_id = $css->get_post_id();
		// ! singular || preview
		if ( ! $post_id || is_preview() ) {
			$has_block  = true;
			$inline_css = $css->get_inline();
		} else {
			$css_file_uri = $css->file_uri();
			if ( ! $css_file_uri ) {
				$inline_css = $css->get_inline();
			}
			$has_block = ! ! $css_file_uri || ! ! $inline_css;

		}

		if ( $has_block ) {
			wp_enqueue_style(
				'scblocks',
				SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . '/style-index.css',
				array(),
				SCBLOCKS_CSS_VERSION
			);
			if ( $css_file_uri ) {
				wp_enqueue_style( 'scblocks-blocks', esc_url( $css_file_uri ), array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			}
			if ( $inline_css ) {
				wp_add_inline_style( 'scblocks', $inline_css );
			}
			if ( ! ! $css->get_google_fonts_uri() ) {
				wp_enqueue_style( 'scblocks-google-fonts', $css->get_google_fonts_uri(), array(), null );// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			}
		}
	}
}
