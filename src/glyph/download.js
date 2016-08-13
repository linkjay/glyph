(function(){

glyph.canDownload = function()
	{
		// common
		if ( !self.URL || !self.Blob )
			return false;
		
		// ie
		if ( navigator.msSaveBlob )
			return true;
	
		// html5
		var a = document.createElement( 'a' );
		if ( 'download' in a )
			return true;
		
		return false;
	};
	
glyph.downloadFile = function( data, filename )
	{		
		var mime_type = 'application/octet-stream';
		var encoding = 'utf-8';
		
		var blob = new Blob( [ data ], { type: mime_type } );
		
		// ie
		if ( navigator.msSaveBlob )
			return navigator.msSaveBlob( blob, filename );
		
		// html5
		var a = document.createElement( 'a' );
		if ( 'download' in a )
		{
			var url = URL.createObjectURL( blob );
			a.href = url;
			a.setAttribute( 'download', filename );
			
			document.body.appendChild( a );
			setTimeout( function()
						{
							a.click();
							document.body.removeChild( a );
							setTimeout( function() { URL.revokeObjectURL( url ); }, 1000 );
						}, 66);
			
			return true;
		}
		
		return false;
	};
	
}());
