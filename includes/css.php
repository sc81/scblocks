<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Create CSS
 */
class Css {

	/**
	 * Blocks selectors.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	private $blocks_selectors;

	/**
	 * CSS state.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	private $state = array( 'allDevices' => array() );

	/**
	 * Block name.
	 *
	 * @since 1.3.0
	 * @var string
	 */
	private $block_name = '';

	/**
	 * Block uidClass.
	 *
	 * @since 1.3.0
	 * @var string
	 */
	private $block_uid_class = '';

	/**
	 * Media query data.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	private $media_query;

	/**
	 * CSS.
	 *
	 * @since 1.3.0
	 * @var string
	 */
	private $css = '';

	public function __construct() {
		$this->blocks_selectors = get_block_selector();
		$this->media_query      = self::get_media_query();
	}

	/**
	 * Get media query data.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public static function get_media_query(): array {
		return apply_filters(
			'scblocks_media_query',
			array(
				array(
					'name'                => 'desktop',
					'value'               => '',
					'mergeWithAllDevices' => true,
				),
				array(
					'name'  => 'tablet',
					'value' => '(max-width: 1024px)',
				),
				array(
					'name'  => 'mobile',
					'value' => '(max-width: 767px)',
				),
			)
		);
	}

	/**
	 * Compose CSS.
	 *
	 * @param array $blocks An array of blocks attributes.
	 *
	 * @return string CSS.
	 */
	public function compose( array $blocks ) : string {
		foreach ( $blocks as $block ) {
			if ( empty( $block['attrs']['uidClass'] ) || empty( $block['attrs']['css'] ) ) {
				continue;
			}
			$this->block_name      = $block['name'];
			$this->block_uid_class = $block['attrs']['uidClass'];
			$this->state           = array( 'allDevices' => array() );

			foreach ( $block['attrs']['css'] as $device => $selectors ) {
				$this->build_selectors_state( $selectors, $device );
			}
			$this->css .= $this->convert_to_string();
		}
		return $this->css;
	}

	/**
	 * Get media query name to merge with allDevices.
	 *
	 * @since 1.3.0
	 *
	 * @param array $media_query
	 * @return string
	 */
	private function mq_name_to_merge( array $media_query ) : string {
		foreach ( $media_query as $media ) {
			if ( isset( $media['mergeWithAllDevices'] ) ) {
				return $media['name'];
			}
		}
		return '';
	}

	/**
	 * Convert CSS state to string.
	 *
	 * @since 1.3.0
	 *
	 * @return string CSS.
	 */
	private function convert_to_string() : string {
		$css              = '';
		$mq_name_to_merge = $this->mq_name_to_merge( $this->media_query );

		if ( $mq_name_to_merge ) {
			$selectors = isset( $this->state[ $mq_name_to_merge ] ) ? $this->state[ $mq_name_to_merge ] : array();

			$this->state[ $mq_name_to_merge ] = $this->merge_selectors( $selectors, $this->state['allDevices'] );
		}
		foreach ( $this->media_query as $media ) {
			if ( ! isset( $this->state[ $media['name'] ] ) ) {
				continue;
			}
			if ( $mq_name_to_merge === $media['name'] ) {
				$css .= $this->compose_selectors( $this->state[ $media['name'] ] );
			} else {
				$css .= '@media ' . $media['value'] . '{' . $this->compose_selectors( $this->state[ $media['name'] ] ) . '}';
			}
		}
		return $css;
	}

	/**
	 * Compose selectors.
	 *
	 * @param array $selectors
	 *
	 * @return string
	 */
	private function compose_selectors( array $selectors ) : string {
		$css = '';
		foreach ( $selectors as $selector => $value ) {
			$css .= $selector . '{' . $value . '}';
		}
		return $css;
	}

	/**
	 * Merge two sets of selectors.
	 *
	 * @since 1.3.0
	 *
	 * @param array $selectors
	 * @param array $extra_selectors
	 *
	 * @return array
	 */
	private function merge_selectors( array $selectors, array $extra_selectors ) : array {
		$next = array();
		foreach ( $selectors as $selector => $value ) {
			if ( isset( $extra_selectors[ $selector ] ) ) {
				$next[ $selector ] = $value . $extra_selectors[ $selector ];
				unset( $extra_selectors[ $selector ] );
			} else {
				$next[ $selector ] = $value;
			}
		}
		return array_merge( $next, $extra_selectors );
	}

	/**
	 * Compose properties for selectors and assign to state.
	 *
	 * @since 1.3.0
	 *
	 * @param array $selectors Array of selectors.
	 * @param string $device Device name.
	 * @return void
	 */
	private function build_selectors_state( array $selectors, string $device ) {
		foreach ( $selectors as $selector_alias => $css_props ) {
			$selector = $this->element_final_selector( $selector_alias );
			if ( $selector ) {
				$this->state[ $device ][ $selector ] = $this->compose_props( $css_props );
			}
		}
	}

	/**
	 * Compose properties.
	 *
	 * @param array $props
	 *
	 * @return string
	 */
	private function compose_props( array $props ) : string {
		$css = '';

		foreach ( $props as $prop ) {
			$colon_index = strpos( $prop, ':' );
			$name        = substr( $prop, 0, $colon_index );
			$value       = substr( $prop, $colon_index );
			$css        .= $this->standardize_prop_name( $name ) . $value . ';';
		}
		return $css;
	}


	/**
	 * Standardize the property name.
	 *
	 * @param string $name
	 *
	 * @return string
	 */
	private function standardize_prop_name( string $name ) : string {
		return preg_replace_callback(
			'/[A-Z]/',
			function( $match ) {
				return '-' . strtolower( $match[0] );
			},
			$name
		);
	}

	/**
	 * Check if there is a shape selector.
	 *
	 * @since 1.3.0
	 *
	 * @param string $selector_alias
	 *
	 * @return bool
	 */
	private function is_shape_selector( string $selector_alias ) : bool {
		return substr( $selector_alias, 0, strlen( 'shape-' ) ) === 'shape-';
	}

	/**
	 * Build and return a final shape selector.
	 *
	 * @since 1.3.0
	 *
	 * @param string $selector
	 *
	 * @return string
	 */
	private function shape_selector( string $selector ) : string {
		$shape_class = 'scb-' . $selector;
		$alias       = 'shape';

		if ( substr( $selector, 0, strlen( 'shape-svg' ) ) === 'shape-svg' ) {
			$shape_class = 'scb-shape' . str_replace( 'shape-svg', '', $selector ) . ' svg';
			$alias       = 'shapeSvg';
		}
		if ( ! empty( $this->blocks_selectors[ $this->block_name ][ $alias ] ) ) {
			return $this->blocks_selectors[ $this->block_name ][ $alias ]( $this->block_uid_class, $shape_class );
		}
		return '';
	}

	/**
	 * Create and return a final selector for the HTML element.
	 *
	 * @since 1.3.0
	 *
	 * @param string $selector_alias
	 *
	 * @return string
	 */
	private function element_final_selector( string $selector_alias ) : string {
		if ( $this->is_shape_selector( $selector_alias ) ) {
			return $this->shape_selector( $selector_alias );
		}
		if ( ! empty( $this->blocks_selectors[ $this->block_name ][ $selector_alias ] ) ) {
			return $this->blocks_selectors[ $this->block_name ][ $selector_alias ]( $this->block_uid_class );
		}
		return '';
	}
}
