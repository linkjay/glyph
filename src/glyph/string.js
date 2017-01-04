(function(){

glyph.empty = function( str )
	{
		if ( !str || str === '' || str.length === 0 )
			return true;
		
		return false;
	};
	
glyph.insertStrAt = function( txt, str, index )
	{
		return str.substr( 0, index ) + txt + str.substr( index );
	};

glyph.concat = function( object, encode )
	{
		var result = '';
		
		for ( var k in object )
		{
			var v = object[k];
			
			if ( encode )
			{
				k = glyph.encode( k );
				v = glyph.encode( v );
			}
			
			result += '&' + k + '=' + v;
		}
		
		return result.substr( 1 );
	};
	
glyph.sanitize = function( s )
	{
		return s.replace( '&', '%26' );
	};
	
glyph.encode = function( str )
	{		
		return encodeURIComponent( str );
	};
	
glyph.inStr = function( needle, haystack )
	{
		return haystack.indexOf( needle ) != -1;
	};
	
glyph.strCount = function( needle, haystack )
	{
		return haystack.split( needle ).length - 1;
	};
	
glyph.htmlDecode = function( str )
	{
		var tempDiv = document.createElement( 'div' );
		tempDiv.innerHTML = str;
		str = tempDiv.textContent;
		
		return str;
	};

glyph.htmlEncode = function( str )
	{
		var tempDiv = document.createElement( 'div' );
		tempDiv.textContent = str;
		str = tempDiv.innerHTML;
		
		return str;
	};
	
glyph.strcmp = function ( a, b )
	{
		if ( a.toString() < b.toString() ) return -1;
		if ( a.toString() > b.toString() ) return  1;
		return 0;
	};
	
glyph.split = function( str, del, limit )
	{
		var arr = str.split( del );
		var res = arr.splice( 0, limit );
		res.push( arr.join( del ) );
		return res;
	};

glyph.regex = function( reg, str )
	{
		var matches, output = [];
		while ( matches = reg.exec( str ) )
			output.push( matches[1] );
		return output;
	};
	
}());
