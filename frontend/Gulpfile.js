var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var connect = require("gulp-connect");


var paths = {
	index: './src/index.html',
	views: './src/views/*.html',
	sass: './src/scss/frontend.scss',
	watchSass: './src/scss/*.scss',
	scripts: ['./src/app/app.js', './src/app/*.js', './src/app/**/*.js'],
	images: './src/images/*',
	fonts: './src/fonts/*',
	dist: './../dist/'
};


var pathsLib = {
	angular: ['./bower_components/angular/angular.min.js', './bower_components/angular-route/angular-route.min.js'],
	scripts: ['./bower_components/jquery/dist/jquery.min.js', './bower_components/jquery-ui.min.js'],
	styles: ['./bower_components/jquery-ui/themes/base/jquery-ui.min.css', './bower_components/font-awesome/css/font-awesome.min.css'],
	fonts: ['./bower_components/font-awesome/fonts/*']
}

gulp.task('html', function(){
	return gulp.src(paths.index)
		.pipe(gulp.dest(paths.dist))
		.pipe(connect.reload());
});

gulp.task('views', function(){
	return gulp.src(paths.views)
		.pipe(gulp.dest(paths.dist + 'views/'))
		.pipe(connect.reload());
});

gulp.task('fonts', function(){
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.dist + 'fonts/'))
});

gulp.task('images', function(){
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.dist + 'images/'))
		.pipe(connect.reload());
});

gulp.task('sass', function(){
	return gulp.src(paths.sass)
		.pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.dist + 'css/'))
		.pipe(connect.reload());
});

gulp.task('scripts', function(){
	return gulp.src(paths.scripts)
		.pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
		.pipe(jshint())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist + 'js/'))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: paths.dist,
    livereload: true
  });
});

gulp.task('assets', ['html', 'views', 'images', 'fonts', 'sass', 'scripts', 'connect']);

gulp.task('coreAngular', function(){
	return gulp.src(pathsLib.angular)
		.pipe(concat('angular.js'))
		.pipe(gulp.dest(paths.dist + 'js/'))
});

gulp.task('coreScripts', function(){
	return gulp.src(pathsLib.scripts)
		.pipe(concat('core.js'))
		.pipe(gulp.dest(paths.dist + 'js/'))
});

gulp.task('coreStyles', function(){
	return gulp.src(pathsLib.styles)
		.pipe(concat('core.css'))
		.pipe(gulp.dest(paths.dist + 'css/'))
});

gulp.task('coreFonts', function(){
	return gulp.src(pathsLib.fonts)
		.pipe(gulp.dest(paths.dist + 'fonts/'))
});

gulp.task('assetsLib', ['coreAngular', 'coreScripts', 'coreStyles', 'coreFonts']);

gulp.task('watch', function(){
	gulp.watch(paths.index, ['html']);
	gulp.watch(paths.views, ['views']);
	gulp.watch(paths.watchSass, ['sass']);
	gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['assets', 'assetsLib']);
gulp.task('dev', ['assets', 'assetsLib', 'watch']);
