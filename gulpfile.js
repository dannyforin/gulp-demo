//加载gulp模块
const gulp = require('gulp')
//加载sass模块
const sass = require('gulp-sass')
// 加载clean模块
const clean = require('gulp-clean')
// html公用代码复用
const include = require('gulp-file-include')
//引入gulp-connect模块
const connect = require('gulp-connect')
//添加sass
gulp.task('scss', function () {
  return gulp
    .src('./src/css/*.scss') //编译的文件
    .pipe(sass()) //执行编译
    .pipe(gulp.dest('./src/css/')) //输出文件
    .pipe(connect.reload())
})
// html公用代码复用
gulp.task('include', async function () {
  gulp
    .src(['./src/*.html']) //主文件
    .pipe(
      include({
        prefix: '@@', //变量前缀 @@include
        basepath: './src/module', //引用文件路径
        indent: true //保留文件的缩进
      })
    )
    .pipe(gulp.dest('./src/')) //输出文件路径
})

// 开启服务器
gulp.task('connect', function () {
  connect.server({
    root: './src', //根目录
    livereload: true, //自动更新
    port: 9909 //端口
  })
})

// 监听html
gulp.task('devHtml', function () {
  return gulp.src(['./src/*.html']).pipe(connect.reload())
})

// 监听开启
gulp.task('watch', function () {
  // gulp.watch('./src/module', gulp.series('include))
  // gulp.watch('./src/module/*.html', gulp.series('include'))
  gulp.watch('./src/*.html', gulp.series('devHtml'))
  gulp.watch('./src/css/*.scss', gulp.series('scss'))
})

// 传输css
gulp.task('css', function () {
  return gulp.src('./src/css/*').pipe(gulp.dest('./dist/css')) //输出文件
})

// 传输图片
gulp.task('img', function () {
  return gulp.src('./src/img/*').pipe(gulp.dest('./dist/img'))
})

// 传输html
gulp.task('html', function () {
  return gulp.src('./src/*.html').pipe(gulp.dest('./dist'))
})

// 传输js
gulp.task('js', function () {
  return gulp.src('./src/js/*.js').pipe(gulp.dest('./dist/js'))
})

// 清除dist
gulp.task('clean', function () {
  return gulp.src('./dist').pipe(clean())
})
// 执行任务
gulp.task('dev', gulp.series(gulp.parallel('connect', 'watch')))
gulp.task('build', gulp.series(gulp.parallel('html', 'css', 'img', 'js')))
