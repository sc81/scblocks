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
			$this->dist_dir_name = 'build/';
		} else {
			$this->dist_dir_name = 'dist/';
		}
	}

	public function register_actions() {
		add_filter( 'block_categories', array( $this, 'register_category' ), 10, 1 );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
		add_action( 'init', array( $this, 'frontend_assets' ) );
		add_filter( 'excerpt_allowed_blocks', array( $this, 'set_excerpt_allowed_blocks' ) );
	}

	/**
	 * Registers a category for blocks.
	 *
	 * @param array $categories Default array of block categories.
	 *
	 * @return array Filtered block categories
	 */
	public function register_category( array $categories ) : array {
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
	 * Registers blocks that can be displayed in post excerpts.
	 *
	 * @param array $allowed_blocks Existing allowed blocks.
	 *
	 * @return array
	*/
	public function set_excerpt_allowed_blocks( array $allowed_blocks ) : array {
		$allowed_blocks[] = 'scblocks/heading';
		$allowed_blocks[] = 'scblocks/container';

		return $allowed_blocks;
	}
	/**
	 * Enqueue editor assets.
	 *
	 * @return void
	 */
	public function editor_assets() {
		$style_controls_asset = include SCBLOCKS_PLUGIN_DIR . $this->dist_dir_name . 'styleControls.asset.php';
		wp_enqueue_script(
			'scblocks-style-controls',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . 'styleControls.js',
			$style_controls_asset['dependencies'],
			$style_controls_asset['version'],
			true
		);
		$components_asset = include SCBLOCKS_PLUGIN_DIR . $this->dist_dir_name . 'components.asset.php';
		wp_enqueue_script(
			'scblocks-components',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . 'components.js',
			$components_asset['dependencies'],
			$components_asset['version'],
			true
		);
		$block_asset = include SCBLOCKS_PLUGIN_DIR . $this->dist_dir_name . 'block.asset.php';
		wp_enqueue_script(
			'scblocks-block',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . 'block.js',
			$block_asset['dependencies'],
			$block_asset['version'],
			true
		);
		$const_asset = include SCBLOCKS_PLUGIN_DIR . $this->dist_dir_name . 'constants.asset.php';
		wp_enqueue_script(
			'scblocks-constants',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . 'constants.js',
			$const_asset['dependencies'],
			$const_asset['version'],
			true
		);
		$utils_asset = include SCBLOCKS_PLUGIN_DIR . $this->dist_dir_name . 'cssUtils.asset.php';
		wp_enqueue_script(
			'scblocks-css-utils',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . 'cssUtils.js',
			$utils_asset['dependencies'],
			$utils_asset['version'],
			true
		);
		$main_file    = include SCBLOCKS_PLUGIN_DIR . $this->dist_dir_name . 'index.asset.php';
		$dependencies = $main_file['dependencies'];
		wp_enqueue_script(
			'scblocks',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . 'index.js',
			apply_filters( 'scblocks_editor_blocks_dependencies', $dependencies ),
			$main_file['version'],
			true
		);

		wp_enqueue_style(
			'scblocks',
			SCBLOCKS_PLUGIN_URL . $this->dist_dir_name . 'index.css',
			array(),
			$main_file['version']
		);

		wp_add_inline_style( 'scblocks', Initial_Css::get() );

		wp_set_script_translations( 'scblocks-editor', 'scblocks' );
	}
	/**
	 * Enqueue frontend assets.
	 *
	 * @return void
	 */
	public function frontend_assets() {
		$dynamic_css_priority = apply_filters( 'scblocks_dynamic_css_priority', 10 );

		add_action( 'wp_enqueue_scripts', array( $this, 'css_from_file' ), $dynamic_css_priority );
		add_action( 'wp_head', array( $this, 'print_inline_css' ), $dynamic_css_priority );
		add_action( 'wp_enqueue_scripts', array( $this, 'google_fonts' ) );
	}

	/**
	 * Enqueue css file
	 *
	 * @since 1.1.0
	 *
	 * @return void
	 */
	public function css_from_file() {
		$block_css    = new Block_Css();
		$css_file_uri = $block_css->file_uri();
		if ( $css_file_uri ) {
			wp_enqueue_style( 'scblocks', esc_url( $css_file_uri ), array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		}
	}

	/**
	 * Print inline css
	 *
	 * @since 1.1.0
	 *
	 * @return void
	 */
	public function print_inline_css() {
		$block_css  = new Block_Css();
		$inline_css = $block_css->inline();
		if ( $inline_css ) {
			printf(
				'<style id="scblocks-css">%s</style>',
				wp_strip_all_tags( $inline_css ) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			);
		}
	}

	/**
	 * Enqueue google fonts uri
	 *
	 * @since 1.1.0
	 *
	 * @return void
	 */
	public function google_fonts() {
		$block_css = new Block_Css();
		$uri       = $block_css->google_fonts_uri();
		if ( $uri ) {
			wp_enqueue_style( 'scblocks-google-fonts', $uri, array(), null );// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		}
	}
}
