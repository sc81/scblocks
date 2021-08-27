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
	 * Icon.
	 *
	 * @since 1.3.0
	 * @var string
	 */
	private $icon = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11.448 16H6.392C6.18933 16 6.04 15.9573 5.944 15.872C5.85867 15.776 5.816 15.6267 5.816 15.424V13.552C5.816 13.3493 5.85867 13.2053 5.944 13.12C6.04 13.024 6.18933 12.976 6.392 12.976H10.696C10.8347 12.976 10.936 12.9333 11 12.848C11.0747 12.752 11.112 12.64 11.112 12.512C11.112 12.3307 11.0747 12.1973 11 12.112C10.936 12.0267 10.8347 11.9787 10.696 11.968L8.296 11.632C7.54933 11.5253 6.94667 11.28 6.488 10.896C6.04 10.512 5.816 9.872 5.816 8.976V7.296C5.816 6.38933 6.10933 5.696 6.696 5.216C7.28267 4.72533 8.09333 4.48 9.128 4.48H13.608C13.8107 4.48 13.9547 4.528 14.04 4.624C14.136 4.70933 14.184 4.85333 14.184 5.056V6.96C14.184 7.16267 14.136 7.312 14.04 7.408C13.9547 7.49333 13.8107 7.536 13.608 7.536H9.88C9.74133 7.536 9.63467 7.584 9.56 7.68C9.48533 7.76533 9.448 7.87733 9.448 8.016C9.448 8.15467 9.48533 8.272 9.56 8.368C9.63467 8.464 9.74133 8.51733 9.88 8.528L12.264 8.848C13.0107 8.95467 13.6133 9.2 14.072 9.584C14.5307 9.968 14.76 10.608 14.76 11.504V13.184C14.76 14.0907 14.4613 14.7893 13.864 15.28C13.2773 15.76 12.472 16 11.448 16ZM12.744 5.92H9.192C8.70133 5.92 8.30667 6.05867 8.008 6.336C7.70933 6.60267 7.56 6.94933 7.56 7.376V8.688C7.56 9.12533 7.64533 9.42933 7.816 9.6C7.99733 9.76 8.22667 9.86667 8.504 9.92L11.88 10.608C12.1787 10.672 12.4133 10.8 12.584 10.992C12.7653 11.1733 12.856 11.5147 12.856 12.016V12.944C12.856 13.3707 12.7067 13.7227 12.408 14C12.12 14.2667 11.7307 14.4 11.24 14.4H7.256V14.56H11.24C11.784 14.56 12.216 14.4107 12.536 14.112C12.856 13.8027 13.016 13.4133 13.016 12.944V12.016C13.016 11.4613 12.9093 11.0773 12.696 10.864C12.4933 10.6507 12.232 10.512 11.912 10.448L8.536 9.76C8.29067 9.71733 8.09333 9.62133 7.944 9.472C7.79467 9.32267 7.72 9.06133 7.72 8.688V7.376C7.72 7.00267 7.85333 6.69333 8.12 6.448C8.38667 6.20267 8.744 6.08 9.192 6.08H12.744V5.92Z" /><path d="M2 1H0V19H2V1Z" /><path d="M20 0H0V2H18V18H0V20H20V0Z" /></svg>';

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
			'data:image/svg+xml;base64,' . base64_encode( $this->icon )
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
				<?php
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo $this->icon;
				?>
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
