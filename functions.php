<?php
/**
 * wordpressgulptheme functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * @package WordPress
 * @subpackage wordpressgulptheme
 * @since wordpressgulptheme 1.0
 */

if ( ! function_exists( 'wordpressgulptheme_setup' ) ) :
function wordpressgulptheme_setup() {

    add_theme_support( 'title-tag' ); // Let WordPress manage the document title.

}
endif; // wordpressgulptheme_setup
add_action( 'after_setup_theme', 'wordpressgulptheme_setup' );


/*
 * Enqueue scripts and styles.
 */
function wordpressgulptheme_enqueue_scripts() {
    wp_enqueue_style( 'bootstrap-core', get_template_directory_uri() . '/dist/styles/bootstrap.min.css', '', '', 'all' );
	wp_enqueue_style( 'wordpressgulptheme-core', get_template_directory_uri() . '/dist/styles/main.min.css', '', '', 'all' );

	if ( !is_admin() ) {
        wp_deregister_script('jquery');
        wp_enqueue_script( 'jquery', get_template_directory_uri() . '/dist/scripts/jquery.min.js', array(), '', true );
    }
	wp_enqueue_script( 'bootstrap-core-js', get_template_directory_uri() . '/dist/scripts/bootstrap.min.js', array(), '', true );
    wp_enqueue_script( 'main-core-js', get_template_directory_uri() . '/dist/scripts/scripts.min.js', array(), '', true );
}
add_action( 'wp_enqueue_scripts', 'wordpressgulptheme_enqueue_scripts' );
