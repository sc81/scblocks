<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render Buttons Block.
 *
 * @since 1.2.0
 */
class Buttons_Block {
	/**
	 * Register actions
	 *
	 * @since 1.2.0
	 *
	 * @return void
	 */
	public function register_actions() {
		add_action( 'init', array( $this, 'register' ) );
	}

	/**
	 * Register our block.
	 *
	 * @since 1.2.0
	 */
	public function register() {
		register_block_type(
			'scblocks/buttons',
			array(
				'render_callback' => array( $this, 'render' ),
			)
		);
	}
	/**
	 * Render our block.
	 *
	 * @since 1.2.0
	 *
	 * @param array   $attributes The block attributes.
	 * @param string  $content The inner blocks.
	 * @return string
	 */
	public function render( array $attributes, string $content ) : string {
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			return $content;
		}
		$output      = '';
		$class_names = array(
			'scb-buttons',
		);
		if ( ! empty( $attributes['uidClass'] ) ) {
			$class_names[] = $attributes['uidClass'];
		}
		if ( ! empty( $attributes['htmlClass'] ) ) {
			$class_names[] = $attributes['htmlClass'];
		}

		$html_attr = new Html_Attributes(
			'buttons',
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
	 * Default css.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function initial_css() : array {
		$css = apply_filters(
			'scblocks_buttons_default_css',
			array(
				'.scb-buttons' => array(
					'display: flex',
					'flex-wrap: wrap',
				),
			)
		);
		return $css;
	}
}
