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
	 * Get media query.
	 *
	 * @since 1.1.0
	 * @param string $type Device type.
	 *
	 * @return string
	 */
	public static function media_query( string $type ): string {
		$data = apply_filters(
			'scblocks_media_query',
			array(
				'large_desktop' => '(min-width: 1400px)',
				'desktop'       => '(min-width: 1025px)',
				'tablet'        => '(max-width: 1024px)',
				'tablet_only'   => '(min-width: 768px) and (max-width: 1024px)',
				'mobile'        => '(max-width: 767px)',
				'small_mobile'  => '(max-width: 576px)',
			)
		);
		return $data[ $type ];
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
	}

	private function __construct() {
		$this->load_files();
		$classes = array(
			'ScBlocks\Block_Assets',
			'ScBlocks\Fonts',
			'ScBlocks\Block_Css',
			'ScBlocks\Icons',
			'ScBlocks\Plugin_Settings',
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
