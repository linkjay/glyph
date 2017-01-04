(function(){

glyph.parseJSON = function( a )
	{
		try
		{
			return JSON.parse( a );
		}
		catch ( e )
		{
			return undefined;
		}
	};

var callbackNum = 0;
glyph.jsonp = function( url, func )
	{
		var fn = func;
		if ( typeof func === 'function' )
		{
			fn = 'glyph_jsonp_' + callbackNum++;
			window[ fn ] = func;
		}
		
		var tag = document.createElement( 'script' );
		tag.src = glyph.addParam( url, 'callback=' + fn );
		
		var head = document.getElementsByTagName( 'head' )[0];
		head.appendChild( tag );
		head.removeChild( tag );	
	};

}());
