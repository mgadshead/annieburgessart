<?php

function register_my_menu() {
  register_nav_menu('menu',__( 'Menu' ));
}

add_action( 'init', 'register_my_menu' );

function load_styles() {

  $style_path = plugin_dir_path( __FILE__ ) . 'css/style.css';
  $style_version = date("Ymd-Gis", filemtime( $style_path ));

  wp_enqueue_style('fonts', 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap', array(), null);
  wp_enqueue_style('normalize', 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css', array(), null);
  wp_enqueue_style('lightgallery', get_template_directory_uri().'/css/lightgallery.min.css', array('normalize'), null);
  wp_enqueue_style('hamburgers', get_template_directory_uri().'/css/hamburgers-min.css', array('lightgallery'), null);
  wp_enqueue_style('style', get_template_directory_uri().'/css/style.css', array('hamburgers'), $style_version);

}

add_action( 'wp_enqueue_scripts', 'load_styles');

function customjQuery() {

	wp_deregister_script('jquery');
	wp_enqueue_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js', array(), null, true);

}

add_action('wp_enqueue_scripts', 'customjQuery');

function load_scripts() {

  $script_path = plugin_dir_path( __FILE__ ) . 'js/main-min.js';
  $script_version = date("Ymd-Gis", filemtime( $script_path ));

  wp_enqueue_script('touchwipe', get_template_directory_uri().'/js/jquery.touchwipe.1.1.1.js', array('jquery'), null, true);
  wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js', array(), null, true);
  wp_enqueue_script('barba', 'https://unpkg.com/@barba/core', array(), null, true);
  wp_enqueue_script('lightgallery', 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.7.0/js/lightgallery.min.js', array('jquery'), null, true);
  wp_enqueue_script('lazysizes', 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js', array('lightgallery'), null, true);
  wp_enqueue_script('main', get_template_directory_uri().'/js/main-min.js', array('lazysizes'), $script_version, true);

}

add_action( 'wp_enqueue_scripts', 'load_scripts');