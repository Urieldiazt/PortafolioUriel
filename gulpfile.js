//Gulp
const {src, dest, watch, parallel} = require('gulp');

//Css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourceMaps = require('gulp-sourcemaps');

//imaganes
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imageMin = require('gulp-imagemin');
const cache = require('gulp-cache'); 

//js
const terserjs = require('gulp-terser-js');


function css(done){
    src('src/scss/**/*.scss') //Identificar el archivo
        .pipe(sourceMaps.init())
        .pipe(plumber())
        .pipe(sass()) //Copilar sass
        .pipe(postCss([autoprefixer(), cssnano()]))
        .pipe(sourceMaps.write('.'))
        .pipe(dest('build/css')) //Almacenar en dico duro
    done(); //call back a terminado la ejecucion
}

function js(done){
    src('src/js/**/*.js') //Indetifixar el archivo
        .pipe(sourceMaps.init())
        .pipe(terserjs())
        .pipe(sourceMaps.write('.'))
        .pipe(dest('build/js')) //Almacenar en disco duro
    done();
}


function formatoAvif(done){
    const opcion = {
        quality:50
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opcion))
        .pipe(dest('build/img'))
    done();
}

function formatoWebp(done){
    const option = {
        quality:50
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(option))
        .pipe(dest('build/img'))
    done();
}


function formatoImagemin(done){
    const option = {
        optimizationLevel:3
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(imageMin(cache(option)))
        .pipe(dest('build/img'))
    done();
}



function dev(done){
        watch('src/scss/**/*.scss', css);
        watch('src/js/**/*.js', js)
    done();
}

exports.css = css;
exports.js = js;
exports.formatoAvif = formatoAvif;
exports.formatoWebp = formatoWebp;
exports.formatoImagemin = formatoImagemin;
exports.dev = parallel(formatoAvif, formatoWebp, formatoImagemin, dev);


