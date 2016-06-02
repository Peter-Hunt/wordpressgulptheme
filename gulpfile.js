
/**
 * Gulpfile
 *
 * Simple task runner to process
 *  1. Styles, Less to CSS, autoprefixing, sourcemaps, media query merges and minification.
 *  2. Scripts, concatenates and uglifies custom JS files.
 *  3. Images, minify images
 *  4. fonts, copy font files from source to distribution folder
 *  5. Live browser reloads with Browser-Sync
 */

var gulp = require('gulp');

// CSS plugins
var less = require('gulp-less'); // Less for Gulp
var cssnano = require('gulp-cssnano'); // Minify CSS with cssnano
var autoprefixer = require('gulp-autoprefixer'); // Prefix CSS
var mmq = require('gulp-merge-media-queries'); // Combine matching media queries into one media query definition.

// JS plugins
var concat = require('gulp-concat'); // Concatenates files
var jshint = require('gulp-jshint'); // JSHint plugin for gulp
var uglify = require('gulp-uglify'); // Minify files with UglifyJS

// Image plugins
var imagemin = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images

// Utility plugins
var notify = require('gulp-notify'); // Sends message notification
var rename = require('gulp-rename'); // Rename files
var clean = require('gulp-clean'); // A gulp plugin for removing files and folders
var sourcemaps = require('gulp-sourcemaps'); // Source map support for Gulp
var browserSync = require('browser-sync'); // Live CSS Reload & Browser Syncing
var reload = browserSync.reload;


/**
 * Configuration
 *
 * Project config for gulp tasks
 * Edit the variables as per the project requirements
 */

var projectURL = 'wordpress.dev';

var fontsDist = 'dist/fonts/';
var imagesDist = 'dist/images/';
var scriptsDist = 'dist/scripts/';
var stylesDist = 'dist/styles/';



gulp.task( 'browser-sync', function() {
    browserSync.init( {
        proxy: projectURL,
    } )
});


const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];


gulp.task( 'fonts', function() {
    gulp.src( '/src/fonts/**/*.{eot,svg,ttf,woff,woff2}' )
        .pipe( gulp.dest( fontsDist ) )
        .pipe( notify( { message: 'TASK: "fonts" completed!', onLast: true } ) )
});


gulp.task( 'images', function() {
    gulp.src( 'src/images/**/*.{png,jpg,gif,svg}' )
        .pipe( imagemin( {
            progressive: true,
            optimizationLevel: 4,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}]
        } ) )
        .pipe( gulp.dest( imagesDist ) )
        .pipe( notify( {  message: 'TASK: "images" completed!', onLast: true } ) )
});


gulp.task( 'scripts', function() {
    gulp.src( 'src/scripts/**/*.js' )
        .pipe( sourcemaps.init() )
        .pipe( jshint() )
        .pipe( jshint.reporter( 'default' ) )
        .pipe( concat( 'scripts.js' ) )
        .pipe( gulp.dest( scriptsDist ) )
        .pipe( uglify( {
            output: {
                'ascii_only': true
            }
        }))
        .pipe( rename({ suffix: '.min' }) )
        .pipe( sourcemaps.write( '../../' + scriptsDist ) )
        .pipe( gulp.dest( scriptsDist ) )
        .pipe( browserSync.stream() )
        .pipe( notify( { message: 'TASK: "scripts" completed!', onLast: true } ) )
});


gulp.task( 'styles', function() {
    gulp.src( 'src/styles/main.less' )
        .pipe( sourcemaps.init() )
        .pipe( less() )
        .pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )
        .pipe( gulp.dest( stylesDist ) )
        .pipe( mmq( { log: true } ) )
        .pipe( cssnano() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write( '../../' + stylesDist ) )
        .pipe( gulp.dest( stylesDist ) )
        .pipe( browserSync.stream() )
        .pipe( notify( { message: 'TASK: "styles" completed!', onLast: true } ) )
});


gulp.task( 'vendors', function() {
    // BootStrap CSS
    gulp.src( ['./node_modules/bootstrap/dist/css/*', '!./node_modules/bootstrap/dist/css/*theme*'] )
        .pipe( gulp.dest( stylesDist ) )
        .pipe( notify( { message: 'TASK: "vendors -Bootstrap css" completed!', onLast: true } ) )

    // BootStrap JS
    gulp.src( './node_modules/bootstrap/dist/js/*' )
        .pipe( gulp.dest( scriptsDist ) )
        .pipe( notify( { message: 'TASK: "vendors -Bootstrap js" completed!', onLast: true } ) )

    // BootStrap Fonts
    gulp.src( './node_modules/bootstrap/dist/fonts/*' )
        .pipe( gulp.dest( fontsDist ) )
        .pipe( notify( { message: 'TASK: "vendors -Bootstrap fonts" completed!', onLast: true } ) )

    // jQuery
    gulp.src( './node_modules/jquery/dist/*' )
        .pipe( gulp.dest( scriptsDist ) )
        .pipe( notify( { message: 'TASK: "vendors -jQuery" completed!', onLast: true } ) )
});



gulp.task( 'clean', function() {
    gulp.src( ['dist/fonts/**/*', 'dist/images/**/*', 'dist/scripts/**/*', 'dist/styles/**/*'], {read: false} )
    .pipe( clean() )
    .pipe( notify( { message: 'TASK: "clean" completed!', onLast: true } ) )
});

gulp.task( 'default', ['clean', 'fonts', 'images', 'styles', 'scripts', 'vendors'] );

gulp.task( 'watch', ['default', 'browser-sync'], function() {
    gulp.watch( 'src/styles/**/*.less', ['styles'] )
    gulp.watch( 'src/scripts/**/*.js', ['scripts'] )
    gulp.watch( '**/*.php', reload )
});
