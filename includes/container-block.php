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

	const NAME = 'scblocks/container';

	/**
	 * Allowed tag names.
	 *
	 * @since 1.3.0
	 *
	 * @var array
	 */
	const ALLOWED_TAGS = array(
		'div',
		'section',
		'header',
		'footer',
		'article',
		'aside',
	);

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
		$tag = empty( $attributes['tag'] ) || ! is_string( $attributes['tag'] ) ? 'div' : $attributes['tag'];

		$tag_name = apply_filters( 'scblocks_container_tagname', $tag, $attributes );

		$allowed_tags = apply_filters(
			'scblocks_container_allowed_tags',
			self::ALLOWED_TAGS,
			$attributes
		);
		if ( ! in_array( $tag_name, $allowed_tags, true ) ) {
			$tag_name = 'div';
		}

		$html_attr = new Html_Attributes(
			self::NAME,
			$attributes
		);

		if ( ! empty( $attributes['align'] ) ) {
			if ( $this->is_set_align_wide() ) {
				$html_attr->extra_classes[] = 'align' . $attributes['align'];
			} else {
				$html_attr->extra_classes[] = 'align-' . $attributes['align'];
			}
		}
		if ( ! empty( $attributes['useThemeContentWidth'] ) ) {
			$html_attr->extra_classes[] = 'scb-content-width';
		}

		$output = sprintf(
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
	public static function initial_css() : array {
		return array(
			'.scb-container.align-wide' => array(
				self::wide_content_max_width(),
				'margin-left:auto',
				'margin-right:auto',
			),
			'.scb-content-width > .scb-container-content' => array(
				self::content_max_width(),
				'margin-left:auto',
				'margin-right:auto',
			),
		);
	}

	/**
	 * Get content max width.
	 *
	 * @since 1.3.0
	 *
	 * @return string
	 */
	public static function content_max_width() : string {
		$width = Plugin::option( 'content_max_width' );

		if ( isset( $GLOBALS['content_width'] ) ) {
			$width = $GLOBALS['content_width'] . 'px';
		}
		$width = apply_filters( 'scblocks_container_content_max_width', $width );
		return 'max-width:' . $width;
	}

	/**
	 * Get wide content max width.
	 *
	 * @since 1.3.0
	 *
	 * @return string
	 */
	public static function wide_content_max_width() : string {
		$width = Plugin::option( 'wide_content_max_width' );
		$width = apply_filters( 'scblocks_wide_content_max_width', $width );

		return 'max-width:' . $width;
	}

	/**
	 * Checks that the theme has registered align-wide support.
	 *
	 * @since 1.3.0
	 *
	 * @return bool
	 */
	public function is_set_align_wide() : bool {
		return (bool) get_theme_support( 'align-wide' );
	}

	public static function selectors():array {
		return array(
			'main' => function( $uid_class ) {
				return ".$uid_class";
			},
			'mainStronger' => function( $uid_class ) {
				return ".scb-container.$uid_class";
			},
			'content' => function( $uid_class ) {
				return ".$uid_class > .scb-container-content";
			},
			'link' => function( $uid_class ) {
				return ".$uid_class a";
			},
			'linkHover' => function( $uid_class ) {
				return ".$uid_class a:hover";
			},
			'shapes' => function( $uid_class ) {
				return ".$uid_class > .scb-shapes";
			},
			'shape' => function( $uid_class, $shape_class ) {
				return ".$uid_class > .scb-shapes .$shape_class";
			},
			'shapeSvg' => function( $uid_class, $shape_class ) {
				return ".$uid_class > .scb-shapes .$shape_class";
			},
		);
	}
}
