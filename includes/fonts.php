<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Fonts {

	/**
	 * Register actions.
	 */
	public function register_actions() {
		add_action( 'rest_api_init', array( $this, 'register_route' ) );
		add_filter( 'scblocks_initial_css', array( $this, 'google_fonts_css' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'print_google_fonts_link' ) );
	}

	/**
	 * Registers a REST API route.
	 */
	public function register_route() {
		register_rest_route(
			'scblocks/v1',
			'/google-fonts',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_google_fonts_list' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
		register_rest_route(
			'scblocks/v1',
			'/site-google-fonts',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_site_google_fonts' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'set_site_google_fonts' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'args'                => array(
						'fonts' => array(
							'sanitize_callback' => array( $this, 'sanitize' ),
						),
					),
				),
			)
		);
	}

	/**
	 * Sanitize google fonts data.
	 *
	 * @since 1.3.0
	 *
	 * @param mixed $fonts
	 *
	 * @return array
	 */
	public function sanitize( $fonts ) : array {
		if ( ! is_array( $fonts ) || empty( $fonts ) ) {
			return array();
		}
		$next_fonts = array();
		foreach ( $fonts as $id => $font ) {
			if ( in_array( $id, array( 'primary', 'secondary', 'tertiary' ), true )
			&&
			is_array( $font )
			&&
			isset( $font['name'] )
			&&
			is_string( $font['name'] ) ) {
				$next_fonts[ $id ]['name'] = sanitize_text_field( $font['name'] );

				if ( isset( $font['variants'] ) && is_array( $font['variants'] ) ) {
					foreach ( $font['variants'] as $variant ) {
						if ( is_string( $variant ) ) {
							$next_fonts[ $id ]['variants'][] = sanitize_text_field( $variant );
						}
					}
				}
			}
		}
		return $next_fonts;
	}

	/**
	 * Gets the google fonts.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_google_fonts_list() {
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/google-fonts.php';
		return rest_ensure_response( GOOGLE_FONTS );
	}

	/**
	 * Get google fonts from options.
	 *
	 * @since 1.3.0
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_site_google_fonts() {
		return rest_ensure_response( Plugin::option( 'google_fonts' ) );
	}

	/**
	 * Save fonts in options.
	 *
	 * @since 1.3.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function set_site_google_fonts( \WP_REST_Request $request ) {
		$fonts = $request->get_param( 'fonts' );

		$settings = Plugin::options();

		if ( empty( $fonts ) ) {
			unset( $settings['google_fonts'] );
		} else {
			$settings['google_fonts'] = $fonts;
		}
		return rest_ensure_response( Plugin::update_options( $settings ) );
	}

	/**
	 * Get google fonts data.
	 *
	 * @return array
	 */
	public function get_google_fonts_data() : array {
		$fonts_data = Plugin::option( 'google_fonts' );

		$fonts = array();

		foreach ( $fonts_data as $id => $font ) {
			if ( isset( $font['name'] ) ) {
				$fonts[ $id ]['name'] = $font['name'];

				if ( isset( $font['variants'] ) ) {
					$fonts[ $id ]['variants'] = $font['variants'];
				}
			}
		}
		return $fonts;
	}

	/**
	 * Build the Google Font request URI.
	 *
	 * @return string URI to Google fonts
	 */
	public function build_google_fonts_uri() : string {
		$fonts_data = $this->get_google_fonts_data();

		if ( empty( $fonts_data ) ) {
			return '';
		}
		$data = array();

		foreach ( $fonts_data as $font ) {
			if ( ! empty( $font['variants'] ) ) {
				$data[] = $font['name'] . ':' . implode( ',', $font['variants'] );
			} else {
				$data[] = $font['name'];
			}
		}
		$args = array(
			'family'  => implode( '|', $data ),
			'display' => 'swap',
		);

		return add_query_arg( $args, 'https://fonts.googleapis.com/css' );
	}

	/**
	 * Print font names as CSS variables.
	 *
	 * @since 1.3.0
	 *
	 * @param string $initial_css
	 *
	 * @return string CSS.
	 */
	public function google_fonts_css( string $initial_css ) : string {
		$fonts_data = $this->get_google_fonts_data();

		$css = '';
		foreach ( $fonts_data as $id => $font ) {
			if ( ! empty( $font['name'] ) ) {
				$css .= '--scblocks-' . $id . "-google-font:'" . $font['name'] . "';";
			}
		}
		if ( $css ) {
			$css         = ':root{' . $css . '}';
			$initial_css = $css . $initial_css;
		}
		return $initial_css;
	}

	/**
	 * Print link to google fonts.
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function print_google_fonts_link() {
		$uri = $this->build_google_fonts_uri();
		if ( $uri ) {
			wp_enqueue_style( 'scblocks-google-fonts', $uri, array(), null );// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		}
	}
}
