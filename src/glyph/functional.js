(function(){

glyph.inArray = function( item, arr )
	{
		if ( arr.indexOf( item ) != -1 )
			return true;
		return false;
	};
	
glyph.isArray = function( arr )
	{
		if ( Array.isArray( arr ) )
			return true;
		return false;
	};
	
glyph.toArray = function( obj )
	{
		return Object.keys( obj ).map( function( k ) { return obj[k]; } );
	};
	
glyph.clone = function( arr )
	{
		return arr.slice( 0 );
	};
	
glyph.forEach = function( el, func )
	{
		if ( typeof Array.prototype.forEach != 'function' )
		{
			for ( var i = 0; i < el.length; i++ )
				func.apply( el, [ el[i], i ] );
			return;
		}
		
		Array.prototype.forEach.call( el, func );
	};
	
glyph.cancelEvent = function( e )
	{
		if ( e.stopPropagation )
			e.stopPropagation();
		if ( e.preventDefault )
			e.preventDefault();
	};
	
glyph.eventTarget = function( e )
	{
		var target = e.target || e.srcElement;
		return target;
	};
	
}());
