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
		$css = '';
		foreach ( $arr_css as $block_css ) {
			$css .= $this->compose_selectors( $block_css );
		}
		return $css;
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
		);
		/**
		 * Filters default CSS for all blocks.
		 *
		 * @since 1.3.0
		 * @param array $css_array Default CSS for all blocks.
		 * @param bool $take_all_css Whether to get all CSS.
		 */
		$css_array = apply_filters(
			'scblocks_blocks_default_css',
			$css_array,
			$this->take_all_css
		);

		return $this->build( $css_array );
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
		$button = new Button_Block();
		return $button->initial_css();
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
				'.scb-heading mark' => array(
					'background: none',
				),
			)
		);
	}
}
