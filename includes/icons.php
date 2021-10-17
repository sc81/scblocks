<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Icons {
	public static $post_type = 'scblocks_svg';

	private $used_icons_post_id_option_name = 'used_icons_post_id';

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'init', array( $this, 'register_post' ) );
		add_action( 'save_post', array( $this, 'update_used_by_posts' ), 10, 2 );
	}

	public function register_routes() {
		register_rest_route(
			'scblocks/v1',
			'/icons/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
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
					isset( $icon['attrs']['iconName'] ) &&
					isset( $icon['innerHTML'] ) ) {
						$prepared[ $icon['attrs']['iconName'] ] = $icon['innerHTML'];
					}
				}

				return rest_ensure_response( $prepared );

			default:
				return new \WP_Error( 'no_icons', 'Invalid id', array( 'status' => 404 ) );
		}

	}
	public function update_used_by_posts( int $post_id, \WP_Post $post ) {
		if ( wp_is_post_autosave( $post_id ) ||
			wp_is_post_revision( $post_id ) ||
			! current_user_can( 'edit_post', $post_id ) ||
			! $post->post_content ||
			self::$post_type === $post->post_type ) {
			return;
		}
		$blocks = parse_blocks( $post->post_content );

		$post_icons = $this->retrive_icon_names( $blocks, array( 'scblocks/heading', 'scblocks/button' ) );
		$used_icons = $this->retrive_icon_names( $this->used_by_posts(), array( 'scblocks/used-icon' ) );
		array_push( $used_icons, ...$post_icons );
		$next_used_icons = array_unique( $used_icons );

		$icons = $this->build_icons( $next_used_icons );

		$used_icons_post_id = Plugin::option( $this->used_icons_post_id_option_name );
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
			}
		} else {
			wp_update_post(
				array(
					'ID'           => $used_icons_post_id,
					'post_content' => $icons,
				)
			);
		}
	}

	public function retrive_icon_names( array $blocks, array $block_names ) : array {
		$names = array();

		foreach ( $blocks as $block ) {
			if ( isset( $block['blockName'] ) &&
			in_array( $block['blockName'], $block_names, true ) &&
			isset( $block['attrs'] ) &&
			isset( $block['attrs']['iconName'] ) ) {
				$names[] = $block['attrs']['iconName'];
			}
		}
		return $names;
	}

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
	public function build_icons( array $icons_data ) : string {
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/font-awesome.php';
		include_once SCBLOCKS_PLUGIN_DIR . 'includes/dashicons.php';

		$icons = '';

		foreach ( $icons_data as $icon_name ) {
			$name_parts = explode( '|', $icon_name );
			if ( 'dashicons' === $name_parts[0] ) {
				if ( isset( DASHICONS[ $name_parts[2] ] ) ) {
					$icons .= $this->do_block( $icon_name, $this->build_dashicon( DASHICONS[ $name_parts[2] ] ) );
				}
			} elseif ( 'fontawesome' === $name_parts[0] ) {
				if ( isset( FONTAWESOME[ $name_parts[1] ] ) &&
				isset( FONTAWESOME[ $name_parts[1] ][ $name_parts[2] ] ) ) {
					$icons .= $this->do_block( $icon_name, $this->build_fontawesome( FONTAWESOME[ $name_parts[1] ][ $name_parts[2] ] ) );
				}
			}
		}
		return $icons;
	}
	public function do_block( string $icon_name, string $content ) : string {
		$block = array(
			'blockName'    => 'scblocks/used-icon',
			'attrs'        => array(
				'iconName' => $icon_name,
			),
			'innerContent' => array( $content ),
		);
		return serialize_block( $block );
	}
	public function build_dashicon( string $path_definition ) : string {
		$icon  = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">';
		$icon .= sprintf( '<path d="%s"></path>', $path_definition );
		$icon .= '</svg>';
		return $icon;
	}
	public function build_fontawesome( string $icon_data ) : string {
		$parts           = explode( '|', $icon_data );
		$view_box        = $parts[0];
		$path_definition = $parts[1];
		$icon            = sprintf( '<svg viewBox="%s" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">', $view_box );
		$icon           .= sprintf( '<path d="%s"></path>', $path_definition );
		$icon           .= '</svg>';
		return $icon;
	}
}
