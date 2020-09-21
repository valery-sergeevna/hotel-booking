const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    uglifyEs = require('gulp-uglify-es').default;

//delete dist before build
gulp.task('clean', async () => {
    del.sync('dist');
});

//scss
gulp.task('scss', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.reload({ stream: true }));
});

//libs css
gulp.task('css', () => {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/slick-carousel/slick/slick-theme.css'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('src/scss'))
        .pipe(browserSync.reload({ stream: true }));
});

//html
gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(browserSync.reload({ stream: true }));
});

//scripts
gulp.task('script', () => {
    return gulp.src('src/js/*.js')
        .pipe(browserSync.reload({ stream: true }));
});

//libs js
gulp.task('js', () => {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({ stream: true }));
});
//ja concat
gulp.task('js-concat', () => {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({ stream: true }));
});

//server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
});

//build project
gulp.task('export', () => {
    const buildHtml = gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));

    const buildCss = gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    const buildAssets = gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));

    //uglify script.js
    const buildJs = gulp.src('src/js/script.min.js')
        .pipe(gulp.dest('dist/js'));
});
//watch
gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch('src/js/*.js', gulp.parallel('script'));
});

gulp.task('build', gulp.series('clean', 'export'));
gulp.task('jscript', gulp.series('js', 'js-concat'));

gulp.task('default', gulp.parallel('css', 'scss', 'jscript', 'browser-sync', 'watch'));
