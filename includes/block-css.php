<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Creates and manages CSS
 */
class Block_Css {

	/** @var string */
	const DESKTOP_DEVICES = 'Desktop';

	/** @var string */
	const TABLET_DEVICES = 'Tablet';

	/** @var string */
	const MOBILE_DEVICES = 'Mobile';

	/** @var string */
	const BLOCK_NAMESPACE = 'scblocks';

	/** @var string */
	const POST_SETTINGS_POST_META_NAME = '_scblocks_post_settings';

	/** @var string */
	public $tablet_devices_max_width = '1024px';

	/** @var string */
	public $tablet_devices_min_width = '768px';

	/** @var string */
	public $mobile_devices_max_width = '767px';

	/**
	 * Our css.
	 *
	 * @var string
	 */
	private $inline;

	/**
	 * The request URI to Google Fonts
	 *
	 * @var string
	 */
	private $google_fonts_uri = '';

	/**
	 * Constructor
	 */
	public function __construct() {
		add_option( 'scblocks_css_write_time', time() );
	}

	/**
	 * Hooks a function on to a specific action.
	 */
	public function register_actions() {
		add_action( 'save_post', array( $this, 'update_post_settings' ), 10, 2 );
		add_action( 'save_post_wp_block', array( $this, 'wp_block_update' ), 10, 2 );
	}
	/**
	 * Get the current page ID.
	 *
	 * @return int
	 */
	public function get_post_id() : int {
		global $post;
		$id = 0;

		if ( isset( $post ) && is_singular() ) {
			$id = $post->ID;
		}
		if ( $this->is_woo_shop() ) {
			$id = $this->get_woo_shop_page_id();
		}
		if ( is_home() ) {
			$id = get_option( 'page_for_posts' );
		}

		return (int) $id;
	}
	/**
	 * Checks if there is a woocommerce shop page.
	 *
	 * @return bool
	 */
	public function is_woo_shop() : bool {
		return function_exists( 'is_shop' ) && is_shop();
	}
	/**
	 * Gets a woocommerce shop page id.
	 *
	 * @return int
	 */
	public function get_woo_shop_page_id() : int {
		return get_option( 'woocommerce_shop_page_id' );
	}

	/**
	 * The URI to css.
	 *
	 * If the file exists, it returns a URI, otherwise an empty string.
	 *
	 * @return string
	 */
	public function file_uri() : string {
		$post_id = $this->get_post_id();

		if ( ! $post_id ) {
			return '';
		}
		$post_settings = $this->get_post_meta_post_settings( $post_id );

		if ( empty( $post_settings ) || empty( $post_settings['css_version'] ) ) {
			return '';
		}
		if ( ! empty( $post_settings['google_fonts'] ) ) {
			$array = array(
				'fonts' => $post_settings['google_fonts'],
			);
			if ( ! empty( $post_settings['google_fonts_variants'] ) ) {
				$array['variants'] = $post_settings['google_fonts_variants'];
			}
			// assign uri
			$fonts = new Fonts();

			$this->google_fonts_uri = $fonts->build_google_fonts_uri( $array );

		}
		if ( 'file' === $this->mode() ) {
			return $this->file( 'uri' );

		}
		return '';
	}
	/**
	 * Gets an inline CSS.
	 *
	 * @return string
	 */
	public function get_inline() : string {
		// assign css
		if ( ! isset( $this->inline ) ) {
			$blocks_attr = $this->get_blocks_attr( $this->get_parsed_content() );

			$this->inline = $this->compose( $blocks_attr );

			// assign uri
			$fonts = new Fonts( $blocks_attr );

			$this->google_fonts_uri = $fonts->build_google_fonts_uri();
		}
		return $this->inline;
	}

