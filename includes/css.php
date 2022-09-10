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
	private $state;

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

	private $device;

	private static $selector_priority = array();

	public static function set_selectors_priority( string $block_name, array $value ) {
		if ( isset( self::$selector_priority[ $block_name ] ) ) {
			self::$selector_priority[ $block_name ] = array_merge( self::$selector_priority[ $block_name ], $value );
		} else {
			self::$selector_priority[ $block_name ] = $value;
		}
	}

	public static function get_selectors_priority():array {
		return self::$selector_priority;
	}

	public function __construct() {
		$this->blocks_selectors = get_block_selector();
		$this->media_query      = self::get_media_query();
		$this->init_state();
	}

	private function init_state() {
		$this->state = array( 'allDevices' => '' );
		foreach ( $this->media_query as $media ) {
			$this->state[ $media['name'] ] = '';
		}
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
					'name'   => 'desktop',
					'value'  => '',
					'isBase' => true,
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

			foreach ( $block['attrs']['css'] as $device => $selectors ) {
				$this->device = $device;
				$this->create_state( $selectors );
			}
		}
		$this->css .= $this->convert_to_string();
		return $this->css;
	}

	/**
	 * @since 1.3.0
	 *
	 * @param array $media_query
	 * @return string
	 */
	private function base_media_name( array $media_query ) : string {
		foreach ( $media_query as $media ) {
			if ( isset( $media['isBase'] ) ) {
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
		$css             = $this->state['allDevices'];
		$base_media_name = $this->base_media_name( $this->media_query );

		foreach ( $this->media_query as $media ) {
			if ( empty( $this->state[ $media['name'] ] ) ) {
				continue;
			}
			if ( $base_media_name === $media['name'] ) {
				$css .= $this->state[ $media['name'] ];
			} else {
				$css .= '@media ' . $media['value'] . '{' . $this->state[ $media['name'] ] . '}';
			}
		}
		return $css;
	}

	/**
	 * Compose properties for selectors and assign to state.
	 *
	 * @since 1.3.0
	 *
	 * @param array $selectors Array of selectors.
	 * @return void
	 */
	private function create_state( array $selectors ) {
		$aliases = array_keys( $selectors );
		if ( self::$selector_priority && isset( self::$selector_priority[ $this->block_name ] ) ) {
			usort(
				$aliases,
				function ( $a, $b ) {
					return ( self::$selector_priority[ $this->block_name ][ $a ] ?? 10 ) - ( self::$selector_priority[ $this->block_name ][ $b ] ?? 10 );
				}
			);
		}
		foreach ( $aliases as $alias ) {
			$selector = $this->element_final_selector( $alias );
			$props    = $this->compose_props( $selectors[ $alias ] );

			$this->state[ $this->device ] .= $selector . '{' . $props . '}';
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
