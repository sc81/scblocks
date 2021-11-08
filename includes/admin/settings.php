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
		$settings_asset = include SCBLOCKS_PLUGIN_DIR . 'build/settings.asset.php';
		$const_asset    = include SCBLOCKS_PLUGIN_DIR . 'build/constants.asset.php';
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
			SCBLOCKS_PLUGIN_URL . 'build/settings.js',
			$settings_asset['dependencies'],
			$settings_asset['version'],
			true
		);
		wp_enqueue_style(
			'scblocks-settings',
			SCBLOCKS_PLUGIN_URL . 'build/settings.css',
			array( 'wp-components' ),
			$settings_asset['version']
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
		$callbacks = apply_filters(
			'scblocks_option_sanitize_func_names',
			array(
				'css_print_method'            => 'sanitize_text_field',
				'force_regenerate_css_files'  => 'sanitize_text_field',
				'reusable_blocks_update_time' => 'sanitize_text_field',
			)
		);

		if ( is_callable( $callbacks[ $name ] ) ) {
			return call_user_func( $callbacks[ $name ], $value );
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
		$current_settings = Plugin::options();
		$next_settings    = $request->get_param( 'settings' );
		$response         = array();

		foreach ( $next_settings as $name => $value ) {
			// Only save options that we know about.
			if ( ! array_key_exists( $name, Plugin::option_defaults() ) ) {
				unset( $next_settings[ $name ] );
				continue;
			}
			// The option hasn't changed.
			if ( wp_json_encode( $current_settings[ $name ] ) === wp_json_encode( $next_settings[ $name ] ) ) {
				unset( $next_settings[ $name ] );
				continue;
			}

			// sanitize
			$next_settings[ $name ] = $this->sanitize_value( $name, $value );
		}

		if ( empty( $next_settings ) ) {
			$response['text'] = __( 'No changes found.', 'scblocks' );
		} else {
			$response['text'] = __( 'Settings saved.', 'scblocks' );
			Plugin::update_options( array_merge( $current_settings, $next_settings ) );
		}

		return rest_ensure_response( $response );
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
