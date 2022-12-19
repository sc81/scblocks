<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render Column Block
 *
 * @since 1.2.0
 */
class Column_Block {

	const NAME = 'scblocks/column';

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
			self::NAME,
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
		$html_attr = new Html_Attributes(
			self::NAME,
			$attributes
		);

		$output  = sprintf(
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
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function initial_css() : array {
		$css = apply_filters(
			'scblocks_column_default_css',
			array(
				'.scb-column' => array(
					'overflow-wrap: break-word',
					'word-break: break-word',
				),
			)
		);
		return $css;
	}
}
