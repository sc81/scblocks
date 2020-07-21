<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// see https://github.com/tomusborne/generateblocks/blob/master/includes/class-enqueue-css.php

class Css_Manager {
	const DESKTOP_DEVICES = 'Desktop';
	const TABLET_DEVICES  = 'Tablet';
	const MOBILE_DEVICES  = 'Mobile';

	const BLOCK_NAMESPACE              = 'scblocks';
	const POST_SETTINGS_POST_META_NAME = '_scblocks_post_settings';

	public $tablet_devices_max_width = '1024px';
	public $tablet_devices_min_width = '768px';
	public $mobile_devices_max_width = '767px';


	public function __construct() {
		add_option( 'scblocks_css_write_time', time() );
	}
	public function register_actions() {
		add_action( 'save_post', array( $this, 'save_post' ), 10, 2 );
		add_action( 'save_post_wp_block', array( $this, 'save_wp_block' ), 10, 2 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_css' ) );
		add_action( 'wp_head', array( $this, 'print_inline_css' ) );
	}
	/**
	 * Get the current page ID.
	 */
	public function get_post_id() {

		global $post;

		$id = isset( $post ) ? $post->ID : false;
		$id = ( ! is_singular() ) ? false : $id;
		$id = ( function_exists( 'is_shop' ) && is_shop() ) ? get_option( 'woocommerce_shop_page_id' ) : $id;
		$id = ( is_home() ) ? get_option( 'page_for_posts' ) : $id;

		return $id;

	}
	/**
	 * Enqueue CSS from file.
	 */
	public function enqueue_css() {
		$post_id = $this->get_post_id();

		if ( ! $post_id ) {
			return;
		}
		$post_settings = $this->get_post_meta_post_settings( $post_id );

		if ( empty( $post_settings ) || empty( $post_settings['css_version'] ) ) {
			return false;
		}
		if ( 'file' === $this->mode() ) {
			wp_enqueue_style( 'scblocks', esc_url( $this->file( 'uri' ) ), array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		}
	}
	/**
	 * Print an inline CSS.
	 */
	public function print_inline_css() {

		if ( 'inline' === $this->mode() || ! wp_style_is( 'scblocks', 'enqueued' ) ) {
			$css = $this->compose_css( $this->get_blocks_attr( $this->get_parsed_content() ) );

			if ( empty( $css ) ) {
				return;
			}
			printf(
				'<style id="scblocks-css">%s</style>',
				wp_strip_all_tags( $css ) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			);
		}
	}
	/**
	 * Determine if we're using file mode or inline mode.
	 */
	public function mode() {

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
	public function needs_update() {
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
		if ( isset( $post_settings['css_version'] ) &&
		SCBLOCKS_CSS_VERSION !== $post_settings['css_version'] ) {
			return true;
		}
		if ( $post_settings['old_update_time'] !== $post_settings['update_time'] ) {
			return true;
		}
		if ( isset( $post_settings['reusable_blocks'] ) &&
			$this->is_any_reusable_block_updated( $post_settings['reusable_blocks'], $post_settings['update_time'] ) ) {
			return true;
		}
		return false;
	}

	public function is_any_reusable_block_updated( $reusable_blocks, $post_update_time ) {
		foreach ( $reusable_blocks as $block_id ) {
			$reusable_block_settings = $this->get_post_meta_post_settings( $block_id );
			// post doesn't have our blocks
			if ( empty( $reusable_block_settings ) ) {
				continue;
			}
			if ( (int) $post_update_time <= (int) $reusable_block_settings['update_time'] ) {
				return true;
			}
			if ( ! empty( $reusable_block_settings['reusable_blocks'] ) &&
			$this->is_any_reusable_block_updated( $reusable_block_settings['reusable_blocks'], $post_update_time ) ) {
				return true;
			}
		}
		return false;
	}

	public function save_post( $post_id, $post ) {
		if ( wp_is_post_autosave( $post_id ) ||
			wp_is_post_revision( $post_id ) ||
			! current_user_can( 'edit_post', $post_id ) ||
			'attachment' === $post->post_type ||
			! isset( $post->post_content ) ||
			'' === $post->post_content ) {
			return $post_id;
		}

		$post_settings = $this->get_post_meta_post_settings( $post_id );

		$reusable_blocks        = preg_match_all( '/wp:block {"ref":([^}]*)}/', $post->post_content, $matches );
		$stored_reusable_blocks = array();

		foreach ( $matches[1] as $match ) {
			if ( ! in_array( $match, $stored_reusable_blocks, true ) ) {
				$stored_reusable_blocks[] = $match;
			}
		}

		if ( isset( $post->post_content ) && strpos( $post->post_content, 'wp:scblocks' ) !== false ) {
			if ( empty( $post_settings ) ) {
				$post_settings['old_update_time'] = '0';
			}
			$post_settings['css_version'] = SCBLOCKS_CSS_VERSION;
			$post_settings['update_time'] = time();
		}
		if ( ! empty( $stored_reusable_blocks ) ) {
			if ( empty( $post_settings ) ) {
				$post_settings['old_update_time'] = '0';
			}
			$post_settings['update_time']     = time();
			$post_settings['reusable_blocks'] = $stored_reusable_blocks;
		}
		if ( ! empty( $post_settings ) ) {
			update_post_meta(
				$post_id,
				self::POST_SETTINGS_POST_META_NAME,
				wp_slash( wp_json_encode( $post_settings ) )
			);
		} else {
			delete_post_meta( $post_id, self::POST_SETTINGS_POST_META_NAME );
		}
	}

	public function get_post_meta_post_settings( $post_id ) {
		$value = get_post_meta( $post_id, self::POST_SETTINGS_POST_META_NAME, true );
		if ( $value ) {
			return json_decode( $value, true );
		}
		return array();
	}

	public function get_parsed_content() {
		$post   = get_post();
		$blocks = parse_blocks( $post->post_content );
		return $blocks;
	}
	/**
	 * Make our CSS.
	 */
	public function make_css() {
		$post_id = $this->get_post_id();
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
				$settings                    = $this->get_post_meta_post_settings( $post_id );
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
	public function get_blocks_attr( $parsed_blocks, $data = array() ) {
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

	public function prepare_leading_selector( $block_name ) {
		$block_name_parts = explode( ' ', $block_name );

		$prefix = '';
		if ( self::BLOCK_NAMESPACE . '/column' === $block_name_parts[0] ) {
			$prefix = '.' . self::BLOCK_NAMESPACE . '-columns ';
		}
		return $prefix . '.' . str_replace( '/', '-', $block_name_parts[0] ) . '.' . $block_name_parts[1];
	}

	public function compose_css( $blocks ) {
		$css = array(
			'allDevices' => '',
		);

		$css[ self::DESKTOP_DEVICES ] = '';
		$css[ self::TABLET_DEVICES ]  = '';
		$css[ self::MOBILE_DEVICES ]  = '';

		foreach ( $blocks as $block_name => $block_css ) {
			$block_selector = $this->prepare_leading_selector( $block_name );

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
	public function compose_selectors( $selectors, $block_selector ) {
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
	public function compose_props( $props ) {
		$css = '';

		foreach ( $props as $prop ) {
			$colon_index = strpos( $prop, ':' );
			$name        = substr( $prop, 0, $colon_index );
			$value       = substr( $prop, $colon_index );
			$css        .= $this->standarize_prop_name( $name ) . $value . ';';
		}
		return $css;
	}
	public function standarize_prop_name( $name ) {
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
	 */
	public function file( $target = 'path' ) {

		global $blog_id;

		$upload_dir = wp_upload_dir();

		// If this is a multisite installation, append the blogid to the filename.
		$css_blog_id = '';
		if ( is_multisite() && $blog_id > 1 ) {
			$css_blog_id = '_blog-' . $blog_id;
		}
		$post_id = $this->get_post_id();

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
	 */
	public function can_write() {

		global $blog_id;

		// Get the upload directory for this site.
		$upload_dir = wp_upload_dir();

		// If this is a multisite installation, append the blogid to the filename.
		$css_blog_id = ( is_multisite() && $blog_id > 1 ) ? '_blog-' . $blog_id : null;
		$post_id     = $this->get_post_id();

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

