var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('pug', function() {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .on('end', browserSync.reload);
})

gulp.task('sass', function() {
    return gulp.src('src/static/sass/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({}))
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/static/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('watch', function() {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/static/sass/**/*.sass', gulp.series('sass'))
});

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'sass'),
    gulp.parallel('watch', 'serve')
));