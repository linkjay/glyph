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

}());
