<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Plugin {
	private static $instance;

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'scblocks' ), '1.0.0' );
	}
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'scblocks' ), '1.0.0' );
	}

	public function load_files() {
		include_once SCBLOCKS_PLUGIN_DIR . '/includes/blocks.php';
		include_once SCBLOCKS_PLUGIN_DIR . '/includes/fonts.php';
		include_once SCBLOCKS_PLUGIN_DIR . '/includes/css-manager.php';
		include_once SCBLOCKS_PLUGIN_DIR . '/includes/icons.php';
		include_once SCBLOCKS_PLUGIN_DIR . '/includes/font-awesome.php';
	}

	private function __construct() {
		$this->load_files();
		$classes = array(
			'ScBlocks\Blocks',
			'ScBlocks\Fonts',
			'ScBlocks\Css_Manager',
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
