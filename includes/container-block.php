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
		add_filter( 'scblocks_blocks_default_css', array( $this, 'editor_css' ), 10, 2 );
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
		if ( ! empty( $attributes['align'] ) ) {
			$class_names[] = 'align-' . $attributes['align'];
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
		$wide_content_max_width = Plugin::option( 'wide_content_max_width' );
		return apply_filters(
			'scblocks_container_default_css',
			array(
				'.scb-container.align-wide' => array(
					'max-width:' . $wide_content_max_width,
					'margin-left:auto',
					'margin-right:auto',
				),
				'.scb-container.align-full' => array(
					'max-width:none',
				),
			)
		);
	}
	/**
	 * Default CSS for our blocks in the editor.
	 *
	 * @since 1.3.0
	 *
	 * @param array $css Default CSS for all blocks.
	 * @param bool $take_all_css Whether to get all CSS.
	 *
	 * @return array
	 */
	public function editor_css( array $css, bool $take_all_css ) : array {
		if ( $take_all_css ) {
			$wide_content_max_width = Plugin::option( 'wide_content_max_width' );

			unset( $css['container']['.scb-container.align-wide'] );
			unset( $css['container']['.scb-container.align-full'] );

			$css['container']['.editor-styles-wrapper .block-editor-block-list__layout .scb-container.align-wide'] = array(
				'max-width:' . $wide_content_max_width,
				'margin-left:auto',
				'margin-right:auto',
			);
			$css['container']['.editor-styles-wrapper .block-editor-block-list__layout .scb-container.align-full'] = array(
				'max-width:none',
			);
		}
		return $css;
	}
}
