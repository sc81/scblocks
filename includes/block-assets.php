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
		$post_id = Block_Css::get_post_id();
		// if 0 we are on a blog page, otherwise we are on a single post/page
		$has_block = 0 === $post_id ? true : $this->has_post_settings( $post_id );

		if ( $has_block ) {
			wp_enqueue_style(
				'scblocks',
				SCBLOCKS_PLUGIN_URL . 'build/style-index.css',
				array(),
				SCBLOCKS_CSS_VERSION
			);
		}
	}

	/**
	 * Checks if the post has _scblocks_post_settings post meta field.
	 *
	 * @param int $post_id Post ID
	 *
	 * @return bool
	 */
	public function has_post_settings( int $post_id ) : bool {
		$post_settings = Block_Css::get_post_meta_post_settings( $post_id );

		if ( empty( $post_settings ) ) {
			return false;
		}
		if ( ! empty( $post_settings['update_time'] ) ) {
			return true;
		}
		if ( ! empty( $post_settings['reusable_blocks'] ) ) {
			foreach ( $post_settings['reusable_blocks'] as $block_id ) {
				if ( $this->has_post_settings( $block_id ) ) {
					return true;
				}
			}
		}
		return false;
	}
}
