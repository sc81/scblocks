<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Builds CSS for our blocks in the template.
 *
 * @since 1.3.0
 */
class Template_Styling {

	/**
	 * Register actions
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function register_actions() {
		add_filter( 'scblocks_css', array( $this, 'css' ) );
		add_action( 'save_post', array( $this, 'after_modifying_template' ), 10, 2 );
		add_action( 'switch_theme', 'after_changing_theme' );
	}

	/**
	 * Combine template CSS with page CSS.
	 *
	 * @since 1.3.0
	 * @param string $css
	 *
	 * @return string CSS.
	 */
	public function css( string $css ) : string {
		global $_wp_current_template_content;
		if ( ! $_wp_current_template_content ) {
			return $css;
		}

		$parsed_template = parse_blocks( $_wp_current_template_content );

		return $this->build_css( $parsed_template ) . $css;
	}

	/**
	 * Build CSS for template.
	 *
	 * @since 1.3.0
	 * @param array $parsed_blocks Array of parsed block objects.
	 *
	 * @return string CSS.
	 */
	public function build_css( array $parsed_blocks ) : string {
		$css_composer = new Css();

		$css = $css_composer->compose( Plugin::blocks_attrs( $parsed_blocks ) );

		foreach ( $parsed_blocks as $block ) {
			if ( isset( $block['blockName'] ) &&
			'core/template-part' === $block['blockName'] &&
			isset( $block['attrs'] ) &&
			isset( $block['attrs']['theme'] ) &&
			isset( $block['attrs']['slug'] ) ) {
				$id = $block['attrs']['theme'] . '//' . $block['attrs']['slug'];

				$template = gutenberg_get_block_template( $id, 'wp_template_part' );
				if ( ! empty( $template ) ) {
					$parsed_content = parse_blocks( $template->content );

					$css .= $this->build_css( $parsed_content );

				}
			}
		}
		return $css;
	}
	/**
	 * Force CSS files to regenerate after a template has been modified.
	 *
	 * @since 1.3.0
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post Post object.
	 */
	public function after_modifying_template( int $post_id, \WP_Post $post ) {
		if ( wp_is_post_autosave( $post_id ) ||
			wp_is_post_revision( $post_id ) ||
			! current_user_can( 'edit_post', $post_id ) ||
			( 'wp_template' !== $post->post_type && 'wp_template_part' !== $post->post_type ) ) {
			return;
		}
		$this->force_update_css_files();
	}

	/**
	 * Force CSS files to regenerate after a theme has been changed.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function after_changing_theme() {
		$this->force_update_css_files();
	}

	/**
	 * Force CSS files to regenerate.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function force_update_css_files() {
		$settings = Plugin::options();

		$settings['force_regenerate_css_files'] = Plugin::get_microtime();

		Plugin::update_options( $settings );
	}
}
