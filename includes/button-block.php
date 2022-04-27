<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render Button Block.
 *
 * @since 1.3.0
 */
class Button_Block {
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
			'scblocks/button',
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
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			return $content;
		}
		$class_names = array(
			'scb-button',
		);
		if ( ! empty( $attributes['uidClass'] ) ) {
			$class_names[] = $attributes['uidClass'];
		}
		if ( ! empty( $attributes['htmlClass'] ) ) {
			$class_names[] = $attributes['htmlClass'];
		}
		if ( empty( $attributes['iconId'] ) ) {
			$class_names[] = 'scb-button-text';
		}
		$rel_attr = array();
		if ( ! empty( $attributes['relNoFollow'] ) ) {
			$rel_attr[] = 'nofollow';
		}
		if ( ! empty( $attributes['target'] ) ) {
			$rel_attr[] = 'noopener';
			$rel_attr[] = 'noreferrer';
		}
		if ( ! empty( $attributes['relSponsored'] ) ) {
			$rel_attr[] = 'sponsored';
		}
		$html_attr = new Html_Attributes(
			'button',
			array(
				'class'      => implode( ' ', $class_names ),
				'id'         => ! empty( $attributes['htmlId'] ) ? $attributes['htmlId'] : null,
				'href'       => ! empty( $attributes['url'] ) ? $attributes['url'] : null,
				'target'     => ! empty( $attributes['target'] ) ? '_blank' : null,
				'aria-label' => ! empty( $attributes['ariaLabel'] ) ? $attributes['ariaLabel'] : null,
				'rel'        => ! empty( $rel_attr ) ? implode( ' ', $rel_attr ) : null,
			),
			$attributes
		);

		$tag_name = empty( $attributes['url'] ) ? 'span' : 'a';

		$output = sprintf(
			'<%1$s %2$s>',
			$tag_name,
			$html_attr->build()
		);

		$text = isset( $attributes['text'] ) ? $attributes['text'] : '';
		$text = apply_filters( 'scblocks_button_dynamic_content', $text, $attributes );

		if ( ! empty( $attributes['iconId'] ) ) {
			$icons   = Plugin::used_icons();
			$icon    = isset( $icons[ $attributes['iconId'] ] ) ? $icons[ $attributes['iconId'] ] : '';
			$output .= '<span class="scb-icon">' . $icon . '</span>';
			if ( ! ! $text && empty( $attributes['withoutText'] ) ) {
				$output .= '<span class="scb-button-text">' . $text . '</span>';
			}
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
