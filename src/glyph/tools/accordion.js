(function(){

glyph.accordionToggle = function( el, toggleByButton )
	{
		var container = el;
		var button = el;
		if ( toggleByButton )
			container = button.container;
		else
			button = container.button;
		var contents = container.contents;
			
		var max = 0;
		if ( !glyph.hasClass( contents, 'expanded' ) )
		{
			var oldMax = contents.style.maxHeight;
			contents.style.maxHeight = 'none';
			max = contents.clientHeight;
			contents.style.maxHeight = oldMax;
		}
		else
			contents.style.maxHeight = '0';
		
		glyph.toggleClass( button, 'expanded' );
		glyph.toggleClass( contents, 'expanded' );
		setTimeout( function() { contents.style.maxHeight = max + 'px'; }, 10 );
	};

glyph.accordion = function( container )
	{
		if ( !container )
		{
			container = glyph.create( 'div' );
			container.className = 'glyph_accordion';
		}
		
		var header = glyph.create( 'div' );
		header.className = 'header';
		container.appendChild( header );
		
		var button = glyph.create( 'div' );
		button.className = 'button';
		button.container = container;
		button.onclick = function() { glyph.accordionToggle( this, true ); };
		header.appendChild( button );
		
		var label = glyph.create( 'span' );
		label.className = 'label';
		header.appendChild( label );
		
		var contents = glyph.create( 'div' );
		contents.className = 'contents';
		container.appendChild( contents );
		
		header.label = label;
		header.button = button;
		container.header = header;
		container.button = button;
		container.label = label;
		container.contents = contents;
		
		if ( glyph.hasClass( container, 'autoexpand' ) )
			setTimeout( function() { glyph.accordionToggle( button, true ); }, 100 );
		
		return container;	
	};
	
glyph.ready( function()
	{
		var containers = document.getElementsByClassName( 'glyph_accordion' );
		for ( var i=0; i < containers.length; i++ )
		{
			var title = containers[i].getAttribute( 'title' ) || '';
			var contents = containers[i].innerHTML;
			containers[i].innerHTML = '';
					
			var c = glyph.accordion( containers[i] );
			c.contents.innerHTML = contents;
			c.label.innerHTML = title;		
		}
	});

}());
