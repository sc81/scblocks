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
		add_action( 'save_post', array( $this, 'change_uid_class_on_save' ), 100, 2 );
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

	/**
	 * Change the uidClass of all our blocks when saving the post.
	 *
	 * @since 1.3.0
	 *
	 * @param int $post_id
	 * @param \WP_Post $post
	 *
	 * @return void
	 */
	public function change_uid_class_on_save( int $post_id, \WP_Post $post ) {
		if ( ! current_user_can( 'edit_post', $post_id ) || ! $post->post_content ) {
			return;
		}
		$blocks = parse_blocks( $post->post_content );
		$this->update_uid_class( $blocks, $post_id );
		$content = serialize_blocks( $blocks );

		remove_action( 'save_post', array( $this, 'change_uid_class_on_save' ), 100, 2 );

		wp_update_post(
			array(
				'ID'           => $post_id,
				'post_content' => $content,
			)
		);

		add_action( 'save_post', array( $this, 'change_uid_class_on_save' ), 100, 2 );
	}
	/**
	 * Update uidClass for blocks.
	 *
	 * @since 1.3.0
	 *
	 * @param array $blocks
	 * @param int $post_id
	 *
	 * @return void
	 */
	public function update_uid_class( array &$blocks, int $post_id ) {
		foreach ( $blocks as $index => $block ) {
			if ( isset( $block['blockName'] ) &&
			strpos( $block['blockName'], Plugin::BLOCK_NAMESPACE ) === 0 &&
			isset( $block['attrs'] ) ) {

				$blocks[ $index ]['attrs']['uidClass'] = $this->create_uid_class( $block['blockName'], $post_id );
			}
			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->update_uid_class( $blocks[ $index ]['innerBlocks'], $post_id );
			}
		}
	}
	/**
	 * Create a uidClass for the block.
	 *
	 * @since 1.3.0
	 *
	 * @param string $block_name
	 * @param int $post_id
	 *
	 * @return string
	 */
	public function create_uid_class( string $block_name, int $post_id ) : string {
		$block_name = explode( '/', $block_name )[1];
		return 'scb-' . $block_name . '-' . $post_id . bin2hex( random_bytes( 4 ) );
	}
}
