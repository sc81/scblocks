<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Plugin {
	/** @var string */
	const OPTION_NAME = 'scblocks';

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
	 * Gets defaults for option.
	 *
	 * @return array
	 */
	public static function option_defaults() : array {
		return apply_filters(
			'scblocks_option_defaults',
			array(
				'css_print_method'           => 'file',
				'force_regenerate_css_files' => '0',
				'wp_block_in_wp_block'       => array(),
				'wp_block_update_time'       => array(),
			)
		);
	}

	/**
	 * Retrieves the specified option from the database.
	 *
	 * @param string $option The option to get.
	 *
	 * @return mixed The option value, or null if the option does not exists.
	 */
	public static function option( string $option ) {
		$defaults = self::option_defaults();
		if ( ! isset( $defaults[ $option ] ) ) {
			return;
		}

		$options = wp_parse_args(
			get_option( self::OPTION_NAME, array() ),
			$defaults
		);

		return $options[ $option ];
	}

	/**
	 * Retrieves options from the database.
	 *
	 * @return array
	 */
	public static function options() : array {
		return get_option( self::OPTION_NAME, array() );
	}

	/**
	 * Updates options.
	 *
	 * @param array $settings New option state
	 *
	 * @return bool True if the value was updated, false otherwise.
	 */
	public static function update_options( array $settings ) : bool {
		return update_option( self::OPTION_NAME, $settings );
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
			'ScBlocks\Block_Css',
			'ScBlocks\Icons',
			'ScBlocks\Plugin_Settings',
			'ScBlocks\Shape_Dividers',
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
