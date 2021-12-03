<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Image data.
 *
 * @since 1.3.0
 */
class Image_Data {
	/**
	 * Register actions
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function register_actions() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}
	/**
	 * Register routes.
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			'scblocks/v1',
			'/image-data/(?P<id>[0-9]+)',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'requested_urls' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Get image urls for a REST endpoint.
	 *
	 * @since 1.3.0
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function requested_urls( \WP_REST_Request $request ) {
		$id = $request->get_param( 'id' );

		return rest_ensure_response( $this->size_urls( $id ) );
	}

	/**
	 * Get urls for existing image sizes.
	 *
	 * @since 1.3.0
	 *
	 * @param string $ids Image id.
	 *
	 * @return array
	 */
	public function size_urls( string $id ) : array {
		$image_data = array();
		$data       = wp_get_attachment_metadata( $id );
		if ( $data ) {
			$upload_dir    = wp_get_upload_dir();
			$files_sub_dir = str_replace( wp_basename( $data['file'] ), '', $data['file'] );
			$full_size_url = $upload_dir['baseurl'] . '/' . $data['file'];

			$image_data[ $id ]['full'] = $full_size_url;

			foreach ( $data['sizes'] as $name => $value ) {
				$image_data[ $id ][ $name ] = $upload_dir['baseurl'] . '/' . $files_sub_dir . $value['file'];
			}
		}

		return $image_data;
	}
}
