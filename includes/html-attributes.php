<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Build html attributes
 *
 * @since 1.1.0
 */
class Html_Attributes {

	/**
	 * The context, to build filter name.
	 *
	 * @since 1.1.0
	 * @var string
	 */
	private $context;

	/**
	 * Html attributes.
	 *
	 * @since 1.1.0
	 * @var array
	 */
	private $html_attributes;

	/**
	 * Block attributes.
	 *
	 * @since 1.1.0
	 * @var array
	 */
	private $block_attributes;

	/**
	 * Constructor
	 *
	 * @since 1.1.0
	 *
	 * @param string $context         The context to build filter.
	 * @param array $html_attributes  Html attributes.
	 * @param array $block_attributes Block attributes.
	 */
	public function __construct( string $context, array $html_attributes = array(), array $block_attributes = array() ) {
		$this->context          = $context;
		$this->html_attributes  = $html_attributes;
		$this->block_attributes = $block_attributes;
	}
	/**
	 * Build list of attributes into a string and apply contextual filter on string.
	 *
	 * The contextual filter is of the form `scblocks_attr_{context}_output`.
	 *
	 * @since 1.1.0
	 *
	 * @return string String of HTML attributes and values.
	 */
	public function build() : string {
		$attributes = $this->parse();

		$output = '';

		// Cycle through attributes, build tag attribute string.
		foreach ( $attributes as $key => $value ) {

			if ( ! $value ) {
				continue;
			}

			if ( true === $value ) {
				$output .= esc_html( $key ) . ' ';
			} else {
				$output .= sprintf( '%s="%s" ', esc_html( $key ), esc_attr( $value ) );
			}
		}

		$output = apply_filters( "scblocks_attr_{$this->context}_output", $output, $this->html_attributes, $this->block_attributes, $this->context );

		return trim( $output );
	}

	/**
	 * Merge array of attributes with defaults, and apply contextual filter on array.
	 *
	 * The contextual filter is of the form `scblocks_attr_{context}`.
	 *
	 * @since 1.1.0
	 *
	 * @return array Merged and filtered attributes.
	 */
	public function parse() : array {
		$defaults = array(
			'class' => sanitize_html_class( $this->context ),
		);

		$attributes = wp_parse_args( $this->html_attributes, $defaults );

		// Contextual filter.
		return apply_filters( "scblocks_attr_{$this->context}", $attributes, $this->block_attributes, $this->context );
	}
}