	/**
	 * Gets the request URI to Google Fonts.
	 *
	 * @return string
	 */
	public function get_google_fonts_uri() : string {
		return $this->google_fonts_uri;
	}
	/**
	 * Determine if we're using file mode or inline mode.
	 *
	 * @return string
	 */
	public function mode() : string {

		// Check if we're using file mode or inline mode.
		// Default to file mode and falback to inline if file mode is not possible.
		$mode = apply_filters( 'scblocks_css_print_method', 'file' );

		if ( is_customize_preview() || is_preview() ) {
			return 'inline';
		}
		// Additional checks for file mode.
		if ( 'file' === $mode && $this->needs_update() ) {
			// Only allow processing 1 file every 5 seconds.
			$current_time = (int) time();
			$last_time    = (int) get_option( 'scblocks_css_write_time' );

			if ( 5 <= ( $current_time - $last_time ) ) {
				// Attempt to write to the file.
				$mode = ( $this->can_write() && $this->write_to_file() ) ? 'file' : 'inline';

				// Does again if the file exists.
				if ( 'file' === $mode ) {
					$mode = ( file_exists( $this->file( 'path' ) ) ) ? 'file' : 'inline';
				}
			}
		}

		return $mode;

	}
	/**
	 * Determines if the CSS file is writable.
	 *
	 * @return bool
	 */
	public function can_write() : bool {
		global $blog_id;
		global $wp_filesystem;

		$this->initialize_wp_filesystem();

		$wp_upload_dir = wp_upload_dir();

		if ( ! $wp_filesystem->is_writable( $wp_upload_dir['basedir'] ) ) {
			return false;
		}

		$file_name   = $this->file_name();
		$folder_path = $wp_upload_dir['basedir'] . '/scblocks';

		// folder does not exists, create it
		if ( ! $wp_filesystem->is_dir( $folder_path ) ) {
			$is_folder = wp_mkdir_p( $folder_path );
			// failed while creating
			if ( ! $is_folder ) {
				return false;
			}
		}
		// folder exists, but is it writable
		if ( ! $wp_filesystem->is_writable( $folder_path ) ) {
			return false;
		}
		// file exists, but is it writable
		if ( $wp_filesystem->is_file( $file_name ) &&
		! $wp_filesystem->is_writable( $file_name ) ) {
			return false;
		}
		return true;
	}
	/**
	 * Tries to write css to a file.
	 *
	 * @return bool True on success, false on failure.
	 */
	public function write_to_file() : bool {
		$post_id = $this->get_post_id();

		$blocks_attr = $this->get_blocks_attr( $this->get_parsed_content() );

		$css = $this->compose( $blocks_attr );

		if ( ! $css ) {
			return false;
		}
		// assign css to prop
		$this->inline = $css;

		// assign uri
		$fonts                  = new Fonts( $blocks_attr );
		$google_fonts_data      = $fonts->get_google_fonts_data();
		$this->google_fonts_uri = $fonts->build_google_fonts_uri();

		// If we only have a little CSS, we should inline it.
		$css_size = strlen( $css );

		if ( $css_size < (int) apply_filters( 'scblocks_max_inline_css', 500 ) ) {
			return false;
		}

		global $wp_filesystem;
		$this->initialize_wp_filesystem();

		// Strip protocols.
		$css = str_replace( array( 'https://', 'http://' ), '//', $css );

		$is_saved = $wp_filesystem->put_contents( $this->file( 'path' ), wp_strip_all_tags( $css ), FS_CHMOD_FILE );
		if ( $is_saved ) {
			$update_time                 = time();
			$settings                    = $this->get_post_meta_post_settings( $post_id );
			$settings['old_update_time'] = $update_time;
			$settings['update_time']     = $update_time;
			$settings['css_version']     = SCBLOCKS_CSS_VERSION;

			if ( ! empty( $google_fonts_data ) && ! empty( $google_fonts_data['fonts'] ) ) {
				$settings['google_fonts'] = $google_fonts_data['fonts'];

				if ( ! empty( $google_fonts_data['variants'] ) ) {
					$settings['google_fonts_variants'] = $google_fonts_data['variants'];
				}
			}
			update_post_meta( $post_id, self::POST_SETTINGS_POST_META_NAME, wp_slash( wp_json_encode( $settings ) ) );
			update_option( 'scblocks_css_write_time', time() );

			// Success!
			return true;

		} else {
			// Fail!
			return false;
		}
	}

