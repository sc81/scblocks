<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Initial_Css {
	public static function build( array $arr_css ) : string {
		$desktop = '';
		$tablet  = '';
		$mobile  = '';
		if ( isset( $arr_css['Desktop'] ) ) {
			$desktop = self::device_css( $arr_css['Desktop'] );
		}
		if ( isset( $arr_css['Tablet'] ) ) {
			$tablet = '@media(max-width: 1024px){' . self::device_css( $arr_css['Tablet'] ) . '}';
		}
		if ( isset( $arr_css['Mobile'] ) ) {
			$mobile = '@media(max-width: 767px){' . self::device_css( $arr_css['Mobile'] ) . '}';
		}
		return $desktop . $tablet . $mobile;
	}

	public static function device_css( array $arr ) : string {
		$css = '';
		foreach ( $arr as $selector => $props ) {
			$css .= $selector . '{' . implode( ';', $props ) . ';}';
		}
		return $css;
	}

	public static function get() : string {
		$css_array = apply_filters(
			'scblocks_initial_css',
			array()
		);
		return self::build( $css_array );
	}
}
