<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

    <div class="site-wrapper">

        <div class="site-wrapper-inner">

            <div class="cover-container">

                <div class="inner cover">
                    <h1 class="cover-heading"><?php bloginfo( 'name' ); ?></h1>
                    <p class="lead"><?php bloginfo( 'description' ); ?></p>
                </div>

            </div>

        </div>

    </div>

    <?php wp_footer(); ?>
</body>
</html>
