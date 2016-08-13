(function(){

function loadingBarPulse( parent )
{
	if ( !parent )
		return;
	
	if ( parent.parentNode )
	{
		var bar = parent.bar;
		glyph.toggleClass( bar, 'pulse' );
	}
	
	setTimeout( function() { loadingBarPulse( parent ); }, 1 * 1000 );
}

glyph.loadingBar = function( str )
	{
		str = str || '';
		
		var parent = document.createElement( 'div' );
		parent.className = 'glyph_loadingBarOuter';
		
		var bar = document.createElement( 'div' );
		bar.className = 'glyph_loadingBar';
		bar.style.width = '0%';
		parent.appendChild( bar );		
		parent.bar = bar;
		
		var label = document.createElement( 'div' );
		label.className = 'glyph_loadingBarText';
		label.innerHTML = str;
		parent.appendChild( label );
		parent.label = label;
		
		loadingBarPulse( parent );
		
		return parent;
	};
	
glyph.loadingBarProgress = function( parent, progress )
	{
		if ( !parent )
			return;
		
		parent.bar.style.width = parseInt( progress ) + '%';
	};
	
glyph.loadingBarLabel = function( parent, text )
	{
		if ( !parent )
			return;
		
		parent.label.innerHTML = text;
	};

}());
