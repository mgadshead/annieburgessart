<?php 
/************************
 Template Name: Portfolio
 ***********************/
get_header(); ?>
<div class="container" data-barba="container" data-barba-namespace="portfolio">
	<ul id="gallery">
        <?php
        $counter = 0;
		if( have_rows('portfolio') ):
            while ( have_rows('portfolio') ) : the_row(); ?>
                <?php
                    $image = get_sub_field('image');
                    $list_item_width = $image['width'] + 8; // accounting for padding around image
                    $list_item_height = $image['height'] + 8; // accounting for padding around image
                    $aspect_ratio_padding = ($list_item_height / $list_item_width) * 100;
                    $counter++;
                ?>
                <li data-src="<?php echo $image['url']; ?>"<?php if ($image['caption']) { ?> data-sub-html=".caption-<?php echo $counter; ?>"<?php } ?> style="padding-top:<?php echo $aspect_ratio_padding; ?>%">
                    <img data-src="<?php echo $image['url']; ?>" class="lazyload" width="<?php echo $image['width']; ?>" height="<?php echo $image['height']; ?>" />
                    <?php if ($image['caption']) { ?><div class="caption-<?php echo $counter; ?>" style="display: none;"><?php echo $image['caption']; ?></div><?php } ?>
                </li>
			<?php endwhile;
		endif;
		?>
	</ul>
</div>
<?php get_footer(); ?>