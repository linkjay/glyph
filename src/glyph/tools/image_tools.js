(function(){

/* sliders */
function pauseSlider( slider, pause )
{
	slider.pauseSliding = pause;
}

function setSliderFrame( slider, i )
{
	// i is an event if called by timeline button
	if ( isNaN( i ) )
		i = i.target.FrameNumber;
		
	// loop around to beginning
	if ( i >= slider.children.length )
		i = 0;
	
	var width = parseInt( slider.style.width );
	
	// shift children
	for ( var j = 0; j < slider.children.length; j++ )
	{			
		var child = slider.children[j];
		child.style.left = width * j - width * i + 'px';
	}
	
	// select radio on timeline
	var next = i + 1;
	var radio = slider.parentNode.querySelectorAll( '.glyph_sliderTimeline input:nth-child(' + next + ')' )[0];
	if ( radio )
		radio.checked = true;
	
	return i;
}

function sliderTimer( slider, delay, i )
{
	i = i || 0;
	
	if ( !slider.lightboxOpen && !slider.pauseSliding )
	{
		i++;
		i = setSliderFrame( slider, i );
	}
	
	// set next timer
	if ( !slider.params.static )
		setTimeout( function() { sliderTimer( slider, delay, i ); }, delay );
}

glyph.imageSlider = function( slider, params )
	{
		if ( !params )
			params = {};
		
		params.delay = params.delay || 5;
		params.delay *= 1000;
		
		params.static = params.static || false;
		params.pauseOnHover = params.pauseOnHover || true;
		
		if ( !slider )
		{
			slider = glyph.create( 'div' );
			slider.className = 'glyph_imageSlider';
		}
		slider.params = params;
		
		// pause sliding on mouse over
		slider.pauseSliding = false;
		
		if ( params.pauseOnHover )
		{
			slider.onmouseover = function() { pauseSlider( slider, true ); };
			slider.onmouseout = function() { pauseSlider( slider, false ); };
		}
		
		// set size of slider and children
		glyph.imageSliderSize( slider );
		
		// set initial slide position
		setSliderFrame( slider, 0 );		
		
		
		// create timeline
		var timeline = document.createElement( 'div' );
		timeline.setAttribute( 'class', 'glyph_sliderTimeline' );
		slider.parentNode.insertBefore( timeline, slider.nextSibling );
		
		// copy width so it's centered
		timeline.style.width = slider.style.width;
		
		// pause slider if we're hovering over this too
		timeline.onmouseover = function() { pauseSlider( slider, true ); };
		timeline.onmouseout = function() { pauseSlider( slider, false ); };
		
		// add radio buttons for each frame
		var uid = Date.now();
		for ( var j = 0; j < slider.children.length; j++ )
		{
			var radio = document.createElement( 'input' );
			timeline.appendChild( radio );
			
			radio.type = 'radio';
			radio.name = 'glyph_imageSlider-' + uid;
			radio.FrameNumber = j;
			
			radio.onclick = function( ev ) { setSliderFrame( slider, ev ); };
			
			if ( j === 0 )
				radio.checked = true;
		}
		
		
		// begin sliding
		if ( !slider.params.static )
			setTimeout( function() { sliderTimer( slider, params.delay, -1 ); }, 100 );
	};
	
glyph.imageSliderSize = function( slider )
	{
		// inherit width and height from first child if there is none
		if ( !slider.style.width || !slider.style.height )
		{
			slider.style.width = slider.children[0].clientWidth + 'px';
			slider.style.height = slider.children[0].clientHeight + 'px';
		}		

		// set children dimensions to match slider
		for ( var i = 0; i < slider.children.length; i++ )
		{
			var child = slider.children[i];
			child.glyphSlider = slider;
			
			child.style.width = slider.style.width;
			child.style.height = slider.style.height;
		}
	};
	
glyph.ready( function()
	{
		var sliders = document.querySelectorAll( '.glyph_imageSlider' );
		for ( var i = 0; i < sliders.length; i++ )
		{
			var params = sliders[i].getAttribute( 'glyph-sliderparams' );
			if ( params )
				params = eval( '(' + params + ')' );
			
			glyph.imageSlider( sliders[i], params );
		}
	});


/* lightbox */
function lightboxFullImage( el )
{
	return el.getAttribute( 'glyph-fullimage' ) || el.src || el.href;
}

function lightboxShift( offset )
{
	var lightbox = document.getElementById( 'glyph_lightbox' );
	var group = lightbox.element.getAttribute( 'glyph-lightbox' );
	var images = document.querySelectorAll( '[glyph-lightbox="' + group + '"]' );
	
	// find the current image's index
	var thisIndex = 0;
	for ( var i = 0; i < images.length; i++ )
	{
		var url = lightboxFullImage( images[i] );
		if ( url == lightbox.image.src )
			thisIndex = i;
	}
	
	var nextIndex = thisIndex + offset;
	if ( nextIndex >= images.length )
		nextIndex = 0;
	if ( nextIndex < 0 )
		nextIndex = images.length - 1;
	
	var next = images[ nextIndex ];
	lightbox.image.src = lightboxFullImage( next );
	
	var title = next.getAttribute( 'alt' ) || next.innerHTML;
	lightbox.caption.innerHTML = title || '';
}

function lightboxClose()
{
	var lightbox = document.getElementById( 'glyph_lightbox' );
	if ( lightbox.element.glyphSlider )
		lightbox.element.glyphSlider.lightboxOpen = false;
	
	lightbox.style.opacity = '0';
	
	var transition = getComputedStyle( lightbox ).transition;
	var delay = /opacity (.+?)s/.exec( transition )[1];
	delay *= 1000;
	
	setTimeout( function() { lightbox.style.display = 'none'; }, delay );
}

function lightboxOpen( el )
{
	if ( el.glyphSlider )
		el.glyphSlider.lightboxOpen = true;
	
	var lightbox = document.getElementById( 'glyph_lightbox' );
	if ( !lightbox )
	{
		lightbox = glyph.create( 'div' );
		lightbox.setAttribute( 'id', 'glyph_lightbox' );
		
		var background = glyph.create( 'div' );
		background.className = 'background';
		lightbox.appendChild( background );
		background.onclick = function() { lightboxClose(); };
		
		var content = glyph.create( 'div' );
		content.className = 'content';
		lightbox.appendChild( content );
		
		var image = glyph.create( 'img' );
		content.appendChild( image );
		lightbox.image = image;
		
		var prevButton = glyph.create( 'div' );
		prevButton.className = 'button prev';
		prevButton.onclick = function() { lightboxShift( -1 ); };
		content.appendChild( prevButton );
		
		var nextButton = glyph.create( 'div' );
		nextButton.className = 'button next';
		nextButton.onclick = function() { lightboxShift( 1 ); };
		content.appendChild( nextButton );
		
		var caption = glyph.create( 'div' );
		caption.className = 'caption';
		content.appendChild( caption );
		lightbox.caption = caption;
		
		document.body.appendChild( lightbox );
	}
	
	lightbox.element = el;
	
	lightbox.style.display = 'block';
	setTimeout( function() { lightbox.style.opacity = '1'; }, 100 ); // this needs to happen next frame
	
	var url = lightboxFullImage( el );
	lightbox.image.src = url;
	
	var title = el.getAttribute( 'alt' ) || el.innerHTML;
	lightbox.caption.innerHTML = title || '';
}

glyph.lightboxInit = function()
	{
		var images = document.querySelectorAll( '[glyph-lightbox]' );
		for ( var i = 0; i < images.length; i++ )
			images[i].onclick = function() { lightboxOpen( this ); };
	};
glyph.ready( glyph.lightboxInit );

}());
