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
		if ( isset( $arr_css['desktop'] ) ) {
			$desktop = self::device_css( $arr_css['desktop'] );
		}
		if ( isset( $arr_css['tablet'] ) ) {
			$tablet = '@media(max-width: 1024px){' . self::device_css( $arr_css['tablet'] ) . '}';
		}
		if ( isset( $arr_css['mobile'] ) ) {
			$mobile = '@media(max-width: 767px){' . self::device_css( $arr_css['mobile'] ) . '}';
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
			array(
				'desktop' => array(
					//buttons
					'.scb-buttons' => array(
						'display: flex',
						'flex-wrap: wrap',
					),
					//button
					'.scb-button' => array(
						'display: flex',
						'align-items: center',
						'justify-content: center',
						'text-decoration: none',
					),
					//columns
					'.scb-columns' => array(
						'display: flex',
						'flex-wrap: wrap',
					),
					//column
					'.scb-column' => array(
						'box-sizing: border-box',
					),
					'.scb-inner-column' => array(
						'display: flex',
						'height: 100%',
						'flex-direction: column',
					),
					//container
					'.scb-container.scb-root-container' => array(
						'max-width: unset !important',
						'margin: 0',
						'width: 100% !important',
					),
					'.scb-container.scb-root-container > .scb-container-content' => array(
						'margin-left: auto',
						'margin-right: auto',
					),
					//heading
					'.scb-heading mark' => array(
						'background: none',
					),
					//icon
					'.scb-icon' => array(
						'display: inline-flex',
						'line-height: 0',
					),
					'.scb-icon svg' => array(
						'width: 1em',
						'height: 1em',
						'fill: currentColor',
					),
				),
			)
		);
		return self::build( $css_array );
	}
}
