var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    concat  = require('gulp-concat'),
    jshint  = require('gulp-jshint');

var tasks = {
    'interface': function() {
        return gulp.src('src/interface.js')
            .pipe(jshint('gulp/jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('interface.js'))
            .pipe(gulp.dest('dist'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    },
    'sl-list': function() {
        return gulp.src([
                'src/interface.js',
                'src/node-interface.js',
                'src/sl-node-interface.js',
                'src/list-interface.js',
                'src/node.js',
                'src/sl-node.js',
                'src/sl-list.js',
            ])
            .pipe(jshint('gulp/jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('sl-list.js'))
            .pipe(gulp.dest('dist'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    },
};

for (var task in tasks) {
    gulp.task(task, tasks[task]);
}

gulp.task('default', [], function() {
    gulp.start(...Object.keys(tasks));
});
