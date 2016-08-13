(function(){

glyph.mousePos = { x: 0, y: 0 };

function mouseMoved( event )
{
	event = event || window.event;
	
	glyph.mousePos = { 	x: event.clientX, 
					y: event.clientY	};
}
glyph.event( window, 'mousemove', mouseMoved );

glyph.mouseDown = false;
glyph.event( window, 'mousedown', function() { glyph.mouseDown = true; } );
glyph.event( window, 'mouseup', function() { glyph.mouseDown = false; } );

glyph.mouseOffset = function( el )
	{
		var bounds = glyph.bounds( el );
		return {
					x: glyph.mousePos.x - bounds.left,
					y: glyph.mousePos.y - bounds.top
				};
	};

glyph.isUnderPos = function( el, pos )
	{
		var p = {};
		if ( glyph.isArray( pos ) )
		{
			p.x = coord[0];
			p.y = coord[1];
		}
		else
			p = pos;
		
		var bounds = glyph.bounds( el );
		if ( 	p.x > bounds.left &&
				p.x < bounds.right &&
				p.y > bounds.top &&
				p.y < bounds.bottom )
					return true;
		return false;
	};

glyph.isUnderMouse = function( el )
	{
		return glyph.isUnderPos( el, glyph.mousePos );
	};

glyph.isMouseOver = function( el )
	{
		return glyph.underMouse(true).indexOf( el ) != -1;
	};

glyph.underMouse = function( toArray )
	{
		if ( toArray === true )
			return glyph.toArray( document.querySelectorAll( ':hover' ) );
		return document.querySelectorAll( ':hover' );
	};

glyph.mouseDist = function( coord )
	{
		var c = {};
		if ( glyph.isArray( coord ) )
		{
			c.x = coord[0];
			c.y = coord[1];
		}
		else
			c = coord;
		
		var d1 = glyph.dist( glyph.mousePos.x, c.x );
		var d2 = glyph.dist( glyph.mousePos.y, c.y );
		return d1 + d2;
	};
	

glyph._rce = false;
function handleRightClick( e )
{
	var elements = glyph.underMouse();
	for ( var i = 0; i < elements.length; i++ )
	{
		var el = elements[i];
		
		var func = null;
		if ( el.getAttribute( 'onrightclick' ) !== null )
			func = el.getAttribute( 'onrightclick' );
		else if ( typeof el.onrightclick != 'undefined' )
			func = el.onrightclick;
		
		if ( func !== null )
		{
			if ( typeof func == 'string' )
			{
				glyph._rce = el;
				func = func.replace( /this/g, 'glyph._rce' );
				eval( func );
			}
			else
				func();
			e.preventDefault();
		}		
	}
}
glyph.event( document, 'contextmenu', handleRightClick );

}());
