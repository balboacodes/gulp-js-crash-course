// https://gulpjs.com/docs/en/api/src
// https://gulpjs.com/docs/en/api/dest
// https://gulpjs.com/docs/en/api/parallel
// https://gulpjs.com/docs/en/getting-started/using-plugins
const { src, dest, parallel } = require('gulp');

// https://www.npmjs.com/package/gulp-rev/
const rev = require('gulp-rev');

const html = () => {

  // https://www.npmjs.com/package/gulp-htmlmin/
  const htmlmin = require('gulp-htmlmin');

  return src('src/*.html')
    .pipe(htmlmin({
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true
    }))
    .pipe(rev())
    .pipe(dest('dist'));
};

const css = () => {
  // https://www.npmjs.com/package/gulp-sass
  const sass = require('gulp-sass');
  sass.compiler = require('node-sass');

  // https://www.npmjs.com/package/gulp-postcss/
  const postcss = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');
  const cssnano = require('cssnano');

  return src('src/*.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rev())
    .pipe(dest('dist'));
};

const js = () => {
  // https://www.npmjs.com/package/gulp-babel/
  const babel = require('gulp-babel');

  // https://www.npmjs.com/package/gulp-uglify/
  const uglify = require('gulp-uglify');

  return src('src/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(rev())
    .pipe(dest('dist'));
};

// https://gulpjs.com/docs/en/getting-started/creating-tasks
exports.build = parallel(html, css, js);