	/**
	 * Checks if we need to update the css file.
	 *
	 * @return bool
	 */
	public function needs_update() : bool {
		if ( ! file_exists( $this->file( 'path' ) ) ) {
			return true;
		}
		$post_id = $this->get_post_id();
		if ( ! $post_id ) {
			return false;
		}
		$post_settings = $this->get_post_meta_post_settings( $post_id );

		if ( empty( $post_settings ) ) {
			return false;
		}
		// new css version
		if ( isset( $post_settings['css_version'] ) &&
		SCBLOCKS_CSS_VERSION !== $post_settings['css_version'] ) {
			return true;
		}
		// post has been updated
		if ( $post_settings['old_update_time'] !== $post_settings['update_time'] ) {
			return true;
		}
		$options = get_option( Plugin::OPTION_NAME, array() );
		// check if any reusable block has been updated
		if ( ! empty( $post_settings['reusable_blocks'] ) &&
			$this->is_any_reusable_block_updated( $post_settings['reusable_blocks'], $post_settings['update_time'], $options ) ) {
			return true;
		}
		return false;
	}
	/**
	 * Checks if any reusable block has been updated after updating the post.
	 *
	 * @param array $reusable_blocks
	 * @param int $post_update_time
	 *
	 * @return bool
	 */
	public function is_any_reusable_block_updated( array $reusable_blocks, int $post_update_time, $options ) : bool {

		foreach ( $reusable_blocks as $block_id ) {
			//reusable block updated
			if ( isset( $options[ $block_id ] ) && (int) $post_update_time <= (int) $options[ $block_id ] ) {
				return true;
			}
			// if the reusable block has a reusable block
			$reusable_block_post = get_post( $block_id );
			if ( ! $reusable_block_post || ! isset( $reusable_block_post->post_content ) ) {
				continue;
			}
			$reusable_reusable_blocks = $this->get_reusable_blocks_ids( $reusable_block_post->post_content );
			if ( $this->is_any_reusable_block_updated(
				$reusable_reusable_blocks,
				$post_update_time,
				$options
			) ) {
				return true;
			}
		}
		return false;
	}
	/**
	 * Gets the reusable blocks ids.
	 *
	 * @param string $post_content wp block content
	 *
	 * @return array An array of reusable block id
	 */
	public function get_reusable_blocks_ids( $post_content ) {
		if ( '' === $post_content ) {
			return array();
		}
		$reusable_blocks        = preg_match_all( '/wp:block {"ref":([^}]*)}/', $post_content, $matches );
		$stored_reusable_blocks = array();

		foreach ( $matches[1] as $match ) {
			if ( ! in_array( $match, $stored_reusable_blocks, true ) ) {
				$stored_reusable_blocks[] = $match;
			}
		}
		return $stored_reusable_blocks;
	}

	/**
	 * Updates the _scblocks_post_settings post meta field when a post is saved.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post Post object.
	 */
	public function update_post_settings( int $post_id, \WP_Post $post ) {
		if ( wp_is_post_autosave( $post_id ) ||
			wp_is_post_revision( $post_id ) ||
			! current_user_can( 'edit_post', $post_id ) ||
			'attachment' === $post->post_type ||
			'wp_block' === $post->post_type ) {
			return $post_id;
		}

		$old_settings  = $this->get_post_meta_post_settings( $post_id );
		$next_settings = array();

		$stored_reusable_blocks = $this->get_reusable_blocks_ids( $post->post_content );

		if ( strpos( $post->post_content, 'wp:scblocks' ) !== false ) {
			if ( empty( $old_settings ) ) {
				$next_settings['old_update_time'] = '0';
			} else {
				$next_settings['old_update_time'] = $old_settings['update_time'];
			}
			$next_settings['css_version'] = SCBLOCKS_CSS_VERSION;
			$next_settings['update_time'] = time();
		}
		if ( ! empty( $stored_reusable_blocks ) ) {
			if ( empty( $old_settings ) ) {
				$next_settings['old_update_time'] = '0';
			} else {
				$next_settings['old_update_time'] = $old_settings['update_time'];
			}
			$next_settings['update_time']     = time();
			$next_settings['reusable_blocks'] = $stored_reusable_blocks;
		}
		if ( ! empty( $next_settings ) ) {
			update_post_meta(
				$post_id,
				self::POST_SETTINGS_POST_META_NAME,
				wp_slash( wp_json_encode( $next_settings ) )
			);
		} else {
			delete_post_meta( $post_id, self::POST_SETTINGS_POST_META_NAME );
		}
	}

	/**
	 * Gets and decodes the _scblocks_post_settings post meta field.
	 *
	 * @param int $post_id Post ID.
	 *
	 * @return array
	 */
	public function get_post_meta_post_settings( int $post_id ) : array {
		$value = get_post_meta( $post_id, self::POST_SETTINGS_POST_META_NAME, true );
		if ( $value ) {
			return json_decode( $value, true );
		}
		return array();
	}

