(function(){

glyph.fadeDelete = function( el, delay )
	{
		delay = delay || 1;
		
		// set up fading parameters
		el.style.opacity = 1;	
		el.style.transition = 'all ' + delay + 's ease';
		el.style.display = 'block';
		
		// begin fading
		el.style.opacity = 0;
		
		// move upwards		
		el.style.marginTop = ( (parseInt( el.style.marginTop ) || 0) - el.offsetHeight ) + 'px';
		
		// remove after fading is done
		delay = delay * 1000;
		setTimeout( function()
					{
						el.parentNode.removeChild( el );
					}, delay );
	};

glyph.stretchIn = function( el, params )
	{
		if ( !params )
			params = {};
		
		var delay = params.delay || 0.4;
		if ( !params.uniform && !params.vertical && !params.horizontal )
			params.vertical = true;
		
		var prevDisplay = el.style.display;
		el.style.visibility = 'hidden';
		el.style.display = 'block';
			
		var maxH = 0;
		var vTransition = false;
		if ( params.uniform || params.vertical )
		{
			el.style.maxHeight = 'none';
			maxH = el.clientHeight;
			
			el.style.maxHeight = '0';
			el.style.transition = 'max-height ' + delay + 's ease-in';
			vTransition = el.style.transition;
		}
		
		var maxW = 0;
		if ( params.uniform || params.horizontal )
		{
			el.style.maxWidth = 'none';
			maxW = el.clientWidth;
			
			el.style.maxWidth = '0';
			el.style.transition = 'max-width ' + delay + 's ease-in';
			if ( vTransition )
				el.style.transition = vTransition + ', ' + el.style.transition;
		}		
		
		el.style.display = prevDisplay;
		
		var prevOverflow = el.style.overflow;
		el.style.overflow = 'hidden';
		
		var prevWhitespace = el.style.whiteSpace;
		el.style.whiteSpace = 'nowrap';
		
		setTimeout( function()
			{
				el.style.visibility = 'visible';
				if ( params.uniform || params.vertical )
					el.style.maxHeight = maxH + 'px';
				if ( params.uniform || params.horizontal )
					el.style.maxWidth = maxW + 'px';
			}, 10 );
		
		setTimeout( function()
			{
				if ( params.uniform || params.vertical )
					el.style.maxHeight = 'none';
				if ( params.uniform || params.horizontal )
					el.style.maxWidth = 'none';
				el.style.whiteSpace = prevWhitespace;
				el.style.overflow = prevOverflow;
			}, 1000 * delay );
	};
	
glyph.stretchOut = function( el, params )
	{
		if ( !params )
			params = {};
		
		var delay = params.delay || 0.4;
		if ( !params.uniform && !params.vertical && !params.horizontal )
			params.vertical = true;
		
		el.style.overflow = 'hidden';
		el.style.whiteSpace = 'nowrap';
		
		var maxH = 0;
		var vTransition = false;
		if ( params.uniform || params.vertical )
		{
			el.style.maxHeight = 'none';
			maxH = el.clientHeight;
		
			el.style.maxHeight = maxH + 'px';
			el.style.transition = 'max-height ' + delay + 's ease-out';
			vTransition = el.style.transition;
		}
		
		var maxW = 0;
		if ( params.uniform || params.horizontal )
		{
			el.style.maxWidth = 'none';
			maxW = el.clientWidth;
			
			el.style.maxWidth = maxW + 'px';
			el.style.transition = 'max-width ' + delay + 's ease-out';
			if ( vTransition )
				el.style.transition = vTransition + ', ' + el.style.transition;
		}
		
		setTimeout( function()
			{
				if ( params.uniform || params.vertical )
					el.style.maxHeight = '0px';
				if ( params.uniform || params.horizontal )
					el.style.maxWidth = '0px';
			}, 10 );
		
		
		// remove after stretching is done
		delay = delay * 1000;
		setTimeout( function()
					{
						if ( params.remove !== false )
							el.parentNode.removeChild( el );
						else
							el.style.display = 'none';
					}, delay );
	};

}());
