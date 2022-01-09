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
		add_filter( 'scblocks_option_sanitize_func_names', array( $this, 'add_sanitizing_func' ) );
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
	}

	/**
	 * Add a callback that sanitizes the data when saving options.
	 *
	 * @since 1.3.0
	 *
	 * @param array $callbacks
	 *
	 * @return array
	 */
	public function add_sanitizing_func( array $callbacks ) : array {
		$callbacks['google_fonts'] = array( $this, 'sanitize_google_fonts' );
		return $callbacks;
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
	public function sanitize_google_fonts( $fonts ) : array {
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
	 * Get google fonts data.
	 *
	 * @return array
	 */
	public function get_google_fonts_data() : array {
		$fonts = Options::get( 'google_fonts' );

		return apply_filters( 'scblocks_google_fonts', $this->extract_fonts_data( $fonts ) );
	}

	/**
	 * Extract fonts data.
	 *
	 * @since 1.3.0
	 *
	 * @param array $fonts
	 *
	 * @return array
	 */
	public function extract_fonts_data( array $fonts ) : array {
		$data = array();

		foreach ( $fonts as $id => $font ) {
			if ( ! empty( $font['name'] ) ) {
				$data[ $id ]['name'] = $font['name'];

				if ( isset( $font['variants'] ) ) {
					$data[ $id ]['variants'] = $font['variants'];
				}
			}
		}
		return $data;
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
		$args = apply_filters(
			'scblocks_google_fonts_link_args',
			array(
				'family'  => implode( '|', $data ),
				'display' => 'swap',
			)
		);

		return esc_url( add_query_arg( $args, 'https://fonts.googleapis.com/css' ) );
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
			$css .= '--scblocks-' . $id . "-google-font:'" . $font['name'] . "';";
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