	/**
	 * Gets the blocks parsed.
	 *
	 * @return array
	 */
	public function get_parsed_content() : array {
		$post_id = $this->get_post_id();
		if ( ! $post_id ) {
			return array();
		}
		if ( $this->is_woo_shop() ) {
			$post = get_post( $this->get_woo_shop_page_id() );
		} else {
			$post = get_post();
		}
		$blocks = parse_blocks( $post->post_content );
		return $blocks;
	}

	/**
	 * Retrive attributes from blocks.
	 *
	 * @param array $parsed_blocks Array of parsed block objects.
	 * @param array $data Data used when we use recursion.
	 *
	 * @return array
	 */
	public function get_blocks_attr( array $parsed_blocks, array $data = array() ) : array {
		if ( empty( $parsed_blocks ) ) {
			return $data;
		}

		foreach ( $parsed_blocks as $block ) {
			if ( strpos( $block['blockName'], self::BLOCK_NAMESPACE ) === 0 &&
			isset( $block['attrs'] ) &&
			! empty( $block['attrs']['uidClass'] ) ) {
				$data[ $block['blockName'] . ' ' . $block['attrs']['uidClass'] ] = $block['attrs'];
			}
			// reusable block
			if ( 'core/block' === $block['blockName'] &&
			isset( $block['attrs'] ) &&
			! empty( $block['attrs']['ref'] ) ) {
				$reusable_block = get_post( $block['attrs']['ref'] );

				if ( $reusable_block && 'wp_block' === $reusable_block->post_type ) {
					$parsed_reusable_block = parse_blocks( $reusable_block->post_content );

					$data = $this->get_blocks_attr( $parsed_reusable_block, $data );

				}
			}
			// inner blocks
			if ( ! empty( $block['innerBlocks'] ) ) {
				$data = $this->get_blocks_attr( $block['innerBlocks'], $data );
			}
		}
		return $data;
	}

	/**
	 * Composes css.
	 *
	 * @param array $blocks An array of blocks attributes.
	 *
	 * @return string
	 */
	public function compose( array $blocks ) : string {
		$css = array(
			'allDevices' => '',
		);

		$css[ self::DESKTOP_DEVICES ] = '';
		$css[ self::TABLET_DEVICES ]  = '';
		$css[ self::MOBILE_DEVICES ]  = '';

		foreach ( $blocks as $block_name => $block ) {
			if ( empty( $block['css'] ) ) {
				continue;
			}

			$block_name_parts = explode( ' ', $block_name );

			$uid_selector = '.' . $block_name_parts[1];

			$block_name_without_namespace = explode( '/', $block_name_parts[0] )[1];

			foreach ( $block['css'] as $devices => $selectors ) {
				$css[ $devices ] .= $this->compose_selectors( $selectors, $block_name_without_namespace, $uid_selector );
			}
		}
		foreach ( $css as $device_type => $device_css ) {
			if ( $device_css ) {
				if ( self::TABLET_DEVICES === $device_type ) {
					$css[ $device_type ] = '@media(min-width:' . $this->tablet_devices_min_width . ') and (max-width:' . $this->tablet_devices_max_width . '){' . $device_css . '}';
				} elseif ( self::MOBILE_DEVICES === $device_type ) {
					$css[ $device_type ] = '@media(max-width:' . $this->mobile_devices_max_width . '){' . $device_css . '}';
				}
			}
		}
		return $css['allDevices'] . $css[ self::DESKTOP_DEVICES ] . $css[ self::TABLET_DEVICES ] . $css[ self::MOBILE_DEVICES ];
	}

