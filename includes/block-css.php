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
	const BLOCK_NAMESPACE = 'scblocks';

	/** @var string */
	const POST_SETTINGS_POST_META_NAME = '_scblocks_post_settings';


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
			$id = $this->woo_shop_page_id();
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
	public function woo_shop_page_id() : int {
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
		$post_settings = $this->post_settings( $post_id );

		if ( empty( $post_settings ) || empty( $post_settings['update_time'] ) ) {
			return '';
		}
		if ( 'file' === $this->mode() ) {
			return $this->file( 'uri' );

		}
		return '';
	}

	/**
	 * Get google fonts uri.
	 *
	 * @since 1.1.0
	 *
	 * @return string
	 */
	public function google_fonts_uri() : string {
		$post_id = $this->get_post_id();

		if ( ! $post_id ) {
			return '';
		}
		$post_settings = $this->post_settings( $post_id );

		if ( empty( $post_settings ) ) {
			return '';
		}
		$blocks_attr = $this->blocks_attrs( $this->parsed_content() );

		$fonts = new Fonts( $blocks_attr );

		return $fonts->build_google_fonts_uri();
	}

	/**
	 * Gets an inline CSS.
	 *
	 * @since 1.1.0
	 *
	 * @return string
	 */
	public function inline() : string {
		if ( Plugin::css_mode() === 'empty' ) {
			return '';
		}
		if ( Plugin::css_mode() === 'tiny_css' ) {
			return Plugin::css();
		}
		if ( Plugin::css_mode() === 'write_to_file_fail' ) {
			return Plugin::css();
		}
		if ( Plugin::css_mode() === 'inline' ) {
			$blocks_attr = $this->blocks_attrs( $this->parsed_content() );

			$css_composer = new Css();

			$css = $css_composer->compose( $blocks_attr );
			if ( $css ) {
				$initial_css = new Initial_Css();

				$css = $initial_css->get() . $css;
			}
			return $css;
		}
		return '';
	}

	/**
	 * Determine if we're using file mode or inline mode.
	 *
	 * @return string
	 */
	public function mode() : string {
		$mode = Plugin::option( 'css_print_method' );

		if ( is_customize_preview() || is_preview() ||
		// inline CSS for AMP
		( function_exists( 'amp_is_request' ) && amp_is_request() ) ) {
			Plugin::set_css_mode( 'inline' );
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
		Plugin::set_css_mode( $mode );
		return $mode;

	}
	/**
	 * Determines if the CSS file is writable.
	 *
	 * @return bool
	 */
	public function can_write() : bool {
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

		$blocks_attr = $this->blocks_attrs( $this->parsed_content() );

		$css_composer = new Css();

		$css = $css_composer->compose( $blocks_attr );

		if ( ! $css ) {
			Plugin::set_css_mode( 'empty' );
			return false;
		}
		$initial_css = new Initial_Css();

		$css = $initial_css->get() . $css;

		// If we only have a little CSS, we should inline it.
		$css_size = strlen( $css );

		if ( $css_size < (int) apply_filters( 'scblocks_max_inline_css', 500 ) ) {
			Plugin::memorize_css( $css );
			Plugin::set_css_mode( 'tiny_css' );
			return false;
		}

		global $wp_filesystem;
		$this->initialize_wp_filesystem();

		$is_saved = $wp_filesystem->put_contents( $this->file( 'path' ), wp_strip_all_tags( $css ), FS_CHMOD_FILE );
		if ( $is_saved ) {
			$update_time                 = time();
			$settings                    = $this->post_settings( $post_id );
			$settings['old_update_time'] = $update_time;
			$settings['update_time']     = $update_time;
			$settings['css_version']     = SCBLOCKS_VERSION;

			update_post_meta( $post_id, self::POST_SETTINGS_POST_META_NAME, wp_slash( wp_json_encode( $settings ) ) );

			Plugin::update_css_write_time();

			Plugin::set_css_mode( 'file' );

			// Success!
			return true;

		} else {
			// Fail to write
			Plugin::memorize_css( $css );
			Plugin::set_css_mode( 'write_to_file_fail' );
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
		$post_settings = $this->post_settings( $post_id );

		if ( empty( $post_settings ) ) {
			return false;
		}
		// force css file update
		if ( isset( $post_settings['update_time'] ) &&
		(int) Plugin::option( 'force_regenerate_css_files' ) >= (int) $post_settings['update_time'] ) {
			return true;
		}
		// new css version
		if ( isset( $post_settings['css_version'] ) &&
		SCBLOCKS_VERSION !== $post_settings['css_version'] ) {
			return true;
		}
		// post has been updated
		if ( isset( $post_settings['update_time'] ) && $post_settings['old_update_time'] !== $post_settings['update_time'] ) {
			return true;
		}
		// check if any reusable block has been updated
		if ( isset( $post_settings['update_time'] ) &&
		(int) Plugin::option( 'reusable_blocks_update_time' ) >= (int) $post_settings['update_time'] ) {
			return true;

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
			'wp_block' === $post->post_type ) {
			return $post_id;
		}

		$old_settings  = $this->post_settings( $post_id );
		$next_settings = array();

		$next_settings['old_update_time'] = $old_settings['update_time'] ?? '0';

		if ( strpos( $post->post_content, 'wp:scblocks' ) !== false ) {

			$next_settings['css_version'] = SCBLOCKS_VERSION;
			$next_settings['update_time'] = time();
		}
		if ( strpos( $post->post_content, 'wp:block' ) !== false ) {

			$next_settings['update_time'] = time();
			$next_settings['css_version'] = SCBLOCKS_VERSION;
		}

		update_post_meta(
			$post_id,
			self::POST_SETTINGS_POST_META_NAME,
			wp_slash( wp_json_encode( $next_settings ) )
		);
	}

	/**
	 * Gets and decodes the _scblocks_post_settings post meta field.
	 *
	 * @param int $post_id Post ID.
	 *
	 * @return array
	 */
	public function post_settings( int $post_id ) : array {
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
	public function parsed_content() : array {
		$post_id = $this->get_post_id();
		if ( ! $post_id ) {
			return array();
		}
		if ( $this->is_woo_shop() ) {
			$post = get_post( $this->woo_shop_page_id() );
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
	public function blocks_attrs( array $parsed_blocks, array $data = array() ) : array {
		if ( empty( $parsed_blocks ) ) {
			return $data;
		}

		foreach ( $parsed_blocks as $block ) {
			if ( isset( $block['blockName'] ) && strpos( $block['blockName'], self::BLOCK_NAMESPACE ) === 0 && isset( $block['attrs'] ) ) {
				$block_name = explode( '/', $block['blockName'] )[1];

				$data[ $block_name ][] = $block['attrs'];

				Plugin::set_is_active_block( $block_name );
				if ( 'heading' === $block_name || 'button' === $block_name ) {
					Plugin::set_is_active_block( 'icon' );
				}
			}
			// reusable block
			if ( isset( $block['blockName'] ) && 'core/block' === $block['blockName'] && isset( $block['attrs'] ) && ! empty( $block['attrs']['ref'] ) ) {
				$reusable_block = get_post( $block['attrs']['ref'] );

				if ( $reusable_block && 'wp_block' === $reusable_block->post_type ) {
					$parsed_reusable_block = parse_blocks( $reusable_block->post_content );

					$data = $this->blocks_attrs( $parsed_reusable_block, $data );

				}
			}
			// inner blocks
			if ( ! empty( $block['innerBlocks'] ) ) {
				$data = $this->blocks_attrs( $block['innerBlocks'], $data );
			}
		}
		return $data;
	}

	/**
	 * Gets the css file name
	 *
	 * @param $post_id Optional. Post ID.
	 *
	 * @return string
	 */
	public function file_name( int $post_id = -1 ): string {
		global $blog_id;
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

			$css_uri = set_url_scheme( $css_uri );

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
	 * Updates the update time of a reusable block.
	 *
	 * @param int       $post_id The current post ID.
	 * @param WP_Post   $post Post object.
	 */
	public function wp_block_update( int $post_id, \WP_Post $post ) {
		if ( wp_is_post_autosave( $post_id ) ||
			wp_is_post_revision( $post_id ) ||
			! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		$options = Plugin::options();

		if ( strpos( $post->post_content, 'wp:scblocks' ) !== false ) {
			$options['reusable_blocks_update_time'] = time();
		}

		// deprecated since 1.2.0
		unset( $options['wp_block_update_time'] );
		unset( $options['wp_block_in_wp_block'] );
		Plugin::update_options( $options );
	}
}
