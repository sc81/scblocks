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
			Column_Block::NAME    => $this->column(),
			Container_Block::NAME => $this->container(),
			Heading_Block::NAME   => $this->heading(),
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
	 * Default CSS for Column Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function column() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( Column_Block::NAME ) ) {
			return array();
		}
		return Column_Block::initial_css();
	}
	/**
	 * Default CSS for Container Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function container() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( Container_Block::NAME ) ) {
			return array();
		}
		return Container_Block::initial_css();
	}
	/**
	 * Default CSS for Heading Block.
	 *
	 * @since 1.2.0
	 *
	 * @return array
	 */
	public function heading() : array {
		if ( ! $this->take_all_css && ! Plugin::is_active_block( Heading_Block::NAME ) ) {
			return array();
		}
		return Heading_Block::initial_css();
	}
}
