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
	 * Device name.
	 *
	 * @since 1.3.0
	 * @var string
	 */
	private $device;

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

	public function __construct() {
		$this->blocks_selectors = get_block_selector();
	}

	/**
	 * Media query data.
	 *
	 * @since 1.3.0
	 *
	 * @return array
	 */
	public static function media_query(): array {
		return apply_filters(
			'scblocks_media_query',
			array(
				array(
					'name'  => 'desktop',
					'value' => '',
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
		foreach ( $blocks as $name => $block_data ) {
			foreach ( $block_data as $block ) {
				if ( empty( $block['uidClass'] ) || empty( $block['css'] ) ) {
					continue;
				}

				$this->block_name = $name;

				foreach ( $block['css'] as $device => $selectors ) {
					$this->block_uid_class = $block['uidClass'];

					$this->device = $device;

					$this->build_selectors_state( $selectors );
				}
			}
		}
		return $this->convert_to_string();
	}

	/**
	 * Convert CSS state to string.
	 *
	 * @since 1.3.0
	 *
	 * @return string CSS.
	 */
	private function convert_to_string() : string {
		$css = '';
		if ( empty( $this->state ) ) {
			return $css;
		}
		$media_query  = self::media_query();
		$first_device = $media_query[0]['name'];
		foreach ( $this->state as $device => $selectors ) {
			if ( 'allDevices' === $device ) {
				continue;
			}
			if ( $first_device === $device ) {
				$css .= $this->compose_selectors( $this->merge_selectors( $selectors, $this->state['allDevices'] ) );
			} else {
				$media_query_list = $this->get_media_query_list( $device, $media_query );

				$css .= '@media ' . $media_query_list . '{' . $this->compose_selectors( $selectors ) . '}';
			}
		}
		return $css;
	}

	/**
	 * Return media-query-list.
	 *
	 * @since 1.3.0
	 *
	 * @param string $name Device name
	 * @param array $media_query Media query data
	 *
	 * @return string
	 */
	private function get_media_query_list( string $name, array $media_query ) : string {
		$value = '';
		foreach ( $media_query as $device ) {
			if ( isset( $device['name'] )
			&&
			$device['name'] === $name
			&&
			isset( $device['value'] ) ) {
				return $device['value'];
			}
		}
		return $value;
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
	 *
	 * @return void
	 */
	private function build_selectors_state( array $selectors ) {
		foreach ( $selectors as $selector_alias => $css_props ) {

			$selector = $this->element_final_selector( $selector_alias );

			if ( $selector ) {
				$this->state[ $this->device ][ $selector ] = $this->compose_props( $css_props );
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
