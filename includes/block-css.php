<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Creates and manages CSS
 */
class Block_Css {

	/** @var string DESKTOP_DEVICES */
	const DESKTOP_DEVICES = 'Desktop';

	/** @var string TABLET_DEVICES */
	const TABLET_DEVICES = 'Tablet';

	/** @var string MOBILE_DEVICES */
	const MOBILE_DEVICES = 'Mobile';

	/** @var string BLOCK_NAMESPACE */
	const BLOCK_NAMESPACE = 'scblocks';

	/** @var string POST_SETTINGS_POST_META_NAME */
	const POST_SETTINGS_POST_META_NAME = '_scblocks_post_settings';

	/** @var string $tablet_devices_max_width */
	public $tablet_devices_max_width = '1024px';

	/** @var string $tablet_devices_min_width */
	public $tablet_devices_min_width = '768px';

	/** @var string $mobile_devices_max_width */
	public $mobile_devices_max_width = '767px';


	public function __construct() {
		add_option( 'scblocks_css_write_time', time() );
	}

	/**
	 * Hooks a function on to a specific action.
	 */
	public function register_actions() {
		add_action( 'save_post', array( $this, 'update_post_settings' ), 10, 2 );
		add_action( 'save_post_wp_block', array( $this, 'save_wp_block' ), 10, 2 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_css' ) );
		add_action( 'wp_head', array( $this, 'print_inline_css' ) );
	}
	/**
	 * Get the current page ID.
	 *
	 * @static
	 *
	 * @return int
	 */
	public static function get_post_id() : int {
		global $post;
		$id = 0;

		if ( isset( $post ) && is_singular() ) {
			$id = $post->ID;
		}
		if ( self::is_woo_shop() ) {
			$id = self::get_woo_shop_page_id();
		}
		if ( is_home() ) {
			$id = get_option( 'page_for_posts' );
		}

		return (int) $id;
	}
	/**
	 * Checks if there is a woocommerce shop page.
	 *
	 * @static
	 *
	 * @return bool
	 */
	public static function is_woo_shop() : bool {
		return function_exists( 'is_shop' ) && is_shop();
	}
	/**
	 * Gets a woocommerce shop page id.
	 *
	 * @static
	 *
	 * @return int
	 */
	public static function get_woo_shop_page_id() : int {
		return get_option( 'woocommerce_shop_page_id' );
	}

	/**
	 * Enqueue CSS from file.
	 */
	public function enqueue_css() {
		$post_id = self::get_post_id();

		if ( ! $post_id ) {
			return;
		}
		$post_settings = self::get_post_meta_post_settings( $post_id );

		if ( empty( $post_settings ) || empty( $post_settings['css_version'] ) ) {
			return;
		}
		if ( 'file' === $this->mode() ) {
			wp_enqueue_style( 'scblocks-blocks', esc_url( $this->file( 'uri' ) ), array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		}
	}
	/**
	 * Print an inline CSS.
	 */
	public function print_inline_css() {

		if ( 'inline' === $this->mode() || ! wp_style_is( 'scblocks-blocks', 'enqueued' ) ) {
			$css = $this->compose_css( $this->get_blocks_attr( $this->get_parsed_content() ) );

			if ( ! empty( $css ) ) {
				printf(
					'<style id="scblocks-blocks-css">%s</style>',
					wp_strip_all_tags( $css ) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				);
			}
		}
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
				$mode = ( $this->can_write() && $this->make_css() ) ? 'file' : 'inline';

				// Does again if the file exists.
				if ( 'file' === $mode ) {
					$mode = ( file_exists( $this->file( 'path' ) ) ) ? 'file' : 'inline';
				}
			}
		}

		return $mode;

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
		$post_id = self::get_post_id();
		if ( ! $post_id ) {
			return false;
		}
		$post_settings = self::get_post_meta_post_settings( $post_id );

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
		// check if any reusable block has been updated
		if ( isset( $post_settings['reusable_blocks'] ) &&
			$this->is_any_reusable_block_updated( $post_settings['reusable_blocks'], $post_settings['update_time'] ) ) {
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
	public function is_any_reusable_block_updated( array $reusable_blocks, int $post_update_time ) : bool {
		foreach ( $reusable_blocks as $block_id ) {
			$reusable_block_settings = self::get_post_meta_post_settings( $block_id );
			// post doesn't have our blocks
			if ( empty( $reusable_block_settings ) ) {
				continue;
			}
			//reusable block updated
			if ( (int) $post_update_time <= (int) $reusable_block_settings['update_time'] ) {
				return true;
			}
			// if the reusable block has a reusable block
			if ( ! empty( $reusable_block_settings['reusable_blocks'] ) &&
			$this->is_any_reusable_block_updated( $reusable_block_settings['reusable_blocks'], $post_update_time ) ) {
				return true;
			}
		}
		return false;
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
			'' === $post->post_content ) {
			return $post_id;
		}

		$old_settings  = self::get_post_meta_post_settings( $post_id );
		$next_settings = array();

		$reusable_blocks        = preg_match_all( '/wp:block {"ref":([^}]*)}/', $post->post_content, $matches );
		$stored_reusable_blocks = array();

		foreach ( $matches[1] as $match ) {
			if ( ! in_array( $match, $stored_reusable_blocks, true ) ) {
				$stored_reusable_blocks[] = $match;
			}
		}

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
	 * @static
	 *
	 * @param int $post_id Post ID.
	 *
	 * @return array
	 */
	public static function get_post_meta_post_settings( int $post_id ) : array {
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
		$post_id = self::get_post_id();
		if ( ! $post_id ) {
			return array();
		}
		if ( self::is_woo_shop() ) {
			$post = get_post( self::get_woo_shop_page_id() );
		} else {
			$post = get_post();
		}
		$blocks = parse_blocks( $post->post_content );
		return $blocks;
	}
	/**
	 * Creates a css and tries to save to the file.
	 *
	 * @return bool True on success, false on failure.
	 */
	public function make_css() : bool {
		$post_id = self::get_post_id();
		if ( ! $post_id ) {
			return false;
		}
		$css = $this->compose_css( $this->get_blocks_attr( $this->get_parsed_content() ) );

		if ( ! $css ) {
			return false;
		}

		// If we only have a little CSS, we should inline it.
		$css_size = strlen( $css );

		if ( $css_size < (int) apply_filters( 'scblocks_max_inline_css', 500 ) ) {
			return false;
		}

		global $wp_filesystem;

		// Initialize the WordPress filesystem.
		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
			WP_Filesystem();
		}

		// Strip protocols.
		$css = str_replace( 'https://', '//', $css );
		$css = str_replace( 'http://', '//', $css );

		if ( is_writable( $this->file( 'path' ) ) ||
		( ! file_exists( $this->file( 'path' ) ) && is_writable( dirname( $this->file( 'path' ) ) ) ) ) {

			if ( ! $wp_filesystem->put_contents( $this->file( 'path' ), wp_strip_all_tags( $css ), FS_CHMOD_FILE ) ) {
				// Fail!
				return false;

			} else {
				$update_time                 = time();
				$settings                    = self::get_post_meta_post_settings( $post_id );
				$settings['old_update_time'] = $update_time;
				$settings['update_time']     = $update_time;
				$settings['css_version']     = SCBLOCKS_CSS_VERSION;
				update_post_meta( $post_id, self::POST_SETTINGS_POST_META_NAME, wp_slash( wp_json_encode( $settings ) ) );
				update_option( 'scblocks_css_write_time', time() );

				// Success!
				return true;
			}
		}
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
			! empty( $block['attrs']['css'] ) &&
			! empty( $block['attrs']['uidClass'] ) ) {
				$data[ $block['blockName'] . ' ' . $block['attrs']['uidClass'] ] = $block['attrs']['css'];
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
	 * @param array $blocks An array of blocks with their attributes.
	 *
	 * @return string
	 */
	public function compose_css( array $blocks ) : string {
		$css = array(
			'allDevices' => '',
		);

		$css[ self::DESKTOP_DEVICES ] = '';
		$css[ self::TABLET_DEVICES ]  = '';
		$css[ self::MOBILE_DEVICES ]  = '';

		foreach ( $blocks as $block_name => $block_css ) {
			// prepare a leading selector
			$block_name_parts = explode( ' ', $block_name );
			$block_selector   = '.' . str_replace( '/', '-', $block_name_parts[0] ) . '.' . $block_name_parts[1];

			foreach ( $block_css as $devices => $selectors ) {
				$css[ $devices ] .= $this->compose_selectors( $selectors, $block_selector );
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
	 * @param string $block_selector Block leading selector.
	 *
	 * @return string
	 */
	public function compose_selectors( array $selectors, string $block_selector ) : string {
		$css = '';

		foreach ( $selectors as $selector => $selector_state ) {
			if ( empty( $selector_state['props'] ) ) {
				continue;
			}
			if ( 'selector' === $selector ) {
				$final_selector = $block_selector;
			} elseif ( 'selector:hover' === $selector ) {
				$final_selector = $block_selector . ':hover';
			} else {
				$final_selector = $block_selector . ' ' . $selector;
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
	 * Gets the css path or url to the stylesheet
	 *
	 * @param string $target path/url.
	 *
	 * @return string
	 */
	public function file( string $target = 'path' ) : string {

		global $blog_id;

		$upload_dir = wp_upload_dir();

		// If this is a multisite installation, append the blogid to the filename.
		$css_blog_id = '';
		if ( is_multisite() && $blog_id > 1 ) {
			$css_blog_id = '_blog-' . $blog_id;
		}
		$post_id = self::get_post_id();

		$file_name = 'style' . $css_blog_id . '-' . $post_id . '.css';

		$file_path = $upload_dir['basedir'] . DIRECTORY_SEPARATOR . 'scblocks' . DIRECTORY_SEPARATOR . $file_name;

		$css_uri = trailingslashit( $upload_dir['baseurl'] ) . 'scblocks/' . $file_name;

		// Strip protocols.
		$css_uri = str_replace( 'https://', '//', $css_uri );
		$css_uri = str_replace( 'http://', '//', $css_uri );

		if ( 'path' === $target ) {
			return $file_path;
		} elseif ( 'url' === $target || 'uri' === $target ) {
			$timestamp = '';

			if ( file_exists( $file_path ) ) {
				$timestamp = '?ver=' . filemtime( $file_path );
			}
			return $css_uri . $timestamp;
		}

	}

	/**
	 * Determines if the CSS file is writable.
	 *
	 * @return bool
	 */
	public function can_write() : bool {

		global $blog_id;

		// Get the upload directory for this site.
		$upload_dir = wp_upload_dir();

		// If this is a multisite installation, append the blogid to the filename.
		$css_blog_id = ( is_multisite() && $blog_id > 1 ) ? '_blog-' . $blog_id : null;
		$post_id     = self::get_post_id();

		if ( ! $post_id ) {
			return false;
		}

		$file_name   = '/style' . $css_blog_id . '-' . $post_id . '.css';
		$folder_path = $upload_dir['basedir'] . DIRECTORY_SEPARATOR . 'scblocks';

		// Does the folder exist?
		if ( file_exists( $folder_path ) ) {
			// Folder exists, but is the folder writable?
			if ( ! is_writable( $folder_path ) ) {
				// Folder is not writable.
				// Does the file exist?
				if ( ! file_exists( $folder_path . $file_name ) ) {
					// File does not exist, therefore it can't be created
					// since the parent folder is not writable.
					return false;
				} else {
					// File exists, but is it writable?
					if ( ! is_writable( $folder_path . $file_name ) ) {
						// Nope, it's not writable.
						return false;
					}
				}
			} else {
				// The folder is writable.
				// Does the file exist?
				if ( file_exists( $folder_path . $file_name ) ) {
					// File exists.
					// Is it writable?
					if ( ! is_writable( $folder_path . $file_name ) ) {
						// Nope, it's not writable.
						return false;
					}
				}
			}
		} else {
			// Can we create the folder?
			// returns true if yes and false if not.
			return wp_mkdir_p( $folder_path );
		}

		// all is well!
		return true;

	}
}

