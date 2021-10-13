<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Updates blocks metadata.
 *
 * @since 1.3.0
 */
class Update_Blocks_Metadata {
	/**
	 * Hooks a function on to a specific action.
	 *
	 * @since 1.3.0
	 */
	public function register_actions() {
		add_action( 'save_post', array( $this, 'update_post_settings' ), 10, 2 );
		add_action( 'save_post_wp_block', array( $this, 'wp_block_update' ), 10, 2 );
	}

	/**
	 * Updates the _scblocks_post_settings post meta field when a post is saved.
	 *
	 * @since 1.3.0
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

		$settings = Plugin::post_settings_post_meta( $post_id );

		$settings['old_update_time'] = $settings['update_time'] ?? '0';

		if ( strpos( $post->post_content, 'wp:scblocks' ) !== false ) {

			$settings['css_version'] = SCBLOCKS_VERSION;
			$settings['update_time'] = Plugin::get_microtime();
		}
		if ( strpos( $post->post_content, 'wp:block' ) !== false ) {

			$settings['update_time'] = Plugin::get_microtime();
			$settings['css_version'] = SCBLOCKS_VERSION;
		}

		Plugin::update_post_settings_post_meta( $post_id, $settings );
	}

	/**
	 * Updates the update time of a reusable block.
	 *
	 * @since 1.3.0
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
			$options['reusable_blocks_update_time'] = Plugin::get_microtime();
		}

		// deprecated since 1.2.0
		unset( $options['wp_block_update_time'] );
		unset( $options['wp_block_in_wp_block'] );
		Plugin::update_options( $options );
	}
}
