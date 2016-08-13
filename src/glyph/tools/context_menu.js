(function(){

function subMenuShow( el, parent, arrow )
{
	glyph.addClass( el, 'hover' );
}

function subMenuHide( el, parent, arrow )
{	
	if ( glyph.isMouseOver( el ) )
		return;
	if ( glyph.isMouseOver( parent ) )
		return;
	if ( glyph.isMouseOver( arrow ) )
		return;
	glyph.removeClass( el, 'hover' );
}

var pixelInset = 3;
	
var activeMenu = false;
function buildMenu( parent, template )
{
	for ( var i = 0; i < template.length; i++ )
	{(function(item){	
		var el = glyph.create( 'div' );
		el.className = 'item';
		el.textContent = item.label;
		glyph.append( el, parent );
		
		if ( typeof item.click === 'string' )
			el.onclick = function() { eval( item.click ); };
		else if ( typeof item.click === 'function' )
			el.onclick = item.click;
		
		if ( typeof item.submenu !== 'undefined' )
		{			
			var subMenu = glyph.create( 'div' );
			subMenu.className = 'subMenu';
			glyph.append( subMenu, el );			
			
			var arrow = glyph.create( 'span' );
			arrow.className = 'arrow';
			glyph.append( arrow, el );
			
			el.onmouseover = function() { subMenuShow( subMenu ); };
			el.onmouseout = function() { subMenuHide( subMenu, el, arrow ); };
			
			buildMenu(subMenu, item.submenu );
		}
	})(template[i]);}
}
	
glyph.contextMenu = function( template )
	{
		activeMenu = glyph.create( 'div' );
		activeMenu.id = 'glyph_contextMenu';
		activeMenu.className = 'menu';
		activeMenu.style.left = glyph.mousePos.x + 'px';
		activeMenu.style.top = glyph.mousePos.y + 'px';
		glyph.append( activeMenu, document.body );
		
		buildMenu( activeMenu, template );
	};

function closeMenu()
{
	if ( activeMenu !== false )
	{
		glyph.remove( activeMenu );
		activeMenu = false;
	}
}
glyph.event( document, 'click', closeMenu );

}());
