<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Manage icons.
 *
 * @since 1.3.0
 */
class Icons {
	/**
	 * @since 1.3.0
	 * @var string
	 */
	const POST_TYPE_NAME = 'scblocks_icon';

	/**
	 * @since 1.3.0
	 * @var array
	 */
	const BLOCKS_WITH_ICON = array( 'scblocks/heading', 'scblocks/button' );


	/**
	 * Icons data extracted from blocks.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	private $data = array();

	/**
	 * Array of post objects.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	private $posts = array();

	/**
	 * Register actions
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function register_actions() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'init', array( $this, 'register_post' ) );
		add_action( 'wp_insert_post_data', array( $this, 'update_icons_data' ), 10, 2 );
	}

	/**
	 * Register routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			'scblocks/v1',
			'/icons/(?P<id>\d+)',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_for_admin_area' ),
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

	/**
	 * Register post type.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function register_post() {
		register_post_type(
			self::POST_TYPE_NAME,
			array(
				'show_ui'      => false,
				'show_in_menu' => false,
				'supports'     => array(),
			)
		);
	}

	/**
	 * Get icons for the admin area.
	 *
	 * @since 1.3.0
	 * @param mixed $data
	 *
	 * @return mixed
	 */
	public function get_for_admin_area( $data ) {

		switch ( $data['id'] ) {
			case 1:
				include_once SCBLOCKS_PLUGIN_DIR . 'includes/font-awesome.php';

				return rest_ensure_response( wp_json_encode( FONTAWESOME ) );

			case 2:
				include_once SCBLOCKS_PLUGIN_DIR . 'includes/dashicons.php';

				return rest_ensure_response( wp_json_encode( DASHICONS ) );

			case 3:
				return rest_ensure_response( $this->get() );

			default:
				return new \WP_Error( 'no_icons', 'Invalid id', array( 'status' => 404 ) );
		}

	}
	/**
	 * Update icons data.
	 *
	 * @since 1.3.0
	 *
	 * @param array $data An array of slashed, sanitized, and processed post data.
	 * @param array $postarr An array of sanitized (and slashed) but otherwise unmodified post data.
	 *
	 * @return array
	 */
	public function update_icons_data( array $data, array $postarr ) : array {
		if ( wp_is_post_autosave( $postarr['ID'] ) ||
			wp_is_post_revision( $postarr['ID'] ) ||
			! current_user_can( 'edit_post', $postarr['ID'] ) ||
			! $data['post_content'] ||
			self::POST_TYPE_NAME === $data['post_type'] ) {
			return $data;
		}
		$blocks = parse_blocks( wp_unslash( $data['post_content'] ) );

		$this->posts = $this->get_saved();

		$this->extract_data( $blocks );

		$this->save();

		$this->set_attrs( $blocks );

		$data['post_content'] = wp_slash( serialize_blocks( $blocks ) );

		return $data;
	}

	/**
	 * Save icons in the database.
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function save() {
		if ( empty( $this->data ) ) {
			return;
		}
		foreach ( $this->data as $index => $icon ) {
			$result = wp_insert_post(
				array(
					'post_type'    => self::POST_TYPE_NAME,
					'post_content' => $icon['html'],
					'post_title'   => wp_strip_all_tags( $icon['name'] ),
					'post_name'    => wp_strip_all_tags( $icon['id'] ),
				)
			);
			if ( $result && ! is_wp_error( $result ) ) {
				$this->data[ $index ]['postId'] = (string) $result;
			}
		}
	}

	/**
	 * Set new attributes for icons.
	 *
	 * @since 1.3.0
	 *
	 * @param array $blocks
	 *
	 * @return void
	 */
	public function set_attrs( array &$blocks ) {
		foreach ( $blocks as $index => $block ) {
			if ( isset( $block['blockName'] )
			&&
			in_array( $block['blockName'], self::BLOCKS_WITH_ICON, true )
			&&
			isset( $block['attrs'] )
			&&
			isset( $block['attrs']['iconId'] ) ) {
				$post_id = $this->get_post_id( $block['attrs']['iconId'] );
				if ( $post_id ) {
					$blocks[ $index ]['attrs']['iconPostId'] = $post_id;

					unset( $blocks[ $index ]['attrs']['iconHtml'] );
					unset( $blocks[ $index ]['attrs']['iconName'] );
					unset( $blocks[ $index ]['attrs']['iconId'] );
				}
			}
			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->set_attrs( $blocks[ $index ]['innerBlocks'] );
			}
		}
	}

	/**
	 * Extract icons data from block attributes.
	 *
	 * @since 1.3.0
	 *
	 * @param array $blocks
	 * @param array $icons
	 *
	 * @return void
	 */
	public function extract_data( array $blocks ) {
		foreach ( $blocks as $block ) {
			if ( isset( $block['blockName'] )
			&&
			in_array( $block['blockName'], self::BLOCKS_WITH_ICON, true )
			&&
			isset( $block['attrs'] )
			&&
			isset( $block['attrs']['iconName'] )
			&&
			isset( $block['attrs']['iconHtml'] )
			&&
			isset( $block['attrs']['iconId'] )
			&&
			! $this->is_saved_icon( $block['attrs']['iconId'] )
			&&
			! $this->is_icon_added( $block['attrs']['iconId'] ) ) {
				$this->data[] = array(
					'name' => $block['attrs']['iconName'],
					'html' => $block['attrs']['iconHtml'],
					'id'   => $block['attrs']['iconId'],
				);
			}
			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->extract_data( $block['innerBlocks'] );
			}
		}
	}

	/**
	 * Checks if the icon data set contains an icon.
	 *
	 * @since 1.3.0
	 *
	 * @param string $id Icon ID
	 *
	 * @return bool
	 */
	public function is_icon_added( string $id ) : bool {
		foreach ( $this->data as $icon ) {
			if ( $icon['id'] === $id ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Get post id for given icon.
	 *
	 * @since 1.3.0
	 *
	 * @param string $icon_id
	 *
	 * @return string
	 */
	public function get_post_id( string $icon_id ) : string {
		foreach ( $this->data as $icon ) {
			if ( $icon['id'] === $icon_id && isset( $icon['postId'] ) ) {
				return $icon['postId'];
			}
		}
		foreach ( $this->posts as $post ) {
			if ( $post->post_name === $icon_id ) {
				return (string) $post->ID;
			}
		}
		return '';
	}

	/**
	 * Get HTML markup of saved icons.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public function get() : array {
		$posts = $this->get_saved();
		$icons = array();
		foreach ( $posts as $post ) {
			$icons[ $post->ID ] = $post->post_content;
		}
		return $icons;
	}

	/**
	 * Get saved icons from the database.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public function get_saved() : array {
		return get_posts(
			array(
				'post_type'   => self::POST_TYPE_NAME,
				'post_status' => 'draft',
				'numberposts' => -1,
			)
		);
	}

	/**
	 * Checks if an icon is already saved.
	 *
	 * @since 1.3.0
	 *
	 * @param string $icon_id
	 *
	 * @return bool
	 */
	public function is_saved_icon( string $icon_id ) : bool {
		foreach ( $this->posts as $post ) {
			if ( $post->post_name === $icon_id ) {
				return true;
			}
		}
		return false;
	}

}
