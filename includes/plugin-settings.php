<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Plugin_Settings {

	public function register_actions() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_init', array( $this, 'save' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_style' ) );
	}
	/**
	 * Add the menu item.
	 */
	public function add_menu() {
		$settings = add_options_page(
			__( 'Settings', 'scblocks' ),
			__( 'ScBlocks', 'scblocks' ),
			'manage_options',
			'scblocks-settings',
			array( $this, 'settings_page' )
		);

	}

	public function enqueue_style() {
		$screen = get_current_screen();

		if ( 'settings_page_scblocks-settings' === $screen->id ) {
			wp_enqueue_style(
				'scblocks-dashboard',
				SCBLOCKS_PLUGIN_URL . 'assets/css/dashboard.css',
				array(),
				filemtime( SCBLOCKS_PLUGIN_DIR . 'assets/css/dashboard.css' )
			);
		}
	}
	/**
	 * Save our settings.
	 */
	public function save() {
		if ( isset( $_POST['scblocks_settings'] ) ) {
			if ( ! check_admin_referer( 'scblocks_settings', 'scblocks_settings' ) ) {
				wp_die( esc_html( __( 'Security check failed.', 'scblocks' ) ) );
			}

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_die( esc_html( __( 'Security check failed.', 'scblocks' ) ) );
			}

			$settings = Plugin::options();
			$values   = $_POST['scblocks'];

			if ( isset( $values['css_print_method'] ) ) {
				$settings['css_print_method'] = sanitize_key( $values['css_print_method'] );
			}
			$regenerate_css = '';
			if ( isset( $values['force_regenerate_css_files'] ) ) {
				$settings['force_regenerate_css_files'] = time();

				$regenerate_css = '&css-files-regenerate=true';
			}

			Plugin::update_options( $settings );

			wp_safe_redirect( admin_url( 'admin.php?page=scblocks-settings&settings-updated=true' . $regenerate_css ) );
			exit;
		}
	}
	/**
	 * Displays the settings page.
	 *
	 */
	public function settings_page() {
		$screen = get_current_screen();

		$notice_success = '';
		$regenerate     = '';

		if ('settings_page_scblocks-settings' === $screen->base && isset( $_GET['settings-updated'] ) && 'true' == $_GET['settings-updated'] ) { // phpcs:ignore -- Just checking, false positive.
			$notice_success = sprintf(
				'<div class="notice notice-success inline"><p><strong>%s</strong></p></div>',
				esc_html__( 'Settings saved.', 'scblocks' )
			);
			if ( isset( $_GET['css-files-regenerate'] ) && 'true' == $_GET['css-files-regenerate'] ) { // phpcs:ignore -- Just checking, false positive.
				$regenerate = 'regenerate';
			}
		}
		?>
		<div class="wrap scblocks-dashboard">
				<div class="scblocks-dashboard-header">
					<h1><?php esc_html_e( 'ScBlocks Settings', 'scblocks' ); ?></h1>
				</div>
				<div class="scblocks-dashboard-content">
					<?php echo $notice_success; // phpcs:ignore -- xss ok ?>
					<form action="options.php" method="post">
						<?php
						wp_nonce_field( 'scblocks_settings', 'scblocks_settings' );
						?>
						<table class="form-table" role="presentation">
							<tbody>
								<tr>
									<th scope="row"><?php esc_html_e( 'CSS Print Method', 'scblocks' ); ?></th>
									<td>		
										<select name="scblocks[css_print_method]">
											<option value="file"<?php selected( 'file', Plugin::option( 'css_print_method' ) ); ?>><?php esc_html_e( 'External File', 'scblocks' ); ?></option>
											<option value="inline"<?php selected( 'inline', Plugin::option( 'css_print_method' ) ); ?>><?php esc_html_e( 'Inline Embedding', 'scblocks' ); ?></option>
										</select>
									</td>
								</tr>
								<tr>
								<th scope="row"><?php esc_html_e( 'Regenerate CSS', 'scblocks' ); ?></th>
									<td>
										<?php if ( ! $regenerate ) : ?>
										<input type="checkbox" id="scblocks-regenerate-css" name="scblocks[force_regenerate_css_files]" value="regenerate">
										<label for="scblocks-regenerate-css"><?php esc_html_e( 'Force your external CSS files to regenerate next time their page is loaded.', 'scblocks' ); ?></label>
										<?php endif; ?>
										<?php if ( $regenerate ) : ?>
										<span class="scblocks-css-will-regenerate"><?php esc_html_e( 'All css files will be regenerated', 'scblocks' ); ?></span>
										<?php endif; ?>
									</td>
								</tr>
								<?php
								do_action( 'scblocks_settings_fields' );
								?>
							</tbody>
						</table>
						<?php
						submit_button();
						?>
					</form>
				</div>
			</div>
		<?php
	}
}
