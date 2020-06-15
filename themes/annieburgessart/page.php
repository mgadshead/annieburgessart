<?php get_header(); ?>
<?php 
if ( have_posts() ) : 
    while ( have_posts() ) : the_post(); ?>
    <div class="container" data-barba="container" data-barba-namespace="page">
        <div class="column-container">
            <h2><?php the_title(); ?></h2>
            <div class="page-content">
                <?php the_content(); ?>
            </div>
        </div>
    </div>
<?php endwhile; 
endif; 
?>
<?php get_footer(); ?>