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
	 * HTML attributes.
	 *
	 * @since 1.2.0
	 * @var array
	 */
	public $attributes;

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

	public $extra_classes = array();

	/**
	 * Constructor
	 *
	 * @since 1.2.0
	 *
	 * @param string $block_name      Block name.
	 * @param array $attributes       HTML attributes.
	 * @param array $block_attributes Block attributes.
	 */
	public function __construct( string $block_name, array $block_attributes = array(), array $attributes = array() ) {
		$this->block_name       = $block_name;
		$this->context          = str_replace( '/', '_', $block_name );
		$this->attributes       = $attributes;
		$this->block_attributes = $block_attributes;
	}
	/**
	 * Build list of attributes into a string and apply contextual filter on string.
	 *
	 * The contextual filter is of the form `scblocks_attr_{context}`.
	 *
	 * @since 1.2.0
	 *
	 * @return string String of HTML attributes and values.
	 */
	public function build() : string {
		$merged       = array_merge( $this->main(), $this->attributes );
		$this->parsed = apply_filters( "{$this->context}_html_attrs", $merged, $this->block_attributes, $this->context );

		$output = '';

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

		return trim( $output );
	}

	public function main():array {
		$class_names = array(
			str_replace( 'scblocks/', 'scb-', $this->block_name ),
		);

		if ( ! empty( $this->block_attributes['uidClass'] ) && is_string( $this->block_attributes['uidClass'] ) ) {
			$class_names[] = $this->block_attributes['uidClass'];
		}
		if ( ! empty( $this->block_attributes['itemClass'] ) && is_string( $this->block_attributes['itemClass'] ) ) {
			$class_names[] = $this->block_attributes['itemClass'];
		}
		if ( ! empty( $this->block_attributes['htmlClass'] ) && is_string( $this->block_attributes['htmlClass'] ) ) {
			$class_names[] = $this->block_attributes['htmlClass'];
		}
		array_push( $class_names, ...$this->extra_classes );
		return array(
			'id'    => ! empty( $this->block_attributes['htmlId'] ) && is_string( $this->block_attributes['htmlId'] ) ? $this->block_attributes['htmlId'] : null,
			'class' => implode( ' ', $class_names ),
		);

	}
}
