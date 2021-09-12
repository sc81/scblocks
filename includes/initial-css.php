<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default CSS for blocks.
 *
 * @since 1.0.0
 */
class Initial_Css {

	/**
	 * Whether to get all CSS.
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
	 * @param bool $take_all_css Force to take all CSS
	 */
	public function __construct( bool $take_all_css = false ) {
		$this->take_all_css = $take_all_css;
	}

	/**
	 * Build our css from the array.
	 *
	 * @since 1.0.0
	 *
	 * @param array $arr_css Our CSS.
	 *
	 * @return string
	 */
	public function build( array $arr_css ) : string {
		$desktop = '';
		$tablet  = '';
		$mobile  = '';
		$all     = '';
		if ( isset( $arr_css['allDevices'] ) ) {
			$all = $this->compose_selectors( $arr_css['allDevices'] );
		}
		if ( isset( $arr_css['desktop'] ) ) {
			$desktop = '@media(min-width: 1025px){' . $this->compose_selectors( $arr_css['desktop'] ) . '}';
		}
		if ( isset( $arr_css['tablet'] ) ) {
			$tablet = '@media(max-width: 1024px){' . $this->compose_selectors( $arr_css['tablet'] ) . '}';
		}
		if ( isset( $arr_css['mobile'] ) ) {
			$mobile = '@media(max-width: 767px){' . $this->compose_selectors( $arr_css['mobile'] ) . '}';
		}
		return $all . $desktop . $tablet . $mobile;
	}

	/**
	 * Build a CSS for a specific device.
	 *
	 * @since 1.2.0
	 *
	 * @param array $arr_css Our CSS.
	 *
	 * @return string
	 */
	public function compose_selectors( array $arr_css ) : string {
		$css = '';
		foreach ( $arr_css as $selector => $props ) {
			$css .= $selector . '{' . implode( ';', $props ) . ';}';
		}
		return $css;
	}

	/**
	 * Get the default CSS for blocks in use.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	public function get() : string {
		$css_array = array(
			'button'    => $this->button(),
			'buttons'   => $this->buttons(),
			'column'    => $this->column(),
			'columns'   => $this->columns(),
			'container' => $this->container(),
			'heading'   => $this->heading(),
			'icon'      => $this->icon(),
		);
		/**
		 * Filters default CSS for all blocks.
		 *
		 * @param array $css_array Default CSS for all blocks.
		 * @param bool $take_all_css Whether to get all CSS.
		 */
		$css_array = apply_filters(
			'scblocks_blocks_default_css',
			$css_array,
			$this->take_all_css
		);

		$css = '';
		foreach ( $css_array as $block_css ) {
			$css .= $this->build( $block_css );
		}
		return $css;
	}
	/**
	 * Default CSS for Button Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function button() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'button' ) ) {
			return array();
		}
		return apply_filters(
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
	}
	/**
	 * Default CSS for Buttons Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function buttons() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'buttons' ) ) {
			return array();
		}
		$buttons = new Buttons_Block();
		return $buttons->initial_css();
	}
	/**
	 * Default CSS for Columns Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function columns() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'columns' ) ) {
			return array();
		}
		$columns = new Columns_Block();
		return $columns->initial_css();
	}
	/**
	 * Default CSS for Column Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function column() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'column' ) ) {
			return array();
		}
		$column = new Column_Block();
		return $column->initial_css();
	}
	/**
	 * Default CSS for Container Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function container() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'container' ) ) {
			return array();
		}
		$container = new Container_Block();
		return $container->initial_css();
	}
	/**
	 * Default CSS for Heading Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function heading() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'heading' ) ) {
			return array();
		}
		return apply_filters(
			'scblocks_heading_default_css',
			array(
				'allDevices' => array(
					'.scb-heading mark' => array(
						'background: none',
					),
				),
			)
		);
	}

	/**
	 * Default CSS for icon.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function icon() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( 'icon' ) ) {
			return array();
		}
		return apply_filters(
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
	}
}
