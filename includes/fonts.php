<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Fonts {

	private $plugin_settings_name = 'scblocks_settings';

	public function register_actions() {
		add_action( 'wp_enqueue_scripts', array( $this, 'add_google_fonts_link' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'add_google_fonts_link' ) );
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_print_css_vars' ) );
	}

	public function register_routes() {
		register_rest_route(
			'scblocks/v1',
			'/fonts-settings',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_fonts_settings' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_fonts' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
			)
		);
		register_rest_route(
			'scblocks/v1',
			'/google-fonts',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_google_fonts' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
	public function get_google_fonts() {
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/google-fonts.php';
		return rest_ensure_response( GOOGLE_FONTS );
	}
	public function get_fonts() {
		$settings = get_option( $this->plugin_settings_name, array() );
		$data     = '';
		if ( ! empty( $settings ) ) {
			$data                 = array();
			$data['fonts']        = empty( $settings['fonts'] ) ? '' : $settings['fonts'];
			$data['fontsCssVars'] = empty( $settings['fontsCssVars'] ) ? '' : $settings['fontsCssVars'];
		}

		return rest_ensure_response( $data );
	}
	public function update_fonts_settings( $data ) {
		$settings = get_option( $this->plugin_settings_name, array() );

		$settings['fonts']        = $data['fonts'];
		$settings['fontsCssVars'] = $data['fontsCssVars'];

		return rest_ensure_response( update_option( $this->plugin_settings_name, $settings ) );
	}

	public function get_css_vars() {
		$settings = get_option( $this->plugin_settings_name, array() );

		if ( empty( $settings ) || empty( $settings['fontsCssVars'] ) ) {
			return '';
		}
		return wp_strip_all_tags( $settings['fontsCssVars'] );
	}
	public function editor_print_css_vars() {
		$css = $this->get_css_vars();
		if ( $css ) {
			wp_add_inline_style( 'scblocks-editor', $css );
		}
	}
	public function google_fonts_link() {
		$settings = get_option( $this->plugin_settings_name, array() );

		if ( empty( $settings ) || empty( $settings['fonts'] ) ) {
			return '';
		}
		$g_fonts = '';
		foreach ( $settings['fonts'] as $family ) {
			if ( $family ) {
				$g_fonts .= $family . '|';
			}
		}
		$g_fonts = preg_replace( '/\|$/', '', $g_fonts );
		if ( ! $g_fonts ) {
			return '';
		}

		return esc_url_raw( add_query_arg( 'family', $g_fonts, 'https://fonts.googleapis.com/css' ) );
	}
	public function add_google_fonts_link() {
		wp_enqueue_style( 'scblocks-fonts', $this->google_fonts_link(), array(), SCBLOCKS_VERSION );
	}
}
