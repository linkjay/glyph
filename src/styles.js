glyph.ready( function()
	{
		var style = document.createElement( 'style' );
		style.type = 'text/css';
		style.innerHTML = '//%- GLYPH_STYLES -%//';
		document.getElementsByTagName( 'head' )[0].appendChild( style );
	});