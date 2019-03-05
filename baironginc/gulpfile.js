var gulp = require('gulp')
var uglify = require('gulp-uglify')
var pipeline = require('readable-stream').pipeline
var less = require('gulp-less')
var path = require('path')
var cleanCSS = require('gulp-clean-css')
var rename = require('gulp-rename')
var immin = require('gulp-imagemin')
var htmlmin = require('gulp-htmlmin')
var browserSync = require('browser-sync')
//参数1： 任务名
//参数2： [] 数组内可以书写依赖任务(书写名字即可)
//参数3： 任务回调函数
//
gulp.task('default', ['less'], () => {

        //参数1：要监听的文件路径（其实就是src）
        //参数2：要执行的任务
        gulp.watch('assets/style/*.less', ['less'])
        browserSync.init({
                server: {
                        baseDir: './'
                }
        }
        )
        })


        //JS压缩
        gulp.task('uglifyJs', () => {

                return pipeline(
                        gulp.src('src/*.js'),
                        uglify(),
                        rename(function (path) {
                                path.basename += '.min'
                        }),
                        gulp.dest('dist/js')
                );
        })

        //less
        gulp.task('less', () => {

                //文件原路径
                return gulp.src('assets/style/*.less')
                        //less编译插件
                        .pipe(less({
                                paths: [path.join(__dirname, 'less', 'includes')]
                        }))
                        //压缩CSS文件
                        .pipe(cleanCSS({ compatibility: 'ie8' }))
                        //重命名
                        .pipe(rename(function (path) {
                                // { dirname: '.', basename: 'a', extname: '.js' }
                                // dirname 文件目录  basename 文件名  extname 后缀名
                                // path.basename += '.min'//方式1
                                path.extname = '.min.css'    //方式2
                        }))
                        //输出路径
                        .pipe(gulp.dest('dist/css'));
        })


        //图片压缩
        gulp.task('images', () => {
                gulp.src('assets/imgs/*')
                        .pipe(immin())
                        .pipe(rename(function (path) {
                                path.basename += '.min'
                        }))
                        .pipe(gulp.dest('dist/imgs'))
        })


        //HTML网页压缩
        gulp.task('html', () => {
                return gulp.src('*.html')
                        .pipe(htmlmin({ collapseWhitespace: true }))
                        .pipe(gulp.dest('dist'));
        })

// })