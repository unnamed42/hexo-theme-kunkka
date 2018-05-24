<div id="sidebar">
	<?php if ( ! function_exists( 'dynamic_sidebar' ) || ! dynamic_sidebar( 'sidebar' ) ) : ?>
		<p><?php _e( 'Please set up widgets at dashboard!', MUTHEME_NAME ); ?></p>
	<?php endif; ?>
</div>
<!-- end #sidebar -->