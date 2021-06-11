<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Our admin Dashboard.
 *
 * @since 1.3.0
 */
class Dashboard {
	/**
	 * Register actions.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function register_actions() {
		add_action( 'admin_menu', array( $this, 'register_menu_page' ), 9 );
		add_filter( 'admin_body_class', array( $this, 'add_admin_body_class' ) );
		add_action( 'in_admin_header', array( $this, 'header' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'global_styles' ) );
	}

	/**
	 * Register the menu page.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function register_menu_page() {
		$dashboard = add_menu_page(
			__( 'ScBlocks', 'scblocks' ),
			__( 'ScBlocks', 'scblocks' ),
			'manage_options',
			'scblocks',
			array( $this, 'display' ),
			// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
			'data:image/svg+xml;base64,' . base64_encode( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 13"><path fill="#fff" d="M15.57 2.845L14.238 1.51c-.13-.13-.353-.13-.48 0L6.66 8.623l-3.093-3.11c-.13-.13-.352-.13-.482 0L1.75 6.845c-.128.13-.128.352 0 .48l4.67 4.67c.073.055.147.092.24.092s.167-.037.24-.093l8.67-8.67c.13-.13.13-.35 0-.48z"/></svg>' )
		);

		add_submenu_page(
			'scblocks',
			__( 'Dashboard', 'scblocks' ),
			__( 'Dashboard', 'scblocks' ),
			'manage_options',
			'scblocks'
		);

		add_action( "admin_print_styles-$dashboard", array( $this, 'styles' ) );
	}
	/**
	 * Enqueue styles for submenu page.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function styles() {
		wp_enqueue_style(
			'scblocks-dashboard',
			SCBLOCKS_PLUGIN_URL . 'assets/css/dashboard.css',
			array( 'wp-components' ),
			filemtime( SCBLOCKS_PLUGIN_DIR . 'assets/css/dashboard.css' )
		);
	}

	/**
	 * Enqueue styles for all our pages.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function global_styles() {
		if ( $this->is_page() ) {
			wp_enqueue_style(
				'scblocks-dashboard-global',
				SCBLOCKS_PLUGIN_URL . 'assets/css/dashboard-global.css',
				array( 'wp-components' ),
				filemtime( SCBLOCKS_PLUGIN_DIR . 'assets/css/dashboard-global.css' )
			);
		}
	}

	/**
	 * Get a list of our Dashboard pages.
	 *
	 * @since 1.3.0
	 * @return array
	 */
	public function page_list() : array {
		return apply_filters(
			'scblocks_dashboard_screen_name',
			array(
				'toplevel_page_scblocks',
				'scblocks_page_scblocks-settings',
			)
		);
	}

	/**
	 * Add admin body class.
	 *
	 * @since 1.3.0
	 *
	 * @param string $classes The existing classes.
	 * @return string
	 */
	public function add_admin_body_class( string $classes ) : string {
		if ( $this->is_page() ) {
			$classes .= ' scblocks-dashboard-page';
		}
		return $classes;
	}

	/**
	 * Check if the user visits our page.
	 *
	 * @since 1.3.0
	 *
	 * @return boolean
	 */
	public function is_page() : bool {
		return in_array( get_current_screen()->id, $this->page_list(), true );
	}

	/**
	 * Header.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function header() {
		if ( ! $this->is_page() ) {
			return;
		}
		?>
		<div class="scblocks-dashboard-header">
			<div class="scblocks-dashboard-header-title">
				<h1>
					<?php echo esc_html( get_admin_page_title() ); ?>
				</h1>
			</div>

		<?php $this->navigation(); ?>
		</div>
		<?php
	}

	/**
	 * Navigation.
	 *
	 * @since 1.3.0
	 * @return void
	 */
	public function navigation() {
		$screen = get_current_screen();

		$tabs = apply_filters(
			'scblocks_dashboard_tabs',
			array(
				'dashboard' => array(
					'name'  => __( 'Dashboard', 'scblocks' ),
					'url'   => admin_url( 'admin.php?page=scblocks' ),
					'class' => 'toplevel_page_scblocks' === $screen->id ? 'active' : '',
				),
				'settings'  => array(
					'name'  => __( 'Settings', 'scblocks' ),
					'url'   => admin_url( 'admin.php?page=scblocks-settings' ),
					'class' => 'scblocks_page_scblocks-settings' === $screen->id ? 'active' : '',
				),
			)
		);

		?>
		<div class="scblocks-navigation">
		<?php
		foreach ( $tabs as $tab ) {
			printf(
				'<a href="%1$s" class="%2$s">%3$s</a>',
				esc_url( $tab['url'] ),
				esc_attr( $tab['class'] ),
				esc_html( $tab['name'] )
			);
		}
		?>
		</div>
		<?php
	}

	/**
	 * Output our Dashboard HTML.
	 *
	 * @since 1.3.0
	 *
	 * @return void
	 */
	public function display() {
		?>
		<div class="wrap scblocks-dashboard-wrap">
			<div class="scblocks-dashboard-intro">
				<?php esc_html_e( 'Build WordPress sites easily and quickly with ScBlocks', 'scblocks' ); ?>
			</div>
		</div>
		<?php
	}
}
