<?php
/**
 * @name Mutheme basic
 * @description Theme basic functions
 * @version     1.0.0
 * @author      mufeng (http://mufeng.me)
 * @url https://mufeng.me/wordpress-mobile-theme-kunkka.html
 * @package     Kunkka
 **/

/**
 * Override wp-head
 */
function mutheme_head() {
	?>
	<?php if ( is_home() ) { ?><title><?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description' ); ?></title><?php } ?>
	<?php if ( is_search() ) { ?><title><?php _e( 'Search&#34;', MUTHEME_NAME );the_search_query();echo "&#34;"; ?> - <?php bloginfo( 'name' ); ?></title><?php } ?>
	<?php if ( is_single() ) { ?><title><?php echo trim( wp_title( '', 0 ) ); ?> - <?php bloginfo( 'name' ); ?></title><?php } ?>
	<?php if ( is_author() ) { ?><title><?php wp_title( "" ); ?> - <?php bloginfo( 'name' ); ?></title><?php } ?>
	<?php if ( is_archive() ) { ?><title><?php single_cat_title(); ?> - <?php bloginfo( 'name' ); ?></title><?php } ?>
	<?php if ( is_year() ) { ?><title><?php the_time( 'Y' ); ?> - <?php bloginfo( 'name' ); ?></title><?php } ?>
	<?php if ( is_month() ) { ?><title><?php the_time( 'F' ); ?> - <?php bloginfo( 'name' ); ?></title><?php } ?>
	<?php if ( is_page() ) { ?><title><?php echo trim( wp_title( '', 0 ) ); ?> - <?php bloginfo( 'name' ); ?></title><?php } ?>
	<?php if ( is_404() ) { ?><title>404 - <?php bloginfo( 'name' ); ?></title><?php } ?>
	<?php
	global $post;
	if ( is_home() ) {
		$keywords    = mutheme_settings( 'keywords' );
		$description = mutheme_settings( 'description' );
	} elseif ( is_single() ) {
		$keywords = get_post_meta( $post->ID, "keywords", true );
		if ( $keywords == "" ) {
			$tags = wp_get_post_tags( $post->ID );
			foreach ( $tags as $tag ) {
				$keywords = $keywords . $tag->name . ",";
			}
			$keywords = rtrim( $keywords, ', ' );
		}
		$description = get_post_meta( $post->ID, "description", true );
		if ( $description == "" ) {
			if ( $post->post_excerpt ) {
				$description = $post->post_excerpt;
			} else {
				$description = mutheme_excerpt( $post->post_content, 200 );
			}
		}
	} elseif ( is_page() ) {
		$keywords    = get_post_meta( $post->ID, "keywords", true );
		$description = get_post_meta( $post->ID, "description", true );
	} elseif ( is_category() ) {
		$keywords    = single_cat_title( '', false );
		$description = category_description();
	} elseif ( is_tag() ) {
		$keywords    = single_tag_title( '', false );
		$description = tag_description();
	}
	$keywords    = trim( strip_tags( $keywords ) );
	$description = trim( strip_tags( $description ) );
	?>
	<meta name="keywords" content="<?php echo $keywords; ?>"/>
	<meta name="description" content="<?php echo $description; ?>"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
	<link rel="Shortcut Icon" href="<?php echo mutheme_settings( 'favicon' ); ?>" type="image/x-icon"/>
	<?php wp_head(); ?>
<?php
}

/**
 * Get the theme setting
 *
 * @param string $key
 *
 * @return mixed
 */
function mutheme_settings( $key ) {
	$defaults = array(
		'color'                     => 'default',
		'description'               => '',
		'keywords'                  => '',
		'tag_number'                => 25,
		'avatar'                    => 1,
		'cdn'                       => 0,
		'thumbnail'                 => 0,
		'register_widget'           => 0,
		'fixed_navigation'          => 0,
		'full-content'              => 0,
		'disable_global_navigation' => 0
	);

	$settings = get_option( MUTHEME_NAME . '_settings' );
	$settings = wp_parse_args( $settings, $defaults );

	return $settings[ $key ];
}

/**
 * Theme file path
 *
 * @param $path
 *
 * @return string
 */
function mutheme_path( $path ) {
	$file_path = MUTHEME_PATH . '/' . $path;

	return $file_path;
}

/**
 * Theme file url
 *
 * @param $file_path
 *
 * @return string
 */
function mutheme_file_url( $file_path ) {
	$file_path = MUTHEME_THEME_URL . '/' . $file_path;

	return $file_path;
}

/**
 * Theme css style url
 *
 * @param  string $style_name
 *
 * @return string
 */
function mutheme_style( $style_name ) {
	$style_url = mutheme_file_url( 'public/css/' . $style_name );

	return $style_url;
}

/**
 * Theme javascript files url
 *
 * @param string $script_name
 *
 * @return string
 */
function mutheme_script( $script_name ) {
	$script_url = mutheme_file_url( 'public/js/' . $script_name );

	return $script_url;
}

/**
 * Theme image files url
 *
 * @param string $image_name
 *
 * @return string
 */
function mutheme_image( $image_name ) {
	$image_url = mutheme_file_url( 'public/images/' . $image_name );

	return $image_url;
}

/**
 * Post excerpt
 *
 * @param string $content
 * @param int    $limit
 *
 * @return string
 */
function mutheme_excerpt( $content, $limit = 100 ) {
	if ( $content ) {
		$content = preg_replace( "/\[.*?\].*?\[\/.*?\]/is", "", $content );
		$content = mb_strimwidth( strip_tags( apply_filters( 'the_content', $content ) ), 0, $limit, "..." );
	}

	return strip_tags( $content );
}

/**
 * Like weibo time style
 *
 * @param string $older_date
 * @param bool   $comment_date
 *
 * @return string
 */
function mutheme_time_since( $older_date, $comment_date = false ) {
	$chunks = array(
		array( 24 * 60 * 60, __( ' days ago', MUTHEME_NAME ) ),
		array( 60 * 60, __( ' hours ago', MUTHEME_NAME ) ),
		array( 60, __( ' minutes ago', MUTHEME_NAME ) ),
		array( 1, __( ' seconds ago', MUTHEME_NAME ) )
	);

	$newer_date = time();
	$since      = abs( $newer_date - $older_date );

	if ( $since < 30 * 24 * 60 * 60 ) {
		for ( $i = 0, $j = count( $chunks ); $i < $j; $i ++ ) {
			$seconds = $chunks[ $i ][0];
			$name    = $chunks[ $i ][1];
			if ( ( $count = floor( $since / $seconds ) ) != 0 ) {
				break;
			}
		}
		$output = $count . $name;
	} else {
		$output = $comment_date ? date( 'Y-m-d H:i', $older_date ) : date( 'Y-m-d', $older_date );
	}

	return $output;
}

/**
 * Post views
 */
function mutheme_views() {
	if ( function_exists( 'the_views' ) ) {
		global $post;
		?>
		<li class="inline-li"><span class="post-span">·</span></li>
		<li class="inline-li"><?php echo mutheme_views_count() . __( ' views', MUTHEME_NAME ); ?></li>
	<?php
	}
}

/**
 * Post views count
 *
 * @param $post_id
 *
 * @return mixed|string
 */
function mutheme_views_count( $post_id = null ) {
	global $post;

	if ( ! $post_id ) {
		$post_id = $post->ID;
	}

	$post_views = get_post_meta( $post_id, 'views', true );

	if ( $post_views > 1000 ) {
		$post_views = sprintf( "%.2fk", $post_views / 1000 );
	}

	return $post_views;
}

/**
 * Post like
 */
function mutheme_likes() {
	if ( function_exists( 'wp_zan' ) ) {
		?>
		<li class="inline-li"><span class="post-span">·</span></li>
		<li class="inline-li"><?php wp_zan(); ?></li>
	<?php
	}
}

/**
 * Thumbnail for post
 *
 * @param string $type
 * @param int    $width
 * @param int    $height
 *
 * @return array
 */
function mutheme_thumbnail( $type = 'full', $width = 0, $height = 0 ) {
	global $post;

	$result = array(
		'exist' => false,
		'url'   => null,
		'size'  => array( $width, $height ),
		'crop'  => true
	);

	$size_array = array(
		'full'            => array( $width, $height ),
		'index-thumbnail' => array( 260, 260 )
	);
	
	if ( has_post_thumbnail() ) {
		$attachment_image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), $type );

		$result['exist'] = true;
		$result['url']   = $attachment_image[0];

		// correct image size that don't need crop
		if ( $size_array[ $type ][0] == $attachment_image[1] && $size_array[ $type ][1] == $attachment_image[2] ) {
			$result['crop'] = false;
		}

	} else if ( ! mutheme_settings( 'thumbnail' ) ) {
		ob_start();
		ob_end_clean();

		//filter all the images in the post content
		preg_match_all( '/\<img.+?src="(.+?)".*?\/>/is', $post->post_content, $matches, PREG_SET_ORDER );
		$count = count( $matches );

		if ( $count > 0 ) {
			$result['exist'] = true;
			$result['url']   = $matches[0][1];
		}
	}

	return $result;
}

