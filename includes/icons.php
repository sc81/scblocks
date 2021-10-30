<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Icons {
	/**
	 * @since 1.3.0
	 * @var string
	 */
	public static $post_type = 'scblocks_svg';

	/**
	 * @since 1.3.0
	 * @var array
	 */
	public static $blocks_with_icon = array( 'scblocks/heading', 'scblocks/button' );

	/**
	 * @since 1.3.0
	 * @var string
	 */
	private $used_icons_post_id_option_name = 'used_icons_post_id';

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
		add_action( 'wp_insert_post_data', array( $this, 'update_used_by_posts' ), 10, 2 );
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
	 * Register post.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function register_post() {
		register_post_type(
			self::$post_type,
			array(
				'show_ui'      => false,
				'show_in_menu' => false,
				'show_in_rest' => true,
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
	 * @return void
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
				$used_icons = $this->used_by_posts();
				$prepared   = array();
				foreach ( $used_icons as $icon ) {
					if ( isset( $icon['attrs'] ) &&
					isset( $icon['attrs']['id'] ) &&
					isset( $icon['innerHTML'] ) ) {
						$prepared[ $icon['attrs']['id'] ] = $icon['innerHTML'];
					}
				}

				return rest_ensure_response( $prepared );

			default:
				return new \WP_Error( 'no_icons', 'Invalid id', array( 'status' => 404 ) );
		}

	}
	/**
	 * Update a post that includes the icons used by the posts.
	 *
	 * @since 1.3.0
	 *
	 * @param array $data An array of slashed, sanitized, and processed post data.
	 * @param array $postarr An array of sanitized (and slashed) but otherwise unmodified post data.
	 *
	 * @return void
	 */
	public function update_used_by_posts( array $data, array $postarr ) : array {
		if ( wp_is_post_autosave( $postarr['ID'] ) ||
			wp_is_post_revision( $postarr['ID'] ) ||
			! current_user_can( 'edit_post', $postarr['ID'] ) ||
			! $data['post_content'] ||
			self::$post_type === $data['post_type'] ) {
			return $data;
		}
		$blocks = parse_blocks( wp_unslash( $data['post_content'] ) );

		$icons = $this->build_icons( $blocks );

		$used_icons_post_id = Plugin::option( $this->used_icons_post_id_option_name );

		$is_updated = false;
		if ( ! $used_icons_post_id ) {
			$args = array(
				'post_type'    => self::$post_type,
				'post_content' => $icons,
				'post_name'    => 'used_icons_by_posts',
			);
			$id   = wp_insert_post( $args );
			if ( ! ! $id && ! is_wp_error( $id ) ) {
				$options = Plugin::options();
				$options[ $this->used_icons_post_id_option_name ] = (string) $id;
				Plugin::update_options( $options );
				$is_updated = true;
			}
		} else {
			$id = wp_update_post(
				array(
					'ID'           => $used_icons_post_id,
					'post_content' => $icons,
				)
			);
			if ( ! ! $id && ! is_wp_error( $id ) ) {
				$is_updated = true;
			}
		}
		if ( ! $is_updated ) {
			return $data;
		}
		$this->remove_redundant_attrs( $blocks );

		$data['post_content'] = wp_slash( serialize_blocks( $blocks ) );

		return $data;
	}

	/**
	 * Remove redundant icon attributes.
	 *
	 * @since 1.3.0
	 *
	 * @param array $blocks
	 *
	 * @return void
	 */
	public function remove_redundant_attrs( array &$blocks ) {
		foreach ( $blocks as $index => $block ) {
			if ( isset( $block['blockName'] ) &&
			in_array( $block['blockName'], self::$blocks_with_icon, true ) &&
			isset( $block['attrs'] ) ) {
				unset( $blocks[ $index ]['attrs']['iconHtml'] );
				unset( $blocks[ $index ]['attrs']['iconName'] );
			}
			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->remove_redundant_attrs( $blocks[ $index ]['innerBlocks'] );
			}
		}
	}

	/**
	 * Get icons data from block attributes.
	 *
	 * @since 1.3.0
	 *
	 * @param array $blocks
	 * @param array $icons
	 *
	 * @return array
	 */
	public function retrive_icons_data_from_blocks( array $blocks, array $icons = array() ) : array {
		foreach ( $blocks as $block ) {
			if ( isset( $block['blockName'] ) &&
			in_array( $block['blockName'], self::$blocks_with_icon, true ) &&
			isset( $block['attrs'] ) &&
			isset( $block['attrs']['iconName'] ) &&
			isset( $block['attrs']['iconHtml'] ) &&
			isset( $block['attrs']['iconId'] ) &&
			! $this->is_icon_with_id( $block['attrs']['iconId'], $icons ) ) {
				$icons[] = array(
					'name' => $block['attrs']['iconName'],
					'html' => $block['attrs']['iconHtml'],
					'id'   => $block['attrs']['iconId'],
				);
			}
			if ( ! empty( $block['innerBlocks'] ) ) {
				$icons = $this->retrive_icons_data_from_blocks( $block['innerBlocks'], $icons );
			}
		}
		return $icons;
	}

	/**
	 * Get data from icon blocks.
	 *
	 * @since 1.3.0
	 *
	 * @param array $blocks
	 * @param array $icons
	 *
	 * @return array
	 */
	public function retrive_data_from_icon_blocks( array $blocks, array $icons = array() ) : array {
		foreach ( $blocks as $block ) {
				$icons[] = array(
					'id'   => $block['attrs']['id'],
					'name' => $block['attrs']['name'],
					'html' => $block['innerHTML'],
				);
		}
		return $icons;
	}

	/**
	 * Return an array of icons used by posts.
	 *
	 * @since 1.3.0
	 *
	 * @return array Array of parsed block objects.
	 */
	public function used_by_posts() : array {
		$post_id = Plugin::option( 'used_icons_post_id' );
		if ( ! $post_id ) {
			return array();
		}
		$post = get_post( (int) $post_id );
		if ( ! $post || ! $post->post_content ) {
			return array();
		}
		return parse_blocks( $post->post_content );
	}

	/**
	 * Checks if an icon set contains an icon with the specified ID.
	 *
	 * @since 1.3.0
	 *
	 * @param string $id Icon ID
	 * @param array $icons Icons to check.
	 *
	 * @return bool
	 */
	public function is_icon_with_id( string $id, array $icons ) : bool {
		foreach ( $icons as $icon ) {
			if ( $icon['id'] === $id ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Build HTML markup for icons.
	 *
	 * @since 1.3.0
	 *
	 * @param array $blocks
	 *
	 * @return string
	 */
	public function build_icons( array $blocks ) : string {
		$used_icons = $this->retrive_data_from_icon_blocks( $this->used_by_posts() );
		$post_icons = $this->retrive_icons_data_from_blocks( $blocks );

		$icons_data = array_merge( $used_icons, $post_icons );

		$ids   = array();
		$icons = '';
		foreach ( $icons_data as $icon ) {
			if ( ! in_array( $icon['id'], $ids, true ) ) {
				$ids[]  = $icon['id'];
				$icons .= $this->do_block( $icon['name'], $icon['id'], $icon['html'] );
			}
		}
		return $icons;
	}
	/**
	 * Wrap content with comment delimiters and serialize all attributes.
	 *
	 * @since 1.3.0
	 *
	 * @param string $icon_name
	 * @param string $icon_id
	 * @param string $content
	 *
	 * @return string
	 */
	public function do_block( string $icon_name, string $icon_id, string $content ) : string {
		$block = array(
			'blockName'    => 'scblocks/used-icon',
			'attrs'        => array(
				'name' => $icon_name,
				'id'   => $icon_id,
			),
			'innerContent' => array( $content ),
		);
		return serialize_block( $block );
	}
}
