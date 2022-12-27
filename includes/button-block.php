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

	const NAME = 'scblocks/button';

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
			self::NAME,
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
	public function render( array $attributes ) : string {
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
			self::NAME,
			$attributes,
			array(
				'href'       => ! empty( $attributes['url'] ) && is_string( $attributes['url'] ) ? $attributes['url'] : null,
				'target'     => ! empty( $attributes['target'] ) ? '_blank' : null,
				'aria-label' => ! empty( $attributes['ariaLabel'] ) && is_string( $attributes['ariaLabel'] ) ? $attributes['ariaLabel'] : null,
				'rel'        => ! empty( $rel_attr ) ? implode( ' ', $rel_attr ) : null,
			)
		);
		if ( empty( $attributes['icon'] ) ) {
			$html_attr->extra_classes[] = 'scb-button-text';
		}

		$sprint_attrs = $html_attr->build();

		$tag_name = empty( $html_attr->parsed['href'] ) ? 'span' : 'a';

		$output = sprintf(
			'<%1$s %2$s>',
			$tag_name,
			$sprint_attrs
		);

		$text = isset( $attributes['text'] ) ? $attributes['text'] : '';
		$text = wp_kses_post( apply_filters( 'scblocks_button_dynamic_content', $text, $attributes ) );

		if ( ! empty( $attributes['icon'] ) && is_string( $attributes['icon'] ) ) {
			$output .= '<span class="scb-icon">' . Icons::sanitize( $attributes['icon'] ) . '</span>';
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

	public static function selectors():array {
		return array(
			'main' => function( $uid_class ) {
				return ".$uid_class,.$uid_class:visited";
			},
			'mainHover' => function( $uid_class ) {
				return ".$uid_class:hover";
			},
			'icon' => function( $uid_class ) {
				return ".$uid_class .scb-icon";
			},
			'iconSvg' => function( $uid_class ) {
				return ".$uid_class .scb-icon svg";
			},
		);
	}
}
