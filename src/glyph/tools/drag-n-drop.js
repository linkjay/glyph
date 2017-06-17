(function(){

var b_prepared = false;
var prep_pos = { x: 0, y: 0 };
var b_dragging = false;
var current_params = {};
var current_element = false;
var placeholder = false;
var old_style = {};
var drag_offset = { x: 0, y: 0 };

glyph.dragInit = function( container, params )
	{		
		if ( !container ) return;
		
		if ( typeof container == 'string' )
			container = glyph.id( container );
		
		if ( !params )
			params = {};
		
		params.group = params.group || '';
		params.templates = params.templates || false;
		params.axis = params.axis || 'both';
		
		container.dragparams = params;
	};
	
glyph.ready( function()
	{
		var draggable = glyph.sel( '.glyph_draggable' );	
		for ( var i = 0; i < draggable.length; i++ )
		{
			var params = draggable[i].getAttribute( 'glyph-dragparams' );
			if ( params )
				params = eval( '(' + params + ')' );
			glyph.dragInit( draggable[i], params );
		}
	});
	
function dragMouseMove( e )
{
	if ( e.button !== 0 ) return;
	
	if ( b_prepared )
	{
		if ( current_params.safezone )
			if ( glyph.mouseDist( prep_pos ) < current_params.safezone )
				return;
		
		b_prepared = false;
		b_dragging = true;
		var el = current_element;
		
		if ( current_params.templates )
		{
			current_element = el.cloneNode( true );
			el.parentNode.appendChild( current_element );
		}
		
		drag_offset.x = glyph.mousePos.x - glyph.bounds( el ).left;
		drag_offset.y = glyph.mousePos.y - glyph.bounds( el ).top;
		
		old_style.width = current_element.style.width || '';
		old_style.height = current_element.style.height || '';
		current_element.style.width = glyph.bounds( el ).width + 'px';
		current_element.style.height = glyph.bounds( el ).height + 'px';
		
		placeholder = el.cloneNode( true );
		glyph.addClass( placeholder, 'glyph_drag-placeholder' );
		glyph.insertAfter( placeholder, el );

		old_style.position = current_element.style.position || '';
		old_style.left = current_element.style.left || '';
		old_style.top = current_element.style.top || '';
		old_style.zIndex = current_element.style.zIndex || '';
		
		current_element.style.position = 'absolute';
		current_element.style.zIndex = '999';
		
		glyph.addClass( current_element, 'glyph_drag-active' );
	}
	
	if ( b_dragging )
	{		
		window.getSelection().removeAllRanges();
			
		var axis = current_params.axis;
		if ( axis == 'both' || axis == 'x' )
			current_element.style.left = glyph.mousePos.x - drag_offset.x + glyph.pageScroll().left + 'px';
		if ( axis == 'both' || axis == 'y' )
			current_element.style.top = glyph.mousePos.y - drag_offset.y + glyph.pageScroll().top + 'px';
		
		var pos = glyph.mousePos;	
		if ( axis == 'x' )
			pos.y = glyph.offset( current_element ).top + current_element.offsetHeight / 2;
		if ( axis == 'y' )
			pos.x = glyph.offset( current_element ).left + current_element.offsetWidth / 2;
		
		glyph.forEach( glyph.sel('.glyph_draggable'), function( group, j )
		{
			if ( group.dragparams.group != current_params.group )
				return;
			if ( !glyph.isUnderPos( group, pos ) )
				return;
			glyph.forEach( group.children, function( el, i )
			{
				if ( el == current_element || el == placeholder )
					return;
				if ( glyph.hasClass( el, 'glyph_drag-frozen' ) )
					return;
				if ( glyph.isUnderPos( el, pos ) )
				{
					var mouseOffset = glyph.mouseOffset( el );
					var scootXa = mouseOffset.x < el.offsetWidth / 2;
					var scootXb = mouseOffset.x > el.offsetWidth - el.offsetWidth / 2;
					var scootYa = mouseOffset.y < el.offsetHeight / 2;
					var scootYb = mouseOffset.y > el.offsetHeight - el.offsetHeight / 2;

					if ( glyph.hasClass( el, 'glyph_drag-lockbottom' ) )
					{
						if ( scootYa )
							scootYb = true;
						if ( scootXa )
							scootXb = true;

						scootYa = false;
						scootXa = false;
					}

					if ( glyph.hasClass( el, 'glyph_drag-locktop' ) )
					{
						if ( scootYb )
							scootYa = true;
						if ( scootXb )
							scootXa = true;

						scootYb = false;
						scootXb = false;
					}

					if ( axis == 'both' || axis == 'x' )
					{
						if ( scootXa )
							glyph.insertAfter( placeholder, el );
						else if ( scootXb )
							glyph.insertBefore( placeholder, el );
					}
					else if ( axis == 'both' || axis == 'y' )
					{
						if ( scootYa )
							glyph.insertAfter( placeholder, el );
						else if ( scootYb )
							glyph.insertBefore( placeholder, el );
					}
					return;
				}
			} );
		} );
	}
}
glyph.event( window, 'mousemove', dragMouseMove );
	
function dragMouseDown( e )
{
	if ( e.button !== 0 ) return;
	if ( b_dragging ) return;
	
	var el = e.target;
	var parentMatch = glyph.matchParents( el, '.glyph_draggable' );
	if ( parentMatch !== false )
	{
		var match = glyph.matchParents( el, '.glyph_draggable', -1 );
		if ( !glyph.matches( match, '.glyph_drag-disabled' ) )
		{
			b_prepared = true;
			prep_pos = glyph.mousePos;
			current_element = match;
			current_params = parentMatch.dragparams;
		}
	}
}
glyph.event( window, 'mousedown', dragMouseDown );

function dragMouseUp( e )
{
	if ( e.button !== 0 ) return;
	
	if ( b_prepared )
		b_prepared = false;
	
	if ( b_dragging )
	{
		b_prepared = false;
		b_dragging = false;
		
		current_element.style.width = old_style.width;
		current_element.style.height = old_style.height;
		current_element.style.position = old_style.position;
		current_element.style.left = old_style.left;
		current_element.style.top = old_style.top;
		current_element.style.zIndex = old_style.zIndex;
		
		glyph.removeClass( current_element, 'glyph_drag-active' );
		
		glyph.insertAfter( current_element, placeholder );
		glyph.remove( placeholder );
	}
}
glyph.event( window, 'mouseup', dragMouseUp );
	
}());
