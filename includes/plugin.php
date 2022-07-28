<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Plugin {

	/** @var string */
	const BLOCK_NAMESPACE = 'scblocks';

	private static $instance;

	/**
	 * Memorized css
	 *
	 * @var string
	 */
	private static $css = '';

	/**
	 * Css mode
	 *
	 * @var string
	 */
	private static $css_mode = '';

	/**
	 * List of blocks in use.
	 *
	 * @since 1.2.0
	 *
	 * @var array
	 */
	private static $active_blocks = array();

	/**
	 * An array of used icons by posts or null.
	 *
	 * @since 1.3.0
	 * @var null|array
	 */
	private static $used_icons_by_posts;

	/**
	 * Gets defaults for option.
	 *
	 * @return array
	 */
	public static function option_defaults() : array {
		return Options::defaults();
	}

	/**
	 * Retrieves the specified option from the database.
	 *
	 * @param string $option The option to get.
	 *
	 * @return mixed The option value, or null if the option does not exists.
	 */
	public static function option( string $option ) {
		return Options::get( $option );
	}

	/**
	 * Retrieves options from the database.
	 *
	 * @return array
	 */
	public static function options() : array {
		return Options::all();
	}

	/**
	 * Updates options.
	 *
	 * @param array $settings New option state
	 *
	 * @return bool True if the value was updated, false otherwise.
	 */
	public static function update_options( array $settings ) : bool {
		return Options::update( $settings );
	}

	/**
	 * Memorize css
	 *
	 * @since 1.1.0
	 *
	 * @param string $css Our css
	 *
	 * @return void
	 */
	public static function memorize_css( string $css ) {
		self::$css = $css;
	}
	/**
	 * Get memorized css.
	 *
	 * @since 1.1.0
	 *
	 * @return string
	 */
	public static function css() : string {
		return self::$css;
	}
	/**
	 * Set css mode
	 *
	 * @since 1.1.0
	 *
	 * @param string $value
	 *
	 * @return void
	 */
	public static function set_css_mode( string $value ) {
		self::$css_mode = $value;
	}
	/**
	 * Get css mode
	 *
	 * @since 1.1.0
	 *
	 * @return string
	 */
	public static function css_mode() : string {
		return self::$css_mode;
	}

	/**
	 * Checks whether the block is in use.
	 *
	 * @since 1.2.0
	 *
	 * @param string $block_name Block name.
	 *
	 * @return boolean
	 */
	public static function is_active_block( string $block_name ) : bool {
		return in_array( $block_name, self::$active_blocks, true );
	}

	/**
	 * Memorizes that the block is in use.
	 *
	 * @since 1.2.0
	 *
	 * @param string $block_name Block name.
	 *
	 * @return void
	 */
	public static function set_is_active_block( string $block_name ) {
		if ( ! in_array( $block_name, self::$active_blocks, true ) ) {
			self::$active_blocks[] = $block_name;
		}
	}

	/**
	 * Gets and decodes the _scblocks_post_settings meta field.
	 *
	 * @param int $post_id Post ID.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public static function post_settings_post_meta( int $post_id ) : array {
		return Post_Settings::get( $post_id );
	}

	/**
	 * Updates the _scblocks_post_settings meta field.
	 *
	 * @param int $post_id Post ID.
	 * @param array $settings New settings.
	 *
	 * @since 1.3.0
	 *
	 * @return int|bool Meta ID if the key didn't exist, true on successful update,
	 *                  false on failure or if the value passed to the function
	 *                  is the same as the one that is already in the database.
	 */
	public static function update_post_settings_post_meta( int $post_id, array $settings ) {
		return Post_Settings::update( $post_id, $settings );
	}

	/**
	 * Return current Unix timestamp with microseconds as a string.
	 *
	 * @since 1.3.0
	 * @return string
	 */
	public static function get_microtime() : string {
		return number_format( microtime( true ), 9, '.', '' );
	}
	/**
	 * Check if the first number is larger than the second.
	 *
	 * @since 1.3.0
	 * @param string $num1 Number as a string.
	 * @param string $num2 Number as a string.
	 * @return bool
	 */
	public static function compare_microtimes( string $num1, string $num2 ) : bool {
		return bccomp( $num1, $num2, 9 ) === 1;
	}

	/**
	 * Get icons used by posts.
	 *
	 * @since 1.3.0
	 * @return array
	 */
	public static function used_icons() : array {
		if ( is_null( self::$used_icons_by_posts ) ) {
			$icons = new Icons();

			self::$used_icons_by_posts = $icons->extract_id_and_content( $icons->used_by_posts() );
		}
		return self::$used_icons_by_posts;
	}

	/**
	 * Get CSS print method.
	 *
	 * @since 1.3.0
	 *
	 * @return string
	 */
	public static function css_print_method() : string {
		$method = self::option( 'css_print_method' );
		if ( is_single() ) {
			$method = 'inline';
		}
		return apply_filters( 'scblocks_css_print_method', $method );
	}

	/**
	 * Updates the job completion time for the file writer.
	 *
	 * @since 1.1.0
	 *
	 * @return void
	 */
	public static function update_css_write_time() {
		update_option( 'scblocks_css_write_time', time() );
	}

	/**
	 * Loads required files.
	 */
	private function load_files() {
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/initial-css.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/block-selector.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/block-assets.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/fonts.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/block-css.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/icons.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/plugin-settings.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/css.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/shape-dividers.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/container-block.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/html-attributes.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/buttons-block.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/column-block.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/columns-block.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/heading-block.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/update-blocks-metadata.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/button-block.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/image-data.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/options.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/post-settings.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/blocks-attrs.php';
	}

	private function __construct() {
		/**
		 * The 'scblocks_css_write_time' option holds the time the file writer was last used.
		 */
		add_option( 'scblocks_css_write_time', time() );

		$this->load_files();
		$classes = array(
			'ScBlocks\Block_Assets',
			'ScBlocks\Fonts',
			'ScBlocks\Update_Blocks_Metadata',
			'ScBlocks\Icons',
			'ScBlocks\Plugin_Settings',
			'ScBlocks\Shape_Dividers',
			'ScBlocks\Container_Block',
			'ScBlocks\Buttons_Block',
			'ScBlocks\Column_Block',
			'ScBlocks\Columns_Block',
			'ScBlocks\Heading_Block',
			'ScBlocks\Button_Block',
			'ScBlocks\Image_Data',
			'ScBlocks\Options',
			'ScBlocks\Post_Settings',
		);

		foreach ( $classes as $class_name ) {
			if ( class_exists( $class_name ) ) {
				$inst = new $class_name();
				if ( method_exists( $inst, 'register_actions' ) ) {
					$inst->register_actions();
				}
			}
		}
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'scblocks' ), '1.0.0' );
	}
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'scblocks' ), '1.0.0' );
	}
}
Plugin::instance();
