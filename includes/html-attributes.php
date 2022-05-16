<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Build html attributes
 *
 * @since 1.2.0
 */
class Html_Attributes {

	/**
	 * The context, to build filter name.
	 *
	 * @since 1.2.0
	 * @var string
	 */
	public $context;

	/**
	 * Raw HTML attributes.
	 *
	 * @since 1.2.0
	 * @var array
	 */
	public $raw;

	/**
	 * Block attributes.
	 *
	 * @since 1.2.0
	 * @var array
	 */
	public $block_attributes;

	/**
	 * Parsed and filterd attributes.
	 *
	 * @since 1.3.0
	 * @var array
	 */
	public $parsed;

	/**
	 * Constructor
	 *
	 * @since 1.2.0
	 *
	 * @param string $context         The context to build filter.
	 * @param array $raw_attrs        Raw HTML attributes.
	 * @param array $block_attributes Block attributes.
	 */
	public function __construct( string $context, array $raw_attrs = array(), array $block_attributes = array() ) {
		$this->context          = $context;
		$this->raw              = $raw_attrs;
		$this->block_attributes = $block_attributes;
	}
	/**
	 * Build list of attributes into a string and apply contextual filter on string.
	 *
	 * The contextual filter is of the form `scblocks_attr_{context}_output`.
	 *
	 * @since 1.2.0
	 *
	 * @return string String of HTML attributes and values.
	 */
	public function build() : string {
		$this->parse();

		$output = '';

		// Cycle through attributes, build tag attribute string.
		foreach ( $this->parsed as $key => $value ) {

			if ( ! $value ) {
				continue;
			}

			if ( true === $value ) {
				$output .= esc_html( $key ) . ' ';
			} else {
				$output .= sprintf( '%s="%s" ', esc_html( $key ), esc_attr( $value ) );
			}
		}

		$output = apply_filters( "scblocks_attr_{$this->context}_output", $output, $this->raw, $this->block_attributes, $this->context );

		return trim( $output );
	}

	/**
	 * Merge array of attributes with defaults, and apply contextual filter on array.
	 *
	 * The contextual filter is of the form `scblocks_attr_{context}`.
	 *
	 * @since 1.2.0
	 */
	public function parse() {
		$defaults = array(
			'class' => sanitize_html_class( $this->context ),
		);

		$attributes = wp_parse_args( $this->raw, $defaults );

		// Contextual filter.
		$this->parsed = apply_filters( "scblocks_attr_{$this->context}", $attributes, $this->block_attributes, $this->context );
	}
}
