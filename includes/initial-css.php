<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default css for blocks
 *
 * @since 1.0.0
 */
class Initial_Css {

	/**
	 * Whether to get all css.
	 *
	 * @since 1.2.0
	 *
	 * @var bool
	 */
	public $take_all_css;

	/**
	 * Constructor.
	 *
	 * @since 1.2.0
	 *
	 * @param bool $take_all_css Force to take all css
	 */
	public function __construct( bool $take_all_css = false ) {
		$this->take_all_css = $take_all_css;
	}

	/**
	 * Build our css from the array.
	 *
	 * @since 1.0.0
	 *
	 * @param array $arr_css Our css.
	 *
	 * @return string
	 */
	public static function build( array $arr_css ) : string {
		$desktop = '';
		$tablet  = '';
		$mobile  = '';
		$all     = '';
		if ( isset( $arr_css['allDevices'] ) ) {
			$all = self::compose_selectors( $arr_css['allDevices'] );
		}
		if ( isset( $arr_css['desktop'] ) ) {
			$desktop = '@media(min-width: 1025px){' . self::compose_selectors( $arr_css['desktop'] ) . '}';
		}
		if ( isset( $arr_css['tablet'] ) ) {
			$tablet = '@media(max-width: 1024px){' . self::compose_selectors( $arr_css['tablet'] ) . '}';
		}
		if ( isset( $arr_css['mobile'] ) ) {
			$mobile = '@media(max-width: 767px){' . self::compose_selectors( $arr_css['mobile'] ) . '}';
		}
		return $all . $desktop . $tablet . $mobile;
	}

	/**
	 * Build a css for a specific device.
	 *
	 * @since 1.2.0
	 *
	 * @param array $arr Our css.
	 *
	 * @return string
	 */
	public static function compose_selectors( array $arr ) : string {
		$css = '';
		foreach ( $arr as $selector => $props ) {
			$css .= $selector . '{' . implode( ';', $props ) . ';}';
		}
		return $css;
	}

	/**
	 * Get the default css for blocks in use.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	public function get() : string {
		$css = $this->button() .
		$this->buttons() .
		$this->column() .
		$this->columns() .
		$this->container() .
		$this->heading() .
		$this->icon();

		return apply_filters(
			'scblocks_blocks_default_css',
			$css
		);
	}
	/**
	 * Default css for Button Block.
	 *
	 * @since 1.2.0
	 *
	 * @return string
	 */
	public function button() : string {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'button' ) ) {
			return '';
		}
		$arr = apply_filters(
			'scblocks_button_default_css',
			array(
				'allDevices' => array(
					'.scb-button' => array(
						'display: flex',
						'align-items: center',
						'justify-content: center',
						'text-decoration: none',
					),
				),
			)
		);
		return self::build( $arr );
	}
	/**
	 * Default css for Buttons Block.
	 *
	 * @since 1.2.0
	 *
	 * @return string
	 */
	public function buttons() : string {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'buttons' ) ) {
			return '';
		}
		$arr = apply_filters(
			'scblocks_buttons_default_css',
			array(
				'allDevices' => array(
					'.scb-buttons' => array(
						'display: flex',
						'flex-wrap: wrap',
					),
				),
			)
		);
		return self::build( $arr );
	}
	/**
	 * Default css for Columns Block.
	 *
	 * @since 1.2.0
	 *
	 * @return string
	 */
	public function columns() : string {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'columns' ) ) {
			return '';
		}
		$arr = apply_filters(
			'scblocks_columns_default_css',
			array(
				'allDevices' => array(
					'.scb-columns' => array(
						'display: flex',
						'flex-wrap: wrap',
					),
				),
			)
		);
		return self::build( $arr );
	}
	/**
	 * Default css for Column Block.
	 *
	 * @since 1.2.0
	 *
	 * @return string
	 */
	public function column() : string {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'column' ) ) {
			return '';
		}
		$arr = apply_filters(
			'scblocks_column_default_css',
			array(
				'allDevices' => array(
					'.scb-column' => array(
						'box-sizing: border-box',
					),
					'.scb-inner-column' => array(
						'display: flex',
						'height: 100%',
						'flex-direction: column',
					),
				),
			)
		);
		return self::build( $arr );
	}
	/**
	 * Default css for Container Block.
	 *
	 * @since 1.2.0
	 *
	 * @return string
	 */
	public function container() : string {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'container' ) ) {
			return '';
		}var_dump( Plugin::is_active_block( 'container' ) );
		$arr = apply_filters(
			'scblocks_container_default_css',
			array(
				'allDevices' => array(
					'.scb-container.scb-root-container' => array(
						'max-width: unset !important',
						'margin: 0',
						'width: 100% !important',
					),
					'.scb-container.scb-root-container > .scb-container-content' => array(
						'margin-left: auto',
						'margin-right: auto',
					),
				),
			)
		);
		return self::build( $arr );
	}
	/**
	 * Default css for Heading Block.
	 *
	 * @since 1.2.0
	 *
	 * @return string
	 */
	public function heading() : string {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'heading' ) ) {
			return '';
		}
		$arr = apply_filters(
			'scblocks_heading_default_css',
			array(
				'allDevices' => array(
					'.scb-heading mark' => array(
						'background: none',
					),
				),
			)
		);
		return self::build( $arr );
	}

	/**
	 * Default css for icon.
	 *
	 * @since 1.2.0
	 *
	 * @return string
	 */
	public function icon() : string {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'icon' ) ) {
			return '';
		}
		$arr = apply_filters(
			'scblocks_icon_default_css',
			array(
				'allDevices' => array(
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
		return self::build( $arr );
	}
}
