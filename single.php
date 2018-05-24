<?php get_header(); ?>
	<div id="primary">
		<div class="breadcrumb-navigation">
			<a rel="bookmark" href="<?php echo home_url(); ?>"><?php _e('Home', MUTHEME_NAME);?></a>
			<?php the_post(); ?>
			<span class="breadcrumb-arrow"></span><?php if($category=get_the_category($post->ID)) echo (get_category_parents($category[0]->term_id, TRUE, '<span class="breadcrumb-arrow"></span>')); ?><?php the_title(); ?>
			<?php rewind_posts(); ?>
		</div>
		<?php if ( have_posts() ):while ( have_posts() ) : the_post(); ?>
			<div id="post-<?php the_ID(); ?>" class="single-post">
				<div class="post-header">
					<h2 class="post-title"><a href="<?php the_permalink(); ?>"
					                          title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
				</div>
				<div class="post-meta">
					<ul class="inline-ul">
						<li class="inline-li">
							<?php echo mutheme_time_since(strtotime($post->post_date_gmt)); ?>
						</li>
						<li class="inline-li">
							<span class="post-span">·</span>
						</li>
						<li class="inline-li">
							<?php the_category( ' , ' ); ?>
						</li>
						<?php mutheme_views(); ?>
						<li class="inline-li">
							<span class="post-span">·</span>
						</li>
						<li class="inline-li">
							<?php comments_popup_link( __('0 reply', MUTHEME_NAME), __('1 reply', MUTHEME_NAME), __('% replies', MUTHEME_NAME) ); ?>
						</li>
						<?php mutheme_likes(); ?>
					</ul>
				</div>
				<div class="post-body clearfix">
					<div class="post-content"><?php the_content( '' ); ?></div>
				</div>
				<div class="post-tags">
					<?php the_tags('', '', ''); ?>
				</div>
			</div>
		<?php endwhile; endif; ?>
		<?php comments_template(); ?>
	</div>
	<!-- #primary -->
<?php get_sidebar(); ?>
<?php get_footer(); ?>