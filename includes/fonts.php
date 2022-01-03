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
	}

	/**
	 * Registers a REST API route for Google fonts.
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
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_site_google_fonts' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
		register_rest_route(
			'scblocks/v1',
			'/set-site-google-fonts',
			array(
				'methods'             => \WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'set_site_google_fonts' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
	/**
	 * Gets the google fonts.
	 */
	public function get_google_fonts_list() {
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/google-fonts.php';
		return rest_ensure_response( GOOGLE_FONTS );
	}

	/**
	 * Get Google Fonts for the site.
	 *
	 * @since 1.3.0
	 */
	public function get_site_google_fonts() {
		return rest_ensure_response( Plugin::option( 'google_fonts' ) );
	}

	public function set_site_google_fonts( \WP_REST_Request $request ) {
		$fonts = $request->get_param( 'fonts' );

		$settings = Plugin::options();

		$settings['google_fonts'] = $fonts;

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

		foreach ( $fonts_data as $font_data ) {
			foreach ( $font_data as $font ) {
				if ( isset( $font['name'] ) ) {
					$fonts[ $font['name'] ] = array();

					if ( isset( $font['variants'] ) ) {
						$fonts[ $font['name'] ] = $font['variants'];
					}
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
			foreach ( $font as $name => $variants ) {
				if ( ! empty( $variants ) ) {
					$data[] = $name . ':' . implode( ',', $variants );
				} else {
					$data[] = $name;
				}
			}
		}
		$args = array(
			'family'  => implode( '|', $data ),
			'display' => 'swap',
		);

		return add_query_arg( $args, 'https://fonts.googleapis.com/css' );
	}

	public function google_fonts_css() : string {
		$fonts_data = $this->get_google_fonts_data();
		$css        = '';
		foreach ( $fonts_data as $id => $font ) {
			if ( ! empty( $font['name'] ) ) {
				$css .= '--scblocks-' . $id . '-google-font:' . $font['name'] . ';';
			}
		}
		if ( $css ) {
			$css .= 'root:{' . $css . '}';
		}
		return $css;
	}
}
