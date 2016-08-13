var glyph = function( s )
	{
		return document.getElementById( s );
	};

// why ie...
if ( !window.console ) window.console = {};
if ( !window.console.log ) window.console.log = function() {};

glyph.version = 'wip';
console.log( '$ using glyph-' + glyph.version );

/* events */	
glyph.event = function( target, name, callback )
{
	if ( target.addEventListener )
		target.addEventListener( name, function( e ) { return callback( e ); }, false );
	else if ( target.attachEvent )
		target.attachEvent( 'on' + name, function( e ) { return callback( e ); } );
};

glyph.removeEvent = function( target, name, callback )
	{
		target.removeEventListener( name, callback );
	};
	
glyph.ready = function( callback )
{
	if ( document.readyState == 'complete' )
		callback();
	else
		glyph.event( document, 'DOMContentLoaded', callback );
};
