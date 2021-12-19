<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render Grid Block
 *
 * @since 1.3.0
 */
class Grid_Block {
	/**
	 * Register actions
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function register_actions() {
		add_action( 'init', array( $this, 'register' ) );
	}
	/**
	 * Register our block.
	 *
	 * @since 1.3.0
	 */
	public function register() {
		register_block_type(
			'scblocks/grid',
			array(
				'render_callback' => array( $this, 'render' ),
			)
		);
	}
	/**
	 * Render our block.
	 *
	 * @since 1.3.0
	 *
	 * @param array   $attributes The block attributes.
	 * @param string  $content The inner blocks.
	 * @return string
	 */
	public function render( array $attributes, string $content ) : string {
		$output      = '';
		$class_names = array(
			'scb-grid',
		);
		if ( ! empty( $attributes['uidClass'] ) ) {
			$class_names[] = $attributes['uidClass'];
		}
		if ( ! empty( $attributes['htmlClass'] ) ) {
			$class_names[] = $attributes['htmlClass'];
		}

		$html_attr = new Html_Attributes(
			'grid',
			array(
				'id'    => isset( $attributes['htmlId'] ) ? $attributes['htmlId'] : null,
				'class' => implode( ' ', $class_names ),
			),
			$attributes
		);

		$output .= sprintf(
			'<div %s>',
			$html_attr->build()
		);

		$output .= $content;
		$output .= '</div>';

		return $output;
	}
	/**
	 * Default CSS.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public function initial_css() : array {
		$css = apply_filters(
			'scblocks_grid_default_css',
			array(
				'.scb-grid' => array(
					'display: grid',
				),
			)
		);
		return $css;
	}
}
