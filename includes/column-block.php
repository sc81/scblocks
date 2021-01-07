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
			'scblocks/column',
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
			'scb-column',
			$attributes['uidClass'],
		);
		if ( ! empty( $attributes['htmlClass'] ) ) {
			$class_names[] = $attributes['htmlClass'];
		}
		if ( empty( $attributes['tag'] ) ) {
			$tag = 'div';
		}

		$tag_name = apply_filters( 'scblocks_column_tagname', $tag, $attributes );

		$html_attr = new Html_Attributes(
			'column',
			array(
				'id'    => isset( $attributes['htmlId'] ) ? $attributes['htmlId'] : null,
				'class' => implode( ' ', $class_names ),
			),
			$attributes
		);

		$output .= sprintf(
			'<%1$s %2$s>',
			$tag_name,
			$html_attr->build()
		);

		$output .= '<div class="scb-inner-column">';
		$output  = apply_filters( 'scblocks_inside_column', $output, $attributes );
		$output .= '<div class="scb-column-content">';
		$output .= $content;
		$output .= '</div>';
		$output .= '</div>';

		$output .= sprintf(
			'</%s>',
			$tag_name
		);

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
				'allDevices' => array(
					'.scb-column' => array(
						'box-sizing: border-box',
					),
					'.scb-inner-column' => array(
						'display: flex',
						'height: 100%',
						'flex-direction: column',
					),
				),
			)
		);
		return $css;
	}
}
