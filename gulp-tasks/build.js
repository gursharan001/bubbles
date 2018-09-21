var gulp = require("gulp");
var gulpif = require("gulp-if");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");

gulp.task("build", ["clean"],
    function () {
        var tsproj = ts.createProject("./tsconfig.json");
        var files = ["src/**/*.*"];

        return gulp
            .src(files,
            {
                base: "."
            })
            .pipe(sourcemaps.init())
            .pipe(gulpif(/\.ts$/, tsproj(ts.reporter.fullReporter(true))))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("dist"));
    });
