<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Build and manage SVG shapes for our blocks.
 *
 * @since 1.2.0
 */
class Shape_Dividers {

	/**
	 * Register actions.
	 *
	 * @since 1.2.0
	 */
	public function register_actions() {
		add_action( 'rest_api_init', array( $this, 'register_route' ) );
		add_filter( 'scblocks_after_container_open', array( $this, 'build' ), 10, 2 );
	}

	/**
	 * Registers a REST API route for shape dividers.
	 *
	 * @since 1.2.0
	 */
	public function register_route() {
		register_rest_route(
			'scblocks/v1',
			'/svg-shapes',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
	/**
	 * Get shapes for REST API route.
	 *
	 * @since 1.2.0
	 */
	public function rest_get() {
		return rest_ensure_response( wp_json_encode( $this->get() ) );
	}

	/**
	 * Search for SVG in the passed array.
	 *
	 * @since 1.2.0
	 *
	 * @param array $shapes Array of shapes.
	 * @param string $id Element id.
	 *
	 * @return array SVG element.
	 */
	public function search_svg( array $shapes, string $id ) : string {
		foreach ( $shapes as $shape ) {
			if ( (string) $shape['id'] === $id ) {
				return $shape['shape'];
			}
		}
		return '';
	}

	/**
	 * Build shape dividers.
	 *
	 * @since 1.2.0
	 *
	 * @param string $output The current block output.
	 * @param array $attributes Block attributes.
	 *
	 * @return string
	 */
	public function build( string $output, array $attributes ) : string {
		if ( ! empty( $attributes['shapeDividers'] ) ) {
			$svgs = $this->get();

			$output .= '<div class="scb-shapes">';

			foreach ( $attributes['shapeDividers'] as $shape ) {
				if ( ! empty( $shape['id'] ) && ! empty( $shape['uidClass'] ) ) {
					$svg = $this->search_svg( $svgs, (string) $shape['id'] );

					if ( ! empty( $svg ) ) {
						$output .= sprintf(
							'<div class="scb-shape scb-shape-%s">%s</div>',
							$shape['uidClass'],
							$svg
						);
					}
				}
			}
			$output .= '</div>';
		}
		return $output;
	}

	/**
	 * Get list of svg shapes.
	 *
	 * @since 1.2.0
	 * @return array
	 */
	public function get() : array {
		return apply_filters(
			'scblocks_svg_shapes',
			array(
				array(
					'id'    => '1',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 10" preserveAspectRatio="none"><path d="M350 10L340 0L360 0L350 10Z" /></svg>',
				),
				array(
					'id'    => '2',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 10" preserveAspectRatio="none"><path d="M0 0H350H700V10H360L350 0L340 10H0V0Z"/></svg>',
				),
				array(
					'id'    => '3',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2600 130" preserveAspectRatio="none"><path d="M0 0H2600V70L0 0Z"/><path d="M0 0H2600V70H0V0Z" style="opacity:0.5"/><path d="M0 0H2600V70L0 130V0Z" style="opacity:0.25"/></svg>',
				),
				array(
					'id'    => '4',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0 0L500 90L1000 0V100H0V0Z"/></svg>',
				),
				array(
					'id'    => '5',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0 90L500 0L1000 90V100H0V90Z" /></svg>',
				),
				array(
					'id'    => '6',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0 0H1000V100L332 20L0 100V0Z"/></svg>',
				),
				array(
					'id'    => '7',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0 0L1000 97V100H0V0Z"/></svg>',
				),
				array(
					'id'    => '8',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 150" preserveAspectRatio="none"><path d="M0 0C0 0 275 12 563 89C851 166 1000 100 1000 100V150H0V0Z" /></svg>',
				),
				array(
					'id'    => '9',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" preserveAspectRatio="none"><path d="M0 0C0 0 138.738 149.374 334 206C529.262 262.626 1000 290 1000 290V300H0V0Z"/></svg>',
				),
				array(
					'id'    => '10',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 250" preserveAspectRatio="none"><path d="M0 240C0 240 4.76675 181.554 264 108C553 26 1000 0 1000 0V250H0V240Z" /></svg>',
				),
				array(
					'id'    => '11',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 150" preserveAspectRatio="none"><path d="M0 0C0 0 297.228 140 500 140C702.772 140 1000 0 1000 0V150H0V0Z" /></svg>',
				),
				array(
					'id'    => '12',
					'shape' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 150" preserveAspectRatio="none"><path d="M0 140C0 140 297.228 0 500 0C702.772 0 1000 140 1000 140V150H0V140Z"/></svg>',
				),
			)
		);
	}
}
