<?php
/**
 * @name Mutheme main
 * @description Kunkka theme basic functions
 * @version     1.0.0
 * @author      mufeng (http://mufeng.me)
 * @url https://mufeng.me/wordpress-mobile-theme-kunkka.html
 * @package     Kunkka
 **/

// Enqueue theme css and javascript file
add_action( 'wp_enqueue_scripts', 'mutheme_scripts' );
function mutheme_scripts() {
	wp_enqueue_style( 'style', get_bloginfo( 'stylesheet_url' ) );

	//Enqueue jQuery and avoid conflict
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', mutheme_script( 'jquery.min.js' ), false, '1.8.2' );
	wp_enqueue_script( 'jquery', false, false, '1.8.2' );

	wp_enqueue_script( 'kunkka-all', mutheme_script( 'all.js' ), null, MUTHEME_VERSION, false );

	if( is_page_template( 'templates/archives.php' ) ){
		wp_enqueue_script( 'kunkka-archives', mutheme_script( 'archives.js' ), null, MUTHEME_VERSION, false );
	}
}

// Theme setting part
if ( is_admin() ) {
	get_template_part( 'functions/libraries/class.tgm' );
	get_template_part( 'functions/libraries/theme-update-checker' );
	get_template_part( 'functions/mutheme-settings' );

	//Theme update check
	new ThemeUpdateChecker( MUTHEME_NAME, 'https://mufeng.me/wp-admin/admin-ajax.php?action=mutheme_api' );

	// Initialize theme setting
	new Mutheme_settings();
}

// Disable google fonts
add_filter( 'gettext_with_context', 'mutheme_google_fonts', 888, 4 );
function mutheme_google_fonts( $translations, $text, $context, $domain ) {
	if ( 'Open Sans font: on or off' == $context && 'on' == $text ) {
		$translations = 'off';
	}

	return $translations;
}