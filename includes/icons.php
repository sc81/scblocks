<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Icons {
	/**
	 * Register actions
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function register_actions() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			'scblocks/v1',
			'/icons/(?P<id>\d+)',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_for_admin_area' ),
				'args'                => array(
					'id' => array(
						'sanitize_callback' => 'absint',
					),
				),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Get icons for the admin area.
	 *
	 * @since 1.3.0
	 * @param mixed $data
	 *
	 * @return mixed
	 */
	public function get_for_admin_area( $data ) {

		switch ( $data['id'] ) {
			case 1:
				include_once SCBLOCKS_PLUGIN_DIR . 'includes/font-awesome.php';

				return rest_ensure_response( wp_json_encode( FONTAWESOME ) );

			case 2:
				include_once SCBLOCKS_PLUGIN_DIR . 'includes/dashicons.php';

				return rest_ensure_response( wp_json_encode( DASHICONS ) );

			default:
				return new \WP_Error( 'no_icons', 'Invalid id', array( 'status' => 404 ) );
		}

	}

	/**
	 * Sanitize icon HTML.
	 *
	 * @since 1.3.0
	 *
	 * @param string $icon
	 *
	 * @return string
	 */
	public static function sanitize( string $icon ):string {
		return wp_kses( $icon, Plugin::get_svg_allowed_html() );
	}

	/**
	 * Get an array of allowed SVG elements and attributes.
	 *
	 * @return array
	 */
	public static function get_allowed_html():array {
		$allowed = array();
		foreach ( self::ALLOWED_TAGS as $tag ) {
			foreach ( self::ALLOWED_ATTRIBUTES as $attribute ) {
				$allowed[ $tag ][ $attribute ] = true;
			}
		}
		return $allowed;
	}

	const ALLOWED_TAGS = array(
		'svg',
		'altglyph',
		'altglyphdef',
		'altglyphitem',
		'animatecolor',
		'animatemotion',
		'animatetransform',
		'circle',
		'clippath',
		'defs',
		'desc',
		'ellipse',
		'filter',
		'font',
		'g',
		'glyph',
		'glyphref',
		'hkern',
		'image',
		'line',
		'lineargradient',
		'marker',
		'mask',
		'metadata',
		'mpath',
		'path',
		'pattern',
		'polygon',
		'polyline',
		'radialgradient',
		'rect',
		'stop',
		'switch',
		'symbol',
		'text',
		'textpath',
		'title',
		'tref',
		'tspan',
		'view',
		'vkern',
		// SVG Filters
		'feBlend',
		'feColorMatrix',
		'feComponentTransfer',
		'feComposite',
		'feConvolveMatrix',
		'feDiffuseLighting',
		'feDisplacementMap',
		'feDistantLight',
		'feFlood',
		'feFuncA',
		'feFuncB',
		'feFuncG',
		'feFuncR',
		'feGaussianBlur',
		'feMerge',
		'feMergeNode',
		'feMorphology',
		'feOffset',
		'fePointLight',
		'feSpecularLighting',
		'feSpotLight',
		'feTile',
		'feTurbulence',
	);

	const ALLOWED_ATTRIBUTES = array(
		'accent-height',
		'accumulate',
		'additivive',
		'alignment-baseline',
		'ascent',
		'attributename',
		'attributetype',
		'azimuth',
		'basefrequency',
		'baseline-shift',
		'begin',
		'bias',
		'by',
		'class',
		'clip',
		'clip-path',
		'clip-rule',
		'color',
		'color-interpolation',
		'color-interpolation-filters',
		'color-profile',
		'color-rendering',
		'cx',
		'cy',
		'd',
		'dx',
		'dy',
		'diffuseconstant',
		'direction',
		'display',
		'divisor',
		'dur',
		'edgemode',
		'elevation',
		'end',
		'fill',
		'fill-opacity',
		'fill-rule',
		'filter',
		'flood-color',
		'flood-opacity',
		'font-family',
		'font-size',
		'font-size-adjust',
		'font-stretch',
		'font-style',
		'font-variant',
		'font-weight',
		'fx',
		'fy',
		'g1',
		'g2',
		'glyph-name',
		'glyphref',
		'gradientunits',
		'gradienttransform',
		'height',
		'href',
		'id',
		'image-rendering',
		'in',
		'in2',
		'k',
		'k1',
		'k2',
		'k3',
		'k4',
		'kerning',
		'keypoints',
		'keysplines',
		'keytimes',
		'lang',
		'lengthadjust',
		'letter-spacing',
		'kernelmatrix',
		'kernelunitlength',
		'lighting-color',
		'local',
		'marker-end',
		'marker-mid',
		'marker-start',
		'markerheight',
		'markerunits',
		'markerwidth',
		'maskcontentunits',
		'maskunits',
		'max',
		'mask',
		'media',
		'method',
		'mode',
		'min',
		'name',
		'numoctaves',
		'offset',
		'operator',
		'opacity',
		'order',
		'orient',
		'orientation',
		'origin',
		'overflow',
		'paint-order',
		'path',
		'pathlength',
		'patterncontentunits',
		'patterntransform',
		'patternunits',
		'points',
		'preservealpha',
		'preserveaspectratio',
		'r',
		'rx',
		'ry',
		'radius',
		'refx',
		'refy',
		'repeatcount',
		'repeatdur',
		'restart',
		'result',
		'rotate',
		'scale',
		'seed',
		'shape-rendering',
		'specularconstant',
		'specularexponent',
		'spreadmethod',
		'stddeviation',
		'stitchtiles',
		'stop-color',
		'stop-opacity',
		'stroke-dasharray',
		'stroke-dashoffset',
		'stroke-linecap',
		'stroke-linejoin',
		'stroke-miterlimit',
		'stroke-opacity',
		'stroke',
		'stroke-width',
		'style',
		'surfacescale',
		'tabindex',
		'targetx',
		'targety',
		'transform',
		'text-anchor',
		'text-decoration',
		'text-rendering',
		'textlength',
		'type',
		'u1',
		'u2',
		'unicode',
		'values',
		'viewbox',
		'visibility',
		'vert-adv-y',
		'vert-origin-x',
		'vert-origin-y',
		'width',
		'word-spacing',
		'wrap',
		'writing-mode',
		'xchannelselector',
		'ychannelselector',
		'x',
		'x1',
		'x2',
		'xmlns',
		'y',
		'y1',
		'y2',
		'z',
		'zoomandpan',
	);
}
