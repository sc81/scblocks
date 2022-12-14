<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Render heading block.
 *
 * @since 1.3.0
 */
class Heading_Block {

	/**
	 * @var array
	 */
	const ALLOWED_TAGS = array(
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'p',
		'div',
	);

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
			'scblocks/heading',
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
		$class_names = array(
			'scb-heading',
		);
		if ( ! empty( $attributes['uidClass'] ) ) {
			$class_names[] = $attributes['uidClass'];
		}
		if ( ! empty( $attributes['itemClass'] ) ) {
			$class_names[] = $attributes['itemClass'];
		}
		if ( ! empty( $attributes['htmlClass'] ) ) {
			$class_names[] = $attributes['htmlClass'];
		}
		if ( empty( $attributes['icon'] ) ) {
			$class_names[] = 'scb-heading-text';
		}

		$html_attr = new Html_Attributes(
			'heading',
			array(
				'id'    => ! empty( $attributes['htmlId'] ) ? $attributes['htmlId'] : null,
				'class' => implode( ' ', $class_names ),
			),
			$attributes
		);
		$tag_name  = empty( $attributes['tagName'] ) ? 'h2' : $attributes['tagName'];
		$tag_name  = apply_filters( 'scblocks_heading_tag', $tag_name, $attributes );

		$allowed_tags = apply_filters(
			'scblocks_heading_allowed_tags',
			self::ALLOWED_TAGS,
			$attributes
		);
		if ( ! in_array( $tag_name, $allowed_tags, true ) ) {
			$tag_name = 'div';
		}

		$output = sprintf(
			'<%1$s %2$s>',
			$tag_name,
			$html_attr->build()
		);

		$text = isset( $attributes['text'] ) ? $attributes['text'] : '';
		$text = apply_filters( 'scblocks_heading_dynamic_content', $text, $attributes );

		if ( ! empty( $attributes['icon'] ) && is_string( $attributes['icon'] ) ) {
			$output .= '<span class="scb-icon">' . Icons::sanitize( $attributes['icon'] ) . '</span>';

			$output .= '<span class="scb-heading-text">' . $text . '</span>';
		} else {
			$output .= $text;
		}

		$output .= sprintf(
			'</%s>',
			$tag_name
		);

		return $output;
	}
}
