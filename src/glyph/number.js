(function(){

glyph.toStr = function( num )
	{
		return num + '';
	};

glyph.pad = function( num, size )
	{
		var s = glyph.toStr( num );
		while ( s.length < size )
			s = '0' + s;
		return s;
	};

glyph.formatNum = function( value, places )
	{	
		places = places || 2;
		var num = parseFloat( value ); // parse field value into float

		// check if negative
		var neg = false;
		if ( value < 0 )
		{
			neg = true;
			num = Math.abs( value );
		}
		
		num = num.toFixed( places ).split('.'); // 2 decimal values, split into array

		var numArray = num[0].toString().split(''); // character array before decimal point
		numArray.reverse(); // we want to iterate through the array back to front
		
		var splitIndices = []; // array of all indices where we need a comma
		
		// loop through each character in number
		for ( var i = 0; i < numArray.length; i++ )
			if ( i % 3 === 0 && i !== 0 ) // if divisible by 3
				splitIndices.push( i ); // we need a comma at i
				
		// loop through split indices and add commas
		for ( var i = 0; i < splitIndices.length; i++ )
		{
			numArray.splice( splitIndices[i], 0, ',' ); // add comma
			
			// loop through again
			for ( var j = 0; j < splitIndices.length; j++ )
				splitIndices[j] = splitIndices[j] + 1; // offset by 1
		}
				
		numArray.reverse(); // make the array forwards again

		var val = numArray.join('') + '.' + num[1]; // piece number back together

		
		// add negative sign back
		if ( neg )
			val = '-' + val;
		
		return val;
	};
	
glyph.parseNum = function( num )
	{
		num = num.replace( /$/g, '' );
		num = num.replace( /,/g, '' );
		return parseFloat( num );
	};

}());
