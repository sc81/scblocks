<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Manage options.
 *
 * @since 1.3.0
 */
class Options {
	/**
	 * Option name.
	 *
	 * @since 1.3.0
	 *
	 * @var string
	 */
	const NAME = 'scblocks';

	/**
	 * Gets defaults for option.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public static function defaults() : array {
		return apply_filters(
			'scblocks_option_defaults',
			array(
				'css_print_method'            => 'file',
				'force_regenerate_css_files'  => '0',
				'reusable_blocks_update_time' => '0',
				'used_icons_post_id'          => '',
				'wide_content_max_width'      => '1240px',
				'content_max_width'           => '610px',
				'google_fonts'                => array(),
			)
		);
	}

	/**
	 * Retrieves the specified option.
	 *
	 * @since 1.3.0
	 *
	 * @param string $option The option to get.
	 *
	 * @return mixed The option value, or null if the option does not exists.
	 */
	public static function get( string $option ) {
		$defaults = self::defaults();
		if ( ! isset( $defaults[ $option ] ) ) {
			return;
		}

		$options = wp_parse_args(
			get_option( self::NAME, array() ),
			$defaults
		);

		return $options[ $option ];
	}

	/**
	 * Retrieves options from the database.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public static function all() : array {
		return get_option( self::NAME, array() );
	}

	/**
	 * Updates options.
	 *
	 * @since 1.3.0
	 *
	 * @param array $settings New option state
	 *
	 * @return bool True if the value was updated, false otherwise.
	 */
	public static function update( array $settings ) : bool {
		return update_option( self::NAME, $settings );
	}

	/**
	 * Register actions.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function register_actions() {
		add_action( 'rest_api_init', array( $this, 'register_route' ) );
	}

	/**
	 * Register a REST API route.
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function register_route() {
		register_rest_route(
			'scblocks/v1',
			'/options',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_on_request' ),
					'permission_callback' => array( $this, 'permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_by_request' ),
					'permission_callback' => array( $this, 'permission' ),
				),
			)
		);
	}

	/**
	 * Checks permission.
	 *
	 * @since 1.3.0
	 *
	 * @return boolean
	 */
	public function permission() : bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get options on request.
	 *
	 * @since 1.3.0
	 *
	 * @return mixed
	 */
	public function get_on_request() {
		return rest_ensure_response(
			array_merge(
				self::defaults(),
				self::all()
			)
		);
	}

	/**
	 * Sanitize specified option value.
	 *
	 * @since 1.3.0
	 *
	 * @param string $name The option name.
	 * @param mixed $value The value to save.
	 *
	 * @return mixed
	 */
	public function sanitize_value( string $name, $value ) {
		$callbacks = apply_filters(
			'scblocks_option_sanitize_func_names',
			array(
				'css_print_method'            => 'sanitize_text_field',
				'force_regenerate_css_files'  => 'sanitize_text_field',
				'reusable_blocks_update_time' => 'sanitize_text_field',
				'used_icons_post_id'          => 'sanitize_text_field',
				'wide_content_max_width'      => 'sanitize_text_field',
				'content_max_width'           => 'sanitize_text_field',
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
	 *
	 * @param \WP_REST_Request $request  WP_REST_Request object.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function update_by_request( \WP_REST_Request $request ) {
		$current_settings = self::all();
		$next_settings    = $request->get_param( 'settings' );
		$response         = array();

		foreach ( $next_settings as $name => $value ) {
			// Only save options that we know about.
			if ( ! array_key_exists( $name, self::defaults() ) ) {
				unset( $next_settings[ $name ] );
				continue;
			}
			// The option hasn't changed.
			if ( isset( $current_settings[ $name ] ) && wp_json_encode( $current_settings[ $name ] ) === wp_json_encode( $next_settings[ $name ] ) ) {
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

			self::update( array_merge( $current_settings, $next_settings ) );
		}

		return rest_ensure_response( $response );
	}
}