/**
 * Theme file cdn setting
 *
 * @param array|string $obj
 * @param int          $width
 * @param int          $height
 * @param bool         $is_avatar
 *
 * @return string
 */
function mutheme_cdn( $obj, $width = 0, $height = 0, $is_avatar = false ) {
	$url       = '';
	$need_crop = true;
	$cdn_type  = mutheme_settings( 'cdn' );

	if ( is_array( $obj ) ) {
		$url       = $obj['url'];
		$width     = $obj['size'][0];
		$height    = $obj['size'][1];
		$need_crop = $obj['crop'];
	} else if ( is_string( $obj ) ) {
		$url = $obj;
	}

	if ( $cdn_type == 0 ) {
		//don't use any cdn services
		if ( $need_crop && !$is_avatar) {
			$url = sprintf( '%s&#63;src=%s&#38;w=%s&#38;h=%s&#38;zc=1&#38;q=100', mutheme_file_url( 'timthumb.php' ), urlencode( $url ), $width, $height );
		}

	} else if ( $cdn_type == 1 ) {
		//qiniu cdn service
		$url .= "?imageView/1/w/{$width}/h/{$height}/q/100";

	} else if ( $cdn_type == 2 ) {
		//youpai cdn service
		$url .= "!{$width}x{$height}";

	}

	return $url;
}

