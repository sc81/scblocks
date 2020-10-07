<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Initial_Css {
	public static function build( $input ) {
		$css = '';
		foreach ( $input as $selector => $props ) {
			$css .= $selector . '{' . implode( ';', $props ) . ';}';
		}
		return $css;
	}

	public static function get() {
		$css_array = apply_filters(
			'scblocks_initial_css',
			array()
		);
		return self::build( $css_array );
	}
}
