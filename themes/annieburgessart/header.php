<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
        <title><?php bloginfo('name'); ?><?php if (!is_front_page()) { ?> - <?php echo the_title(); } ?></title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/img/favicon.png">
        <?php wp_head(); ?>
	</head>
	<body data-barba="wrapper">
        <header>
            <button class="hamburger hamburger--slider" type="button">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </button>
            <div class="menu-container">
                <?php wp_nav_menu(array(
                    'theme_location' => 'menu',
                    'container' => false 
                )); ?>
                <div class="false-header"></div>
            </div>
            <h1>
                <a href="<?php echo site_url(); ?>" />
                    <?php bloginfo('name'); ?>
                    <!-- <span class="header-page-title"><?php if (!is_front_page() && basename(get_page_template()) !== 'page.php') { ?> - <?php the_title(); ?></span><?php } ?> -->
                </a>
            </h1>
        </header>