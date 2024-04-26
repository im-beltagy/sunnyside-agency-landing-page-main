const gulp = require("gulp"),
  connect = require("gulp-connect"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer");

// Compile Pug Files
gulp.task("compile-pug", () =>
  gulp
    .src("./stage/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("./docs/"))
    .pipe(connect.reload())
);

// Compile Sass Files With Prefixes
gulp.task("compile-sass", () =>
  gulp
    .src("./stage/sass/main.sass")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest("./docs/"))
    .pipe(connect.reload())
);

// Redirect Images
gulp.task("redirect-images", () =>
  gulp.src("./stage/images/**/*.*").pipe(gulp.dest("./docs/images/"))
);

// Start Server & Watch Changes
gulp.task("default", () => {
  connect.server({
    root: "./docs/",
    livereload: true,
  });
  gulp.watch(
    "./stage/**/*.pug",
    gulp.series(["compile-pug", "redirect-images"])
  );
  gulp.watch("./stage/**/*.sass", gulp.series("compile-sass"));
});