	/**
	 * Composes selectors.
	 *
	 * @param array $selectors Array of selectors.
	 * @param string $block_name Block name.
	 * @param string $uid_selector
	 *
	 * @return string
	 */
	public function compose_selectors( array $selectors, string $block_name, string $uid_selector ) : string {
		$css = '';

		// specificity plus 1
		$additional_selector = '';
		if ( 'column' === $block_name ) {
			$additional_selector = BLOCK_SELECTORS['column']['col'];
		}

		$block_selector = '.scb-' . $block_name . $uid_selector . $additional_selector;

		foreach ( $selectors as $selector_alias => $selector_state ) {
			if ( empty( $selector_state['props'] ) ) {
				continue;
			}
			if ( 'selector' === $selector_alias ) {
				$final_selector = $block_selector;
			} elseif ( 'selector:hover' === $selector_alias ) {
				$final_selector = $block_selector . ':hover';
			} else {
				$next_selector = BLOCK_SELECTORS[ $block_name ][ $selector_alias ];
				if ( preg_match( '/^uidSelector/', $next_selector ) ) {
					$final_selector = $uid_selector . preg_replace( '/^uidSelector/', '', $next_selector );
				} else {
					$final_selector = $block_selector . ' ' . $next_selector;
				}
			}
			$css .= $final_selector . '{' . $this->compose_props( $selector_state['props'] ) . '}';
		}
		return $css;
	}

	/**
	 * Composes properties.
	 *
	 * @param $props
	 *
	 * @return string
	 */
	public function compose_props( array $props ) : string {
		$css = '';

		foreach ( $props as $prop ) {
			$colon_index = strpos( $prop, ':' );
			$name        = substr( $prop, 0, $colon_index );
			$value       = substr( $prop, $colon_index );
			$css        .= $this->standarize_prop_name( $name ) . $value . ';';
		}
		return $css;
	}

	/**
	 * Converts the property to the valid css property.
	 *
	 * @param $name
	 *
	 * @return string
	 */
	public function standarize_prop_name( string $name ) : string {
		if ( strpos( $name, 'Custom' ) !== false ) {
			$n = str_replace( 'Custom', '', $name );
			$n = preg_replace_callback(
				'/[A-Z]/',
				function( $match ) {
					return '-' . strtolower( $match[0] );
				},
				$n
			);
			return '--' . self::BLOCK_NAMESPACE . '-' . $n;
		} else {
			return preg_replace_callback(
				'/[A-Z]/',
				function( $match ) {
					return '-' . strtolower( $match[0] );
				},
				$name
			);
		}
	}
	/**
	 * Gets the css file name
	 *
	 * @param $post_id Optional. Post ID.
	 *
	 * @return string
	 */
	public function file_name( int $post_id = -1 ): string {
		// If this is a multisite installation, append the blogid to the filename.
		$css_blog_id = '';
		if ( is_multisite() && $blog_id > 1 ) {
			$css_blog_id = '_blog-' . $blog_id;
		}
		if ( -1 === $post_id ) {
			$post_id = $this->get_post_id();
		}

		return 'style' . $css_blog_id . '-' . $post_id . '.css';
	}
	/**
	 * Gets the path or url to the stylesheet
	 *
	 * @param string $target path/url.
	 *
	 * @return string
	 */
	public function file( string $target = 'path' ) : string {

		$upload_dir = wp_upload_dir();

		$file_name = $this->file_name();

		$file_path = $upload_dir['basedir'] . '/scblocks/' . $file_name;

		if ( 'path' === $target ) {
			return $file_path;
		} elseif ( 'url' === $target || 'uri' === $target ) {
			$timestamp = '';

			if ( is_file( $file_path ) ) {
				$timestamp = '?ver=' . filemtime( $file_path );
			}
			$css_uri = trailingslashit( $upload_dir['baseurl'] ) . 'scblocks/' . $file_name;
			// Strip protocols.
			$css_uri = str_replace( array( 'https://', 'http://' ), '//', $css_uri );

			return $css_uri . $timestamp;
		}

	}

	/**
	 * Initialize the WordPress filesystem.
	 *
	 * @return void
	 */
	public function initialize_wp_filesystem() {
		global $wp_filesystem;
		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
			WP_Filesystem();
		}
	}
	/**
	 * Updates the update time of a reusable block
	 *
	 * @param int    $post_id The current post ID.
	 * @param WP_Post $post Post object.
	 */

	public function wp_block_update( int $post_id, \WP_Post $post ) {
		if ( wp_is_post_autosave( $post_id ) ||
			wp_is_post_revision( $post_id ) ||
			! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}
		$options = get_option( Plugin::OPTION_NAME, array() );
		if ( strpos( $post->post_content, 'wp:scblocks' ) !== false ) {
			$options[ $post_id ] = time();
		} else {
			unset( $options[ $post_id ] );
		}
		update_option( Plugin::OPTION_NAME, $options );
	}
}
