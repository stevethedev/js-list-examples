var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    concat  = require('gulp-concat');

var tasks = {
    'interface': function() {
        return gulp.src('src/interface.js')
            .pipe(concat('interface.js'))
            .pipe(gulp.dest('dist'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    },
    'list-interface': function() {
        return gulp.src([
                'src/interface.js',
                'src/list-interface.js',
            ])
            .pipe(concat('list-interface.js'))
            .pipe(gulp.dest('dist'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    },
    'node-interface': function() {
        return gulp.src([
                'src/interface.js',
                'src/node-interface.js',
            ])
            .pipe(concat('node-interface.js'))
            .pipe(gulp.dest('dist'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    },
    'sl-node-interface': function() {
        return gulp.src([
                'src/interface.js',
                'src/node-interface.js',
                'src/sl-node-interface.js',
            ])
            .pipe(concat('sl-node-interface.js'))
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
