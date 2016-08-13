(function(){

glyph.modal = function( params )
	{		
		if ( !params )
			params = {};
		
		var existing = glyph.id( 'glyph_modal' );
		if ( existing )
			glyph.modalClose();
		
		if ( params.overlay )
		{
			var overlay = glyph.create( 'div' );
			overlay.className = 'glyph_modal_overlay';
			overlay.setAttribute( 'id', 'glyph_modal_overlay' );
			document.body.appendChild( overlay );
		}
		
		var div = glyph.create( 'div' );
		div.className = 'glyph_modal';
		div.setAttribute( 'id', 'glyph_modal' );
		
		var header = false;
		if ( params.header !== false )
		{
			header = glyph.create( 'div' );
			header.className = 'header';
			div.appendChild( header );
			
			var label = glyph.create( 'span' );
			label.className = 'label';
			label.innerHTML = params.title || 'Modal';
			header.appendChild( label );
			
			div.label = label;
			div.header = header;
		}
		
		var content = glyph.create( 'div' );
		content.className = 'content';
		div.appendChild( content );
		
		if ( params.close !== false && header )
		{
			var close = glyph.create( 'div' );
			close.className = 'close';
			close.innerHTML = 'X';
			close.onclick = function() { glyph.modalClose(); };
			header.appendChild( close );
		}
		
		div.content = content;
		document.body.appendChild( div );
		
		div.animate = params.animate;
		if ( params.animate !== false )
			glyph.stretchIn( div, { uniform: true, delay: 0.3 } );
		
		return content;
	};
	
glyph.modalClose = function()
	{
		var div = glyph.id( 'glyph_modal' );
		if ( !div )
			return;
		
		var overlay = glyph.id( 'glyph_modal_overlay' );
		if ( overlay )
			glyph.remove( overlay );
		
		div.setAttribute( 'id', 'glyph_modal_old' );
		
		if ( div.animate !== false )
			glyph.stretchOut( div, { uniform: true, delay: 0.2 } );
		else
			glyph.remove( div );
	};
	
glyph.modalTitle = function( text )
	{
		var div = glyph.id( 'glyph_modal' );
		if ( !div )
			return;
		
		if ( div.label )
			div.label.innerHTML = text;
	};
	
glyph.modalContent = function()
	{
		var div = glyph.id( 'glyph_modal' );
		if ( !div )
			return;
		
		return div.content;
	};
	
glyph.modalAutosize = function( toWidth )
	{
		var div = glyph.id( 'glyph_modal' );
		if ( !div )
			return;
		
		div.style.width = 'none';
		div.style.height = 'none';
		
		var oldW = div.style.maxWidth;
		var oldH = div.style.maxHeight;
			
		div.style.maxWidth = 'none';
		div.style.maxHeight = 'none';
		
		if ( toWidth )
			div.style.width = toWidth + 'px';
		
		var offset = glyph.boundsOuter( div.content );
		var hDiff = div.header.clientHeight;
		
		div.style.maxWidth = oldW;
		div.style.maxHeight = oldH;
		
		setTimeout( function()
			{
				div.style.width = offset.width + 'px';
				div.style.height = offset.height + hDiff + 'px';
				
				div.style.maxWidth = offset.width + 'px';
				div.style.maxHeight = offset.height + hDiff + 'px';
			}, 15 );
	};
	
glyph.modalSize = function( w, h, useHDiff )
	{
		var div = glyph.id( 'glyph_modal' );
		if ( !div )
			return;
		
		var hDiff = 0;
		if ( useHDiff !== false )
			hDiff = div.header.clientHeight;
				
		div.style.width = w + 'px';
		div.style.height = h + hDiff + 'px';
		
		div.style.maxWidth = w + 'px';
		div.style.maxHeight = h + hDiff + 'px';
	};

}());
