<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render container block
 *
 * @since 1.2.0
 */
class Container_Block {
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
			'scblocks/container',
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
			'scb-container',
			$attributes['uidClass'],
		);
		if ( ! empty( $attributes['isRootContainer'] ) ) {
			$class_names[] = 'scb-root-container';
		}
		if ( ! empty( $attributes['htmlClass'] ) ) {
			$class_names[] = $attributes['htmlClass'];
		}
		if ( empty( $attributes['tag'] ) ) {
			$tag = 'div';
		}

		$tag_name = apply_filters( 'scblocks_container_tagname', $tag, $attributes );

		$html_attr = new Html_Attributes(
			'container',
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

		$output  = apply_filters( 'scblocks_after_container_open', $output, $attributes );
		$output .= '<div class="scb-container-content">';
		$output .= $content;
		$output .= '</div>';
		$output  = apply_filters( 'scblocks_before_container_close', $output, $attributes );

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
			'scblocks_container_default_css',
			array(
				'allDevices' => array(
					'.scb-container.scb-root-container' => array(
						'max-width: unset !important',
						'margin: 0',
						'width: 100% !important',
					),
					'.scb-container.scb-root-container > .scb-container-content' => array(
						'margin-left: auto',
						'margin-right: auto',
					),
				),
			)
		);
		return $css;
	}
}
