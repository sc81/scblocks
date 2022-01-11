<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Manage post settings
 *
 * @since 1.3.0
 */
class Post_Settings {
	/**
	 * Metadata key.
	 *
	 * @since 1.3.0
	 *
	 * @var string
	 */
	const NAME = '_scblocks_post_settings';

	/**
	 * Get list of allowed setting names.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public static function allowed_names() : array {
		return apply_filters(
			'scblocks_post_settings_allowed_names',
			array(
				'css_version',
				'update_time',
				'old_update_time',
			)
		);
	}

	/**
	 * Gets and decodes the _scblocks_post_settings meta field.
	 *
	 * @since 1.3.0
	 *
	 * @param int $post_id Post ID.
	 * @return array
	 */
	public static function get( int $post_id ) : array {
		$value = get_post_meta( $post_id, self::NAME, true );
		if ( $value ) {
			return json_decode( $value, true );
		}
		return array();
	}

	/**
	 * Updates the _scblocks_post_settings meta field.
	 *
	 * @since 1.3.0
	 *
	 * @param int $post_id Post ID.
	 * @param array $settings New settings.
	 * @return int|bool Meta ID if the key didn't exist, true on successful update,
	 *                  false on failure or if the value passed to the function
	 *                  is the same as the one that is already in the database.
	 */
	public static function update( int $post_id, array $settings ) {
		return update_post_meta(
			$post_id,
			self::NAME,
			wp_slash( wp_json_encode( $settings ) )
		);
	}

	/**
	 * Register actions.
	 *
	 * @since 1.3.0
	 *
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
			'/post-settings',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_on_request' ),
					'permission_callback' => array( $this, 'permission' ),
					'args'                => array(
						'id' => array(
							'sanitize_callback' => array( $this, 'sanitize_id' ),
							'validate_callback' => array( $this, 'validate_id' ),
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_on_request' ),
					'permission_callback' => array( $this, 'permission' ),
					'args'                => array(
						'id' => array(
							'sanitize_callback' => array( $this, 'sanitize_id' ),
							'validate_callback' => array( $this, 'validate_id' ),
						),
						'settings' => array(
							'validate_callback' => array( $this, 'validate_settings' ),
						),
					),
				),
			)
		);
	}

	/**
	 * Checks permission.
	 *
	 * @since 1.3.0
	 *
	 * @return bool
	 */
	public function permission() : bool {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Validate the id.
	 *
	 * @since 1.3.0
	 *
	 * @param mixed $value
	 * @return bool
	 */
	public function validate_id( $value ) : bool {
		return is_numeric( $value );
	}
	/**
	 * Sanitize the id.
	 *
	 * @since 1.3.0
	 *
	 * @param mixed $value
	 * @return int
	 */
	public function sanitize_id( $value ) : int {
		return absint( $value );
	}

	/**
	 * Sanitize settings.
	 *
	 * @since 1.3.0
	 *
	 * @param mixed $value
	 * @return bool
	 */
	public function validate_settings( $value ) : bool {
		return is_array( $value );
	}

	/**
	 * Sanitize the specified setting value.
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
			'scblocks_post_setting_sanitize_funcs',
			array(
				'css_version'     => 'sanitize_text_field',
				'update_time'     => 'is_numeric',
				'old_update_time' => 'is_numeric',
			)
		);

		if ( is_callable( $callbacks[ $name ] ) ) {
			return call_user_func( $callbacks[ $name ], $value );
		}
		return sanitize_text_field( $value );
	}

	/**
	 * Update settings.
	 *
	 * @since 1.3.0
	 *
	 * @param \WP_REST_Request $request  WP_REST_Request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function update_on_request( \WP_REST_Request $request ) {
		$post_id          = $request->get_param( 'id' );
		$next_settings    = $request->get_param( 'settings' );
		$current_settings = self::get( $post_id );
		$allowed_names    = self::allowed_names();
		$response         = array();

		foreach ( $next_settings as $name => $value ) {
			// Only save setting that we know about.
			if ( ! in_array( $name, $allowed_names, true ) ) {
				unset( $next_settings[ $name ] );
				continue;
			}
			// The setting has not changed.
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
			$result = self::update( $post_id, array_merge( $current_settings, $next_settings ) );
			if ( $result ) {
				$response['text'] = __( 'Settings saved.', 'scblocks' );
			} else {
				return new \WP_Error( 'failed_to_save', 'Failed to save post settings' );
			}
		}

		return rest_ensure_response( $response );
	}

	/**
	 * Get settings on request.
	 *
	 * @since 1.3.0
	 *
	 * @param \WP_REST_Request $request  WP_REST_Request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_on_request( \WP_REST_Request $request ) {
		$post_id = $request->get_param( 'id' );
		return rest_ensure_response( self::get( $post_id ) );
	}
}
