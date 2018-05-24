<div id="comments">
	<?php
	if ( isset( $_SERVER['SCRIPT_FILENAME'] ) && 'comments.php' == basename( $_SERVER['SCRIPT_FILENAME'] ) ) {
		die(__('Please don\'t directly loading the page, thanks!', MUTHEME_NAME));
	}

	if ( post_password_required() ) { ?>
		<p class="nocomments"><?php _e( 'This article requires a password, enter the password to access.' , MUTHEME_NAME); ?></p>
		<?php
		return;
	}
	?>

	<?php if ( have_comments() ) : ?>
		<div class="comments-data">
			<?php _e( 'Comments' , MUTHEME_NAME); ?> (<?php echo $post->comment_count;?>)
		</div>
		<div class="comments-container">
			<ol class="commentlist clearfix">
				<?php wp_list_comments( 'type=comment&callback=mutheme_comment' ); ?>
			</ol>
			<div class="comments-data comments-data-footer clearfix">
				<?php if ( 'open' != $post->comment_status ) : ?>
					<h2 class="comments-title"><?php _e( 'Comments Closed.' , MUTHEME_NAME); ?></h2>
				<?php else : ?>
					<div class="comment-topnav"><?php paginate_comments_links( 'prev_text=«&next_text=»' ); ?></div>
					<h2 class="comments-title"><?php _e( 'Leave a reply' , MUTHEME_NAME); ?></h2>
				<?php endif; ?>
			</div>
		</div>
	<?php else : ?>
		<?php if ( 'open' != $post->comment_status ) : ?>
			<h2 class="comments-title"><?php _e( 'Comments Closed.' , MUTHEME_NAME); ?></h2>
		<?php endif; ?>
	<?php endif; ?>
	<?php if ( comments_open() ) : ?>
		<div id="respond" class="respond">
		<form method="post" action="<?php echo site_url('wp-comments-post.php');?>" id="comment_form">
		<div id="cancel-comment-reply"><?php cancel_comment_reply_link() ?></div>
		<?php if ( get_option( 'comment_registration' ) && ! is_user_logged_in() ) : ?>
			<p class="title welcome"><?php printf( __( 'You need <a href="%s">login</a> to reply.', MUTHEME_NAME ), wp_login_url( get_permalink() ) ); ?></p>
		<?php else : ?>
			<?php if ( is_user_logged_in() ) : ?>
				<p class="title welcome"><?php printf( __( 'Welcome <a href="%1$s">%2$s</a> back，', MUTHEME_NAME ), get_option( 'siteurl' ) . '/wp-admin/profile.php', $user_identity ); ?>
					<a href="<?php echo wp_logout_url( get_permalink() ); ?>"
					   title="<?php _e( 'Log out of this account' , MUTHEME_NAME); ?>"><?php _e( 'Log out »' , MUTHEME_NAME); ?></a></p>
			<?php else : ?>
				<?php if ( $comment_author != "" ): ?>
					<p class="title welcome">
						<?php _e( 'Welcome', MUTHEME_NAME ); ?><?php printf('<strong>%s</strong>.', $comment_author ) ?><?php _e( 'back, ' , MUTHEME_NAME); ?>
						<a id="edit_author"><?php _e( 'Edit »' , MUTHEME_NAME); ?></a>
						<span class="cancel-comment-reply"><?php cancel_comment_reply_link() ?></span>
					</p>
					<div id="author_info" class="author_hide">
					<script type="text/javascript">document.getElementById('edit_author').onclick = function () {
							document.getElementById('author_info').style.display = "block"};</script>
				<?php else : ?>
					<div id="author_info">
				<?php endif; ?>
				<p>
					<label for="author">
						<small><?php _e( 'Name', MUTHEME_NAME ); ?> *</small>
					</label>
					<input type="text" name="author" id="author" class="text" size="15"
					       value="<?php echo $comment_author; ?>"/>
				</p>
				<p>
					<label for="mail">
						<small><?php _e( 'Email', MUTHEME_NAME ); ?> *</small>
					</label>
					<input type="text" name="email" id="mail" class="text" size="15"
					       value="<?php echo $comment_author_email; ?>"/>
				</p>
				<p>
					<label for="url">
						<small><?php _e( 'Website', MUTHEME_NAME ); ?></small>
					</label>
					<input type="text" name="url" id="url" class="text" size="15"
					       value="<?php echo $comment_author_url; ?>"/>
				</p>
				</div>
			<?php endif; ?>
			<div id="author_textarea">
				<textarea name="comment" id="comment" class="textarea" rows="4" tabindex="4"
				          onkeydown="if(event.ctrlKey&&event.keyCode==13){document.getElementById('submit').click();return false};"></textarea>
			</div>
			<p><input id="submit" type="submit" name="submit" value="<?php _e( 'Submit / Ctrl+Enter', MUTHEME_NAME ); ?>"
			          class="submit"/></p>
			<?php comment_id_fields(); ?>
			<?php do_action( 'comment_form', $post->ID ); ?>
			</form>
			</div>
		<?php endif; ?>
	<?php endif; ?>

</div>