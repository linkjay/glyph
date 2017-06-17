(function(){

glyph.id = function( id )
	{
		return document.getElementById( id );
	};
	
glyph.sel = function( sel, parent )
	{
		if ( parent )
			return parent.querySelectorAll( sel );
		return document.querySelectorAll( sel );
	};
	
glyph.addClass = function( el, cls )
	{
		el.className += ' ' + cls;
	};
	
glyph.removeClass = function( el, cls )
	{
		var classList = el.className.split( ' ' );
		var newClass = '';
		for ( var i in classList )
			if ( classList[i] != cls )
				newClass += ' ' + classList[i];
			
		el.className = newClass.trim();
	};

glyph.hasClass = function( el, cls )
	{
		if ( !el.className || el.className == '' )
			return false;
			
		var classList = el.className.split( ' ' );
		for ( var i in classList )
			if ( classList[i] == cls )
				return true;
			
		return false;
	};
	
glyph.toggleClass = function( el, cls )
	{
		if ( glyph.hasClass( el, cls ) )
			glyph.removeClass( el, cls );
		else
			glyph.addClass( el, cls );
	};
	
glyph.hasParent = function( el, parent )
	{
		while ( el.parentNode )
		{
			el = el.parentNode;
			if ( el == parent )
				return true;
		}
		
		return false;
	};
	
glyph.matches = function( el, selector )
	{		
		var matches = el.matches || el.matchesSelector || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector;
		if ( !matches )
			return false;
		return matches.call( el, selector );
	};
	
glyph.matchParents = function( el, sel, offset )
	{
		var history = [];
		history.push( el );
		while ( el.parentNode )
		{
			el = el.parentNode;
			history.push( el );
			if ( glyph.matches( el, sel ) )
				if ( !offset )
					return el;
				else
					return history[history.length-Math.abs(offset)-1];
		}
		
		return false;
	};
	
glyph.hasParentSelector = function( el, sel )
	{
		while ( el.parentNode )
		{
			el = el.parentNode;
			if ( glyph.matches( el, sel ) )
				return true;
		}
		
		return false;
	};
	
glyph.insertAfter = function( el, ref )
	{
		var parent = ref.parentNode;
		parent.insertBefore( el, ref.nextSibling );
	};
	
glyph.insertBefore = function( el, ref )
	{
		var parent = ref.parentNode;
		parent.insertBefore( el, ref );
	};
	
glyph.remove = function( el )
	{
		el.parentNode.removeChild( el );
	};
	
glyph.clear = function( el )
	{
		el.innerHTML = '';
	};
	
glyph.set = function( el, attr, val )
	{
		el.setAttribute( attr, val );
	};
	
glyph.get = function( el, attr )
	{
		return el.getAttribute( attr );
	};
	
glyph.create = function( type, type2 )
	{
		var el = document.createElement( type );
		
		if ( type2 )
			el.setAttribute( 'type', type2 );
	   
		return el;
	};
	
glyph.append = function( child, parent )
	{
		if ( typeof child == 'string' )
			parent.innerHTML += child;
		else
			parent.appendChild( child );
	};
	
glyph.contains = function( el, child )
	{
		if ( el !== child && el.contains( child ) )
			return true;
		return false;
	};
	
glyph.pageScroll = function()
	{
		var r =
			{
				top: ( document.documentElement.scrollTop || document.body.scrollTop ),
				left: ( document.documentElement.scrollLeft || document.body.scrollLeft )
			};
			
		return r;
	};
	
glyph.size = function( el )
	{
		var style = getComputedStyle( el );
		
		var height = parseInt( style.height );
		var width = parseInt( style.width );

		var r =
			{
				width: width,
				height: height
			};
			
		return r;
	};
	
glyph.bounds = function( el )
	{
		return el.getBoundingClientRect();
	};
	
glyph.boundsOuter = function( el )
	{
		var style = getComputedStyle( el );
		var rect = glyph.bounds( el );
		
		rect.height += parseInt( style.marginTop ) + parseInt( style.marginBottom );
		rect.width += parseInt( style.marginLeft ) + parseInt( style.marginRight );
			
		return rect;
	};
	
glyph.offset = function( el )
	{
		var rect = glyph.bounds( el );
		var scroll = glyph.pageScroll();
		
		rect.top += scroll.top;
		rect.left += scroll.left;
			
		return rect;
	};
	
glyph.offsetOuter = function( el )
	{
		var style = getComputedStyle( el );
		var offset = glyph.offset( el );
		
		offset.height += parseInt( style.marginTop ) + parseInt( style.marginBottom );
		offset.width += parseInt( style.marginLeft ) + parseInt( style.marginRight );
			
		return offset;
	};
	
glyph.addOption = function( select, name, val )
	{
		var opt = document.createElement( 'option' );
		opt.text = name;
		opt.value = val;
	   
		select.appendChild( opt );
	};

glyph.selectOptionText = function( dropdown, text )
	{
		for ( var i = 0; i < dropdown.children.length; i++ )
			if ( dropdown.children[i].innerHTML == text )
			{
				dropdown.selectedIndex = i;
				break;
			}
	};
	
glyph.selectOptionValue = function( dropdown, value )
	{
		for ( var i = 0; i < dropdown.children.length; i++ )
			if ( dropdown.children[i].value == value )
			{
				dropdown.selectedIndex = i;
				break;
			}
	};
	
glyph.selectedOption = function( dropdown )
	{
		var i = dropdown.selectedIndex;
		return dropdown.children[ i ];
	};
	
glyph.setDefaultOptionText = function( dropdown, text )
	{
		for ( var i = 0; i < dropdown.children.length; i++ )
			if ( dropdown.children.innerHTML == text )
			{
				glyph.insertBefore( opt, dropdown.children[0] );
				break;
			}
	};
	
glyph.setDefaultOptionValue = function( dropdown, value )
	{
		for ( var i = 0; i < dropdown.children.length; i++ )
			if ( dropdown.children.value == value )
			{
				glyph.insertBefore( opt, dropdown.children[0] );
				break;
			}
	};
	
glyph.sortChildren = function( parent, attr, reverse )
	{
		var children = parent.children;
		
		if ( children.length <= 0 )
			return;

		var list = glyph.toArray( children );
		
		var isString = typeof list[0].getAttribute( attr ) == 'string';
		if ( isString )
			list.sort( function( a, b ) { return glyph.strcmp( a.getAttribute( attr ), b.getAttribute( attr ) ); } );
		else
			list.sort( function( a, b ) { return a.getAttribute( attr ) - b.getAttribute( attr ); } );

		if ( reverse )
			list.reverse();
		
		glyph.forEachEl( list, function( el, i ) { parent.appendChild( el ); } );
	};
	
glyph.frameContent = function( frame )
	{
		var content = '';
		if ( frame.contentDocument )
			content = frame.contentDocument.body.innerHTML;
		else if ( frame.contentWindow )
			content = frame.contentWindow.document.body.innerHTML;
		else if ( frame.document )
			content = frame.document.body.innerHTML;
		
		return content;
	};
	
glyph.include = function( url, callback ) 
	{			
		var head = document.getElementsByTagName( 'head' )[0];
		
		var include = null;
		
		if ( url.indexOf( '.js' ) != -1 )
		{
			include = document.createElement( 'script' );
			include.type = 'text/javascript';
			include.src = url;
		}
		
		if ( url.indexOf( '.css' ) != -1 )
		{
			include = document.createElement( 'link' );
			include.rel = 'stylesheet';
			include.type = 'text/css';
			include.href = url;
		}
		
		include.onreadystatechange = callback;
		include.onload = callback;
		include.onerror = callback;
		
		head.appendChild( include );
	};
	
}());
