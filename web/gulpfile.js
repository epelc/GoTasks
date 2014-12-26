// Gulp dependencies
var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var minifyCSS = require('gulp-minify-css')
var htmlMin = require('gulp-html-minifier')
var rename = require("gulp-rename")
var gulpif = require('gulp-if')
var gutil = require('gulp-util')

// Webpack
var webpackreg = require("webpack")
var webpack = require('gulp-webpack')
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin')

var path = require('path')
var argv = require('yargs').argv

var pkg = require('./package.json')


var scssPath = 'scss/**/*.scss'


// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
function displayError(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']'
    errorString += ' ' + error.message.replace("\n", '') // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if (error.fileName)
        errorString += ' in ' + error.fileName

    if (error.lineNumber)
        errorString += ' on line ' + error.lineNumber

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString)
}

gulp.task("webpack", function() {
    var webpackConfig = {
        output: {
            // Import this in your html it will contain all our js
            // note you can break this up into chunks if you need to
            // refer to their docs for more info
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                    test: /\.css$/,
                    loaders: ["style", "css"]
                },
                // the url-loader uses DataUrls.
                // the file-loader emits files.
                {
                    test: /\.woff$/,
                    loader: "url-loader?limit=10000&minetype=application/font-woff"
                }, {
                    test: /\.ttf$/,
                    loader: "file-loader"
                }, {
                    test: /\.eot$/,
                    loader: "file-loader"
                }, {
                    test: /\.svg$/,
                    loader: "file-loader"
                }
            ]
        },
        resolve: {
            alias: {
                css: path.join(__dirname, "src/css"),
                moment: path.join(__dirname, "bower_components/moment/moment.js"),
                hammer: path.join(__dirname, "bower_components/hammerjs/hammer.js"),
                material: path.join(__dirname, "bower_components/angular-material/angular-material"),
                // If you prefix all js imports with app this will fix any import duplication issues
                // caused by relative imports
                app: path.join(__dirname, "src/app")
            },
            // Makes webpack look in these directories which is nice
            "modulesDirectories": ["node_modules", "bower_components"]
        },
        externals: {
            angular: "angular"
        },
        plugins: [
            // Adds the given requires to every module even if they dont require() them
            new webpackreg.ProvidePlugin({
                // ngMaterial requires hammerjs but doesnt use webpack so we need this
                Hammer: "hammer"
            })
        ]
    }

    var buildInfo = {
        VERSION: JSON.stringify(pkg.version),
        DEVMODE: false
    }

    if (argv.dev) {
        // Development
        buildInfo.DEVMODE = true

    } else {
        // Production
        console.log("Building production js")
        webpackConfig.plugins = webpackConfig.plugins.concat([
            new ngAnnotatePlugin(),
            new webpackreg.optimize.UglifyJsPlugin()
        ])
    }

    webpackConfig.plugins.push(new webpackreg.DefinePlugin(buildInfo))

    return gulp.src('src/app/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/app/'))
})

gulp.task("html", function() {
    return gulp.src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
            conservativeCollapse: true
        }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('scss', function() {
    //take all files from scss compile then minify then put them in www/css folder
    return gulp.src(scssPath)
        .on('error', function(err) {
            displayError(err)
        })
        .pipe(sass({
            //for bootstrap to work correctly
            // this may not be required anymore isnce we use angular-material now
            precision: 10,
            sourcemap: false
        }))
        // if devmode do nothing otherwise minify
        // note !argv.dev doesnt work
        .pipe(gulpif(argv.dev, gutil.noop(), minifyCSS()))
        .pipe(gulp.dest('dist/css/'))
})

// Copies angular-material css files to scss/material/*.scss since you cant @import css files in scss
gulp.task('prep-material', function() {
    return gulp.src('bower_components/angular-material/*.css')
        .pipe(rename({
            // Make it a partial
            prefix: "_",
            extname: ".scss"
        }))
        .pipe(gulp.dest('scss/material'))
})

//copy image files over to dist folder
gulp.task('img', function() {
    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('dist/'))
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'))
})

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(scssPath, ['scss'])
    gulp.watch('src/**/*.js', ['webpack'])
    gulp.watch('src/**/*.html', ['html'])
    gulp.watch('src/img/*', ['img'])
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['prep-material', 'scss', 'html', 'webpack', 'img'])

// Copy our static files into the right places
gulp.task('static', ['prep-material'])
