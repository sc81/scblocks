<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Create CSS
 */
class Css {
	/** @var string */
	const DESKTOP_DEVICE = 'desktop';

	/** @var string */
	const TABLET_DEVICE = 'tablet';

	/** @var string */
	const MOBILE_DEVICE = 'mobile';

	/** @var string */
	const BLOCK_NAMESPACE = 'scblocks';

	/** @var string */
	public $tablet_device_max_width = '1024px';

	/** @var string */
	public $mobile_device_max_width = '767px';

	private $block_selector;

	public function __construct() {
		$this->block_selector = get_block_selector();
	}

	/**
	 * Composes css.
	 *
	 * @param array $blocks An array of blocks attributes.
	 *
	 * @return string
	 */
	public function compose( array $blocks ) : string {
		$css = array(
			'allDevices' => '',
		);

		$css[ self::DESKTOP_DEVICE ] = '';
		$css[ self::TABLET_DEVICE ]  = '';
		$css[ self::MOBILE_DEVICE ]  = '';

		foreach ( $blocks as $block_name => $block_data ) {
			foreach ( $block_data as $block ) {
				if ( empty( $block['uidClass'] ) || empty( $block['css'] ) ) {
					continue;
				}

				$block_name = $this->camel_case( $block_name );

				foreach ( $block['css'] as $device => $selectors ) {
					$css[ $device ] .= $this->compose_selectors( $selectors, $block_name, $block['uidClass'] );
				}
			}
		}
		foreach ( $css as $device_type => $device_css ) {
			if ( $device_css ) {
				if ( self::TABLET_DEVICE === $device_type ) {
					$css[ $device_type ] = '@media(max-width:' . $this->tablet_device_max_width . '){' . $device_css . '}';
				} elseif ( self::MOBILE_DEVICE === $device_type ) {
					$css[ $device_type ] = '@media(max-width:' . $this->mobile_device_max_width . '){' . $device_css . '}';
				}
			}
		}
		return $css['allDevices'] . $css[ self::DESKTOP_DEVICE ] . $css[ self::TABLET_DEVICE ] . $css[ self::MOBILE_DEVICE ];
	}

	/**
	 * Composes selectors.
	 *
	 * @param array $selectors Array of selectors.
	 * @param string $block_name Block name.
	 * @param string $uid_class
	 *
	 * @return string
	 */
	public function compose_selectors( array $selectors, string $block_name, string $uid_class ) : string {
		$css = '';

		foreach ( $selectors as $selector_alias => $selector_props ) {
			$final_selector = $this->block_selector[ $block_name ][ $selector_alias ]( $uid_class );

			$css .= $final_selector . '{' . $this->compose_props( $selector_props ) . '}';
		}
		return $css;
	}

	/**
	 * Composes properties.
	 *
	 * @param $props
	 *
	 * @return string
	 */
	public function compose_props( array $props ) : string {
		$css = '';

		foreach ( $props as $prop ) {
			$colon_index = strpos( $prop, ':' );
			$name        = substr( $prop, 0, $colon_index );
			$value       = substr( $prop, $colon_index );
			$css        .= $this->standarize_prop_name( $name ) . $value . ';';
		}
		return $css;
	}

	public function camel_case( $name ) {
		if ( strpos( $name, '-' ) !== false ) {
			return preg_replace_callback(
				'/-./',
				function( $match ) {
					return ucfirst( substr( $match[0], 1 ) );
				},
				$name
			);
		}
		return $name;
	}

	/**
	 * Converts the property to the valid css property.
	 *
	 * @param $name
	 *
	 * @return string
	 */
	public function standarize_prop_name( string $name ) : string {
		if ( strpos( $name, 'Custom' ) !== false ) {
			$n = str_replace( 'Custom', '', $name );
			$n = preg_replace_callback(
				'/[A-Z]/',
				function( $match ) {
					return '-' . strtolower( $match[0] );
				},
				$n
			);
			return '--' . self::BLOCK_NAMESPACE . '-' . $n;
		} else {
			return preg_replace_callback(
				'/[A-Z]/',
				function( $match ) {
					return '-' . strtolower( $match[0] );
				},
				$name
			);
		}
	}
}
