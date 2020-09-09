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
			if ( isset( $block_data['googleFont'] ) && isset( $block_data['fontFamily'] ) ) {
				$font_family           = $block_data['fontFamily'];
				$fonts[ $font_family ] = true;

				$variants = $block_data['googleFontVariants'];

				if ( $variants ) {
					$variants = explode( ',', $variants );
					$variants = array_flip( $variants );
					array_walk( $variants, array( $this, 'change_value_to_true' ) );

					if ( ! empty( $font_variants[ $font_family ] ) ) {
						$font_variants[ $font_family ] = $font_variants[ $font_family ] + $variants;
					} else {
						$font_variants[ $font_family ] = $variants;
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
	 * The function sets the value to true.
	 *
	 * @param mixed $item Reference to the value of an array parameter.
	 */
	private function change_value_to_true( &$item ) {
		$item = true;
	}

	/**
	 * Build the Google Font request URI from blocks attributes.
	 *
	 * @param array $fonts_data Array of Google Fonts and fonts variants.
	 *
	 * @return string URI to Google fonts
	 */
	public function build_google_fonts_uri( array $fonts_data = array() ) : string {
		if ( empty( $fonts_data ) ) {
			$fonts_data = $this->get_google_fonts_data();
		}
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
