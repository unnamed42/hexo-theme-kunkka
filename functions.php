<?php
/**
 * @name Functions
 * @description Wordpress theme default functions file
 * @version     1.0.0
 * @author      mufeng (http://mufeng.me)
 * @url https://mufeng.me/wordpress-mobile-theme-kunkka.html
 * @package     Kunkka
 **/

/**
 * Define constants
 */
define( 'MUTHEME_NAME', 'Kunkka' );
define( 'MUTHEME_VERSION', '1.0.6' );
define( 'MUTHEME_PATH', dirname( __FILE__ ) );
define( "MUTHEME_THEME_URL", get_bloginfo( 'template_directory' ) );

/**
 * Import core function files
 */
get_template_part( 'functions/mutheme-basic' );
get_template_part( 'functions/mutheme-function' );
get_template_part( 'functions/mutheme-widget' );
get_template_part( 'functions/mutheme-main' );

/**
 * Add rss feed
 */
add_theme_support( 'automatic-feed-links' );

/**
 * Enable link manager
 */
add_filter( 'pre_option_link_manager_enabled', '__return_true' );

/**
 * Add post thumbnail
 */
add_theme_support( 'post-thumbnails' );

/**
 * Disable symbol automatically converted to full ban
 */
remove_filter( 'the_content', 'wptexturize' );

/**
 * Remove invalid information display at head tag
 */
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'start_post_rel_link' );
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'adjacent_posts_rel_link' );

/**
 * Remove default wordpress widgets
 */
if( !mutheme_settings('register_widget') ){
	add_action( 'widgets_init', 'mutheme_unregister_default_widgets', 1 );
}
function mutheme_unregister_default_widgets() {
	unregister_widget( 'WP_Widget_Pages' );
	unregister_widget( 'WP_Widget_Calendar' );
	unregister_widget( 'WP_Widget_Archives' );
	unregister_widget( 'WP_Widget_Links' );
	unregister_widget( 'WP_Widget_Meta' );
	unregister_widget( 'WP_Widget_Search' );
	unregister_widget( 'WP_Widget_Text' );
	unregister_widget( 'WP_Widget_Categories' );
	unregister_widget( 'WP_Widget_Recent_Posts' );
	unregister_widget( 'WP_Widget_Recent_Comments' );
	unregister_widget( 'WP_Widget_RSS' );
	unregister_widget( 'WP_Nav_Menu' );
	unregister_widget( 'WP_Widget_Tag_Cloud' );
}

/**
 * Post thumbnail custom sizes
 */
if ( function_exists( 'add_image_size' ) ) {
	add_image_size( 'index-thumbnail', 250, 250, true );
}

/**
 * Register wordpress menu
 */
if ( function_exists( 'register_nav_menus' ) ) {
	register_nav_menus( array(
		'top-menu'    => __( 'Top menu', MUTHEME_NAME ),
		'global-menu' => __( 'Dropdown menu', MUTHEME_NAME )
	) );
}

/**
 * Register sidebar
 */
if ( function_exists( 'register_sidebar' ) ) {
	register_sidebar( array(
		'name'          => 'sidebar',
		'id'            => 'sidebar-page',
		'before_widget' => '<div></div>',
		'before_title'  => '<h1>',
		'after_title'   => '</h1>'
	) );
}

/**
 * Register theme languages files
 */
load_theme_textdomain( MUTHEME_NAME, mutheme_path( 'languages' ) );