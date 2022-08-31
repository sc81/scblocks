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
	 * Return a larger numeric value each time.
	 *
	 * @since 1.3.0
	 *
	 * @return int
	 */
	public function get_number():int {
		static $number = 0;
		$number++;
		return $number;
	}

	/**
	 * Hooks a function on to a specific action.
	 *
	 * @since 1.3.0
	 */
	public function register_actions() {
		add_action( 'save_post', array( $this, 'update_post_settings' ), 10, 2 );
		add_action( 'save_post_wp_block', array( $this, 'wp_block_update' ), 10, 2 );
		add_action( 'wp_insert_post_data', array( $this, 'set_uid_class_on_save' ), 10, 2 );
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
	 * Set uidClass for our blocks when saving the post.
	 *
	 * @since 1.3.0
	 *
	 * @param array $data An array of slashed, sanitized, and processed post data.
	 * @param array $postarr An array of sanitized (and slashed) but otherwise unmodified post data.
	 *
	 * @return array
	 */
	public function set_uid_class_on_save( array $data, array $postarr ) : array {
		if ( empty( $data['post_content'] ) ) {
			return $data;
		}
		$blocks = parse_blocks( wp_unslash( $data['post_content'] ) );

		$this->update_uid_class( $blocks, $postarr['ID'] );

		$blocks = apply_filters( 'scblocks_update_uid_class', $blocks, $postarr['ID'] );

		$data['post_content'] = wp_slash( serialize_blocks( $blocks ) );

		return $data;
	}
	/**
	 * Update uidClass for blocks.
	 *
	 * @since 1.3.0
	 *
	 * @param array &$blocks
	 * @param int $post_id
	 * @param string $parent_uid_class
	 *
	 * @return void
	 */
	public function update_uid_class( array &$blocks, int $post_id, string $parent_uid_class = '' ) {
		$uid_class = '';
		foreach ( $blocks as $index => $block ) {
			if ( isset( $block['blockName'] ) &&
			strpos( $block['blockName'], Plugin::BLOCK_NAMESPACE ) === 0 &&
			isset( $block['attrs'] ) ) {
				$uid_class = $this->get_uid_class( $post_id );

				$blocks[ $index ]['attrs']['uidClass'] = $uid_class;
				if ( $parent_uid_class ) {
					$blocks[ $index ]['attrs']['itemClass'] = $parent_uid_class . '-item';
				}
			}
			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->update_uid_class( $blocks[ $index ]['innerBlocks'], $post_id, $uid_class );
			}
		}
	}
	/**
	 * Create a uidClass for the block.
	 *
	 * @since 1.3.0
	 *
	 * @param int $post_id
	 *
	 * @return string
	 */
	public function get_uid_class( int $post_id ) : string {
		return 'scb-' . $post_id . '-' . $this->get_number();
	}
}
