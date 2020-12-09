<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Shape_Dividers {

	/**
	 * Register actions.
	 */
	public function register_actions() {
		add_action( 'rest_api_init', array( $this, 'register_route' ) );
	}

	/**
	 * Registers a REST API route for shape dividers.
	 */
	public function register_route() {
		register_rest_route(
			'scblocks/v1',
			'/shape-dividers',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_shape_dividers' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
	/**
	 * Get shape dividers.
	 */
	public function get_shape_dividers() {
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/shape-list.php';
		return rest_ensure_response( wp_json_encode( SHAPE_DIVIDERS ) );
	}
}
