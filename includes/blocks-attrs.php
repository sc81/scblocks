<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Extract blocks attributes needed to build styles.
 *
 * @since 1.3.0
 */
class Blocks_Attrs {

	/**
	 * Blocks attributes.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	private $attrs = array();

	/**
	 * Stores reusable block ids.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	private $wp_block_ids = array();

	/**
	 * Get attributes of extracted blocks.
	 *
	 * @param array $parsed_blocks
	 * @since 1.3.0
	 * @return array
	 */
	public function get( array $parsed_blocks ): array {
		$this->extract( $parsed_blocks );
		return $this->attrs;
	}

	/**
	 * Extract blocks attributes.
	 *
	 * @param array $parsed_blocks
	 * @since 1.3.0
	 * @return void
	 */
	private function extract( array $parsed_blocks ) {
		foreach ( $parsed_blocks as $block ) {
			if ( ! is_array( $block ) || ! isset( $block['blockName'] ) ) {
				continue;
			}
			if ( strpos( $block['blockName'], Plugin::BLOCK_NAMESPACE ) === 0 && isset( $block['attrs'] ) ) {

				$this->attrs[] = array(
					'name'  => $block['blockName'],
					'attrs' => $block['attrs'],
				);

				do_action( 'scblocks_collecting_block_attrs', $block );

				$this->attrs = apply_filters( 'scblocks_blocks_attrs', $this->attrs, $block );
			}
			// reusable block
			if ( 'core/block' === $block['blockName'] && ! empty( $block['attrs']['ref'] )
                    // phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
					&& ! in_array( $block['attrs']['ref'], $this->wp_block_ids ) ) {
					$reusable_block = get_post( $block['attrs']['ref'] );

				if ( $reusable_block && 'wp_block' === $reusable_block->post_type && 'publish' === $reusable_block->post_status ) {
					$parsed_reusable_block = parse_blocks( $reusable_block->post_content );

					if ( ! empty( $parsed_reusable_block ) ) {
						$this->wp_block_ids[] = $block['attrs']['ref'];
						$this->extract( $parsed_reusable_block );
					}
				}
			}
			// inner blocks
			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->extract( $block['innerBlocks'] );
			}
		}
	}
}
