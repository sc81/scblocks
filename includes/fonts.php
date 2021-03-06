<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Fonts {

	/**
	 * An array of blocks attributes.
	 *
	 * @var array
	 */
	private $blocks_attr;

	/**
	 * Constructor
	 *
	 * @param array $blocks_attr An array of blocks attributes.
	 */
	public function __construct( array $blocks_attr = array() ) {
		$this->blocks_attr = $blocks_attr;
	}

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
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_google_fonts_list' ),
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
	 * Gets the google fonts from blocks attributes
	 *
	 * @return array
	 */
	public function get_google_fonts_data() : array {
		if ( empty( $this->blocks_attr ) ) {
			return array();
		}
		$fonts         = array();
		$font_variants = array();

		foreach ( $this->blocks_attr as $block_data ) {
			foreach ( $block_data as $block ) {
				if ( isset( $block['googleFont'] ) && isset( $block['fontFamily'] ) ) {
					$font_family           = $block['fontFamily'];
					$fonts[ $font_family ] = true;

					$variants = $block['googleFontVariants'];

					if ( $variants ) {
						$variants = explode( ',', $variants );
						$variants = array_flip( $variants );

						if ( ! empty( $font_variants[ $font_family ] ) ) {
							$font_variants[ $font_family ] = $font_variants[ $font_family ] + $variants;
						} else {
							$font_variants[ $font_family ] = $variants;
						}
					}
				}
			}
		}
		return array(
			'fonts'    => $fonts,
			'variants' => $font_variants,
		);
	}

	/**
	 * Build the Google Font request URI from blocks attributes.
	 *
	 * @return string URI to Google fonts
	 */
	public function build_google_fonts_uri() : string {
		$fonts_data = $this->get_google_fonts_data();

		if ( empty( $fonts_data ) || empty( $fonts_data['fonts'] ) ) {
			return '';
		}
		$data = array();

		foreach ( $fonts_data['fonts'] as $font_family => $value ) {
			if ( ! empty( $fonts_data['variants'] ) && ! empty( $fonts_data['variants'][ $font_family ] ) ) {
				$data[] = $font_family . ':' . implode( ',', array_keys( $fonts_data['variants'][ $font_family ] ) );
			} else {
				$data[] = $font_family;
			}
		}
		$args = array(
			'family'  => implode( '|', $data ),
			'display' => 'swap',
		);

		return add_query_arg( $args, 'https://fonts.googleapis.com/css' );
	}
}