/**
 * Theme pagenavi
 *
 * @param int $space
 */
function mutheme_pagenavi( $space = 5 ) {
	if ( is_singular() ) {
		return;
	}

	global $wp_query, $paged;
	$max_page = $wp_query->max_num_pages;

	if ( $max_page == 1 ) {
		return;
	}
	if ( empty( $paged ) ) {
		$paged = 1;
	}

	if ( $paged > 1 ) {
		printf( '<a class="page-numbers" href="%s" title="%s">%s</a>', esc_html( get_pagenum_link( $paged - 1 ) ), '« Previous', '«' );
	}
	if ( $paged > $space + 2 ) {
		echo '<span class="page-numbers">...</span>';
	}
	for ( $i = $paged - $space; $i <= $paged + $space; $i ++ ) {
		if ( $i > 0 && $i <= $max_page ) {
			if ( $i == $paged ) {
				echo "<span class='page-numbers current'>{$i}</span>";
			} else {
				printf( '<a class="page-numbers" href="%s" title="page %s">%s</a>', esc_html( get_pagenum_link( $i ) ), $i, $i );
			}
		}
	}
	if ( $paged < $max_page - $space - 1 ) {
		echo '<span class="page-numbers">...</span>';
	}
	if ( $paged < $max_page ) {
		printf( '<a class="page-numbers" href="%s" title="%s">%s</a>', esc_html( get_pagenum_link( $paged + 1 ) ), 'Next »', '»' );
	}
}