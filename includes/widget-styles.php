<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Widget styles.
 *
 * @since 1.3.0
 */
class Widget_Styles {
	/**
	 * Registers actions.
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function register_actions() {
		add_filter(
			'widget_update_callback',
			array( $this, 'update_css' )
		);
	}

	/**
	 * Force CSS files to regenerate after a widget has been saved.
	 *
	 * @since 1.3.0
	 *
	 * @param array $instance The current widget instance's settings.
	 */
	public function update_css( array $instance ) : array {
		if ( function_exists( 'wp_use_widgets_block_editor' ) && wp_use_widgets_block_editor() ) {
			$settings = Plugin::options();

			$settings['force_regenerate_css_files'] = time();

			Plugin::update_options( $settings );
		}

		return $instance;
	}

	/**
	 * Process all widget content for potential styling.
	 *
	 * @since 1.3.0
	 * @return array Array of parsed block objects.
	 */
	public function parsed_blocks() : array {
		$widget_blocks = get_option( 'widget_block' );
		$content       = '';
		foreach ( (array) $widget_blocks as $block ) {
			if ( isset( $block['content'] ) ) {
				$content .= $block['content'];
			}
		}
		if ( ! $content ) {
			return array();
		}

		return parse_blocks( $content );
	}
}
