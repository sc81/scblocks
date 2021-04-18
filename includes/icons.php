<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Icons {
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {

		register_rest_route(
			'scblocks/v1',
			'/icons/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_icons' ),
				'args'                => array(
					'id' => array(
						'sanitize_callback' => 'absint',
					),
				),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	public function get_icons( $data ) {

		switch ( $data['id'] ) {
			case 1:
				include_once SCBLOCKS_PLUGIN_DIR . 'includes/font-awesome.php';

				return rest_ensure_response( wp_json_encode( FONT_AWESOME ) );

			case 2:
				include_once SCBLOCKS_PLUGIN_DIR . 'includes/dashicons.php';

				return rest_ensure_response( wp_json_encode( DASHICONS ) );

			default:
				return new \WP_Error( 'no_icons', 'Invalid id', array( 'status' => 404 ) );
		}

	}
}
