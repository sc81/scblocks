<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * A simple class for loading files and registering actions.
 *
 * @since 1.3.0
 */
class Loader {

	/**
	 * Plugin namespace.
	 *
	 * @since 1.3.0
	 * @var string
	 */
	const NAMESPACE = 'ScBlocks';

	/**
	 * Class data.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	const CLASSES = array(
		array(
			'name' => 'Block_Assets',
			'path' => 'block-assets',
		),
		array(
			'name' => 'Fonts',
			'path' => 'fonts',
		),
		array(
			'name' => 'Update_Blocks_Metadata',
			'path' => 'update-blocks-metadata',
		),
		array(
			'name' => 'Icons',
			'path' => 'icons',
		),
		array(
			'name' => 'Shape_Dividers',
			'path' => 'shape-dividers',
		),
		array(
			'name' => 'Container_Block',
			'path' => 'container-block',
		),
		array(
			'name' => 'Buttons_Block',
			'path' => 'buttons-block',
		),
		array(
			'name' => 'Button_Block',
			'path' => 'button-block',
		),
		array(
			'name' => 'Columns_Block',
			'path' => 'columns-block',
		),
		array(
			'name' => 'Column_Block',
			'path' => 'column-block',
		),
		array(
			'name' => 'Heading_Block',
			'path' => 'heading-block',
		),
		array(
			'name' => 'Html_Attributes',
			'path' => 'html-attributes',
		),
		array(
			'name' => 'Initial_Css',
			'path' => 'initial-css',
		),
		array(
			'name' => 'Block_Css',
			'path' => 'block-css',
		),
		array(
			'name'  => 'Plugin_Settings',
			'path'  => 'plugin-settings',
			'admin' => true,
		),
		array(
			'name' => 'Css',
			'path' => 'css',
		),
		array(
			'path' => 'block-selector',
		),
	);

	/**
	 * Load files, register actions if needed.
	 *
	 * @return void
	 */
	public static function load() {
		foreach ( self::CLASSES as $data ) {
			include_once SCBLOCKS_PLUGIN_DIR . 'includes/' . $data['path'] . '.php';
			if ( isset( $data['name'] ) && self::should_register( $data ) ) {
					$class_name = self::get_class_name( $data['name'] );
					$instance   = new $class_name();
					$instance->register_actions();
			}
		}
	}

	/**
	 * Check whether the class should register actions.
	 *
	 * @since 1.3.0
	 * @param array $data Class data.
	 *
	 * @return bool
	 */
	public static function should_register( array $data ) : bool {
		if ( ! is_admin() && isset( $data['admin'] ) ) {
			return false;
		}
		$class_name = self::get_class_name( $data['name'] );

		return class_exists( $class_name ) &&
		method_exists( $class_name, 'register_actions' );
	}

	/**
	 * Return class name prefixed with namespace.
	 *
	 * @since 1.3.0
	 * @param string $name Class name
	 *
	 * @return string
	 */
	public static function get_class_name( string $name ) : string {
		return self::NAMESPACE . '\\' . $name;
	}
}
