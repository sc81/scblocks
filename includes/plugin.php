<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Plugin {
	/** @var string */
	const OPTION_NAME = 'scblocks_settings';

	private static $instance;

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

	public function load_files() {
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/block-selectors.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/block-assets.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/fonts.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/block-css.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/icons.php';
	}

	private function __construct() {
		$this->load_files();
		$classes = array(
			'ScBlocks\Block_Assets',
			'ScBlocks\Fonts',
			'ScBlocks\Block_Css',
			'ScBlocks\Icons',
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
}
Plugin::instance();
