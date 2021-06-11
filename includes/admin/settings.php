<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Settings {

	public function register_actions() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'rest_api_init', array( $this, 'register_route' ) );
	}
	/**
	 * Add the menu item.
	 */
	public function add_menu() {
		$settings = add_submenu_page(
			'scblocks',
			__( 'Settings', 'scblocks' ),
			__( 'Settings', 'scblocks' ),
			'manage_options',
			'scblocks-settings',
			array( $this, 'page' ),
			1
		);
		add_action( "admin_print_scripts-$settings", array( $this, 'enqueue_scripts' ) );
	}

	public function enqueue_scripts() {
		$assets      = include SCBLOCKS_PLUGIN_DIR . 'build/dashboard.asset.php';
		$const_asset = include SCBLOCKS_PLUGIN_DIR . 'build/constants.asset.php';
		wp_enqueue_script(
			'scblocks-constants',
			SCBLOCKS_PLUGIN_URL . 'build/constants.js',
			$const_asset['dependencies'],
			$const_asset['version'],
			true
		);
		$store_asset = include SCBLOCKS_PLUGIN_DIR . 'build/store.asset.php';
		wp_enqueue_script(
			'scblocks-store',
			SCBLOCKS_PLUGIN_URL . 'build/store.js',
			$store_asset['dependencies'],
			$store_asset['version'],
			true
		);
		wp_enqueue_script(
			'scblocks-settings',
			SCBLOCKS_PLUGIN_URL . 'build/dashboard.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);
	}

	/**
	 * Register a REST API route.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function register_route() {
		register_rest_route(
			'scblocks/v1',
			'/settings',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get' ),
					'permission_callback' => array( $this, 'permission' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update' ),
					'permission_callback' => array( $this, 'permission' ),
				),
			)
		);
	}

	/**
	 * Checks permission.
	 *
	 * @since 1.3.0
	 * @return boolean
	 */
	public function permission() : bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Gets settings.
	 *
	 * @since 1.3.0
	 * @return mixed
	 */
	public function get() {
		return rest_ensure_response(
			array_merge(
				Plugin::option_defaults(),
				Plugin::options()
			)
		);
	}

	/**
	 * Sanitize specified option value.
	 *
	 * @since 1.3.0
	 * @param string $name The option name.
	 * @param mixed $value The value to save.
	 * @return mixed
	 */
	public function sanitize_value( string $name, $value ) {

		$callback = Plugin::get_option_sanitizing_func( $name );

		if ( is_callable( $callback ) ) {
			return call_user_func( $callback, $value );
		}
		return sanitize_text_field( $value );
	}

	/**
	 * Update Settings.
	 *
	 * @since 1.3.0
	 * @param WP_REST_Request $request  WP_REST_Request object.
	 * @return mixed
	 */
	public function update( \WP_REST_Request $request ) {
		$current_settings  = Plugin::options();
		$incoming_settings = $request->get_param( 'settings' );
		$next_settings     = array();

		foreach ( $incoming_settings as $name => $value ) {
			// Only save options that we know about.
			if ( ! array_key_exists( $name, Plugin::option_defaults() ) ) {
				continue;
			}
			// The option hasn't changed.
			if ( wp_json_encode( $current_settings[ $name ] ) === wp_json_encode( $incoming_settings[ $name ] ) ) {
				$next_settings[ $name ] = $value;
				continue;
			}

			// sanitize
			$next_settings[ $name ] = $this->sanitize_value( $name, $value );
		}

		if ( empty( $next_settings ) ) {
			return rest_ensure_response( __( 'No changes found.', 'scblocks' ) );
		}

		$is_saved = Plugin::update_options( $next_settings );

		if ( ! $is_saved ) {
			return new \WP_Error( 'failed_to_save', 'Failed to save settings', array( 'status' => 500 ) );
		}
		return rest_ensure_response( __( 'Settings saved.', 'scblocks' ) );
	}

	public function page() {
		?>
			<div class="wrap scblocks-dashboard-wrap">
				<div class="scblocks-settings">
					<div id="scblocks-settings-controls" class="scblocks-settings-controls"></div>
				</div>
			</div>
		<?php
	}
}
