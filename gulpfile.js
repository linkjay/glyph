var gulp = require( 'gulp' );

var jshint = require( 'gulp-jshint' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var insert = require( 'gulp-insert' );
var cleanCSS = require( 'gulp-clean-css' );

const execSync = require( 'child_process' ).execSync;
const fs = require( 'fs' );
const path = require( 'path' );

function catchError( e )
{
	console.log( e.toString() );
	this.emit( 'end' );
}


// check code
gulp.task( 'lint', function()
	{
		return gulp
			.src( 'src/**/*.js' )
			.pipe( jshint() )
			.pipe( jshint.reporter( 'unix' ) )
			.on( 'error', catchError );
	});


// concat css
function addFileHeader( contents, file )
{
	var comment = '/* ---- ' + file.path.replace( file.base, '' ) + ' ---- */\n';
	return comment + contents.trim() + '\n';
}

gulp.task( 'styles', [ 'lint' ], function()
	{
		return gulp
			.src( 'src/**/*.css' )
			.pipe( insert.transform( addFileHeader ) )
			.pipe( concat( 'glyph-styles.css' ) )
			.pipe( gulp.dest( 'styles' ) )
			.pipe( rename( 'glyph-styles.min.css' ) )
			.pipe( cleanCSS() )
			.pipe( gulp.dest( 'styles' ) )
			.on( 'error', catchError );
	});


// concat and minify javascript
var gitrev = execSync( 'git describe --long --dirty=-wip --always' ).toString().trim();

var byline = '\
/* ========== glyph-'+gitrev+' ========== */\n\
/* = copyright doug tyrrell @ dougty.com = */\n\
/* = released under BSD-2-Clause license = */\n\
/* === license: https://goo.gl/kwdWuL ==== */\n\n';

var min_byline = '/* glyph-'+gitrev+' (c) doug tyrrell, licensed under BSD-2-Clause: https://goo.gl/kwdWuL */\n';

gulp.task( 'scripts', [ 'styles' ], function()
	{
		var css_path = 'styles/glyph-styles.min.css';
		var compiled_css = fs.readFileSync( css_path, 'utf8' );
		compiled_css = compiled_css.replace( /'/g, '"' ).replace( /\\/g, '\\\\' ).replace( /\r/g, '' ).replace( /\n/g, ' ' ).replace( /\t/g, ' ' )
		
		return gulp
			.src([
					'src/index.js',
					'src/glyph/*.js',
					'src/glyph/tools/*.js',
					'src/shortcuts.js',
					'src/styles.js'
				])
			.pipe( insert.transform( addFileHeader ) )
			.pipe( concat( 'glyph.js' ) )
			.pipe( insert.transform( function( contents, file )
				{
					contents = contents.replace('//%- GLYPH_STYLES -%//', compiled_css );
					contents = contents.replace( /glyph.version = .+;/g, 'glyph.version = "' + gitrev + '";' );
					return byline + contents.trim();
				}))
			.pipe( gulp.dest( 'dist' ) )
			.pipe( rename( 'glyph.min.js' ) )
			.pipe( uglify().on( 'error', catchError ) )
			.pipe( insert.transform( function( contents, file )
				{
					return min_byline + contents;
				}))
			.pipe( gulp.dest( 'dist' ) )
			.on( 'error', catchError );
	});


// watch for more changes
gulp.task( 'watch', [ 'scripts' ], function()
	{
		gulp.watch( 'src/**/*.{js,css}', [ 'lint', 'styles', 'scripts' ] );
	});

gulp.task( 'default', [ 'lint', 'styles', 'scripts', 'watch' ] );
