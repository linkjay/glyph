(function(){

glyph.TwoPi = 2 * Math.PI;

glyph.rand = function( min, max )
	{
		return Math.random() * ( max - min ) + min;
	};

glyph.randInt = function( min, max )
	{
		return Math.floor( ( Math.random() * max ) + min );
	};
	
glyph.round = function( num, places )
	{
		num = parseFloat( num );
		places = places || 0;
		return Number( Math.round( num + 'e' + places ) + 'e-' + places );
	};
	
glyph.lerp = function( v0, v1, w )
	{
		return v0 + (v1 - v0) * w;
	};
	
glyph.clamp = function( num, min, max )
	{
		return Math.min( Math.max( num, min ), max );
	};
	
glyph.smoothstep = function( edge0, edge1, x )
	{
		x = glyph.clamp( ( x - edge0 ) / ( edge1 - edge0 ), 0.0, 1.0 ); 
		return x * x * ( 3 - 2 * x );
	};


function toHex( val )
{
	var hex = val.toString( 16 );
	if ( hex.length == 1 )
		hex = '0' + hex;
	return hex;
}

glyph.rgbToHex = function( r, g, b )
	{		
		return '#' + toHex( r ) + toHex( g ) + toHex( b );
	};

glyph.rgbStringToHex = function( rgb )
	{
		rgb = /(\d+\s*,\s*\d+\s*,\s*\d+\s*)/.exec( rgb )[1];
		
		rgb = rgb.split( ',' );
		for ( var i in rgb )
			rgb[i] = parseInt( rgb[i] );
		
		return glyph.rgbToHex( rgb[0], rgb[1], rgb[2] );
	};

glyph.hexToRGB = function( hex )
	{
		if ( hex[0] == '#' )
			hex = hex.substring( 1, hex.length );
		
		if ( hex.length == 3 )
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		
		return {
				r: parseInt( hex.substring( 0, 2 ), 16 ),
				g: parseInt( hex.substring( 2, 4 ), 16 ),
				b: parseInt( hex.substring( 4, 6 ), 16 )
			};
	};

glyph.hexToRGBString = function( hex )
	{
		var rgb = glyph.hexToRGB( hex );
		return rgb.r + ', ' + rgb.g + ', ' + rgb.b;
	};
	

glyph.closestPoT = function( n )
	{
		return Math.pow( 2, Math.round( Math.log( n ) / Math.log( 2 ) ) );
	};
	
glyph.dist = function( n1, n2 )
	{
		return Math.abs( n1 - n2 );
	};

}());
