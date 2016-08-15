(function(){

function drawWheelTri( context, centerX, centerY, sizeX, sizeY, angle, hue, bias )
{
	bias = bias || 0;
	
	var outerX = centerX + sizeX * Math.cos( angle + bias ),
		outerY = centerY + sizeY * Math.sin( angle + bias );
		
	var grad = context.createLinearGradient( centerX, centerY, outerX, outerY );
		grad.addColorStop( 0, 'hsl( ' + hue + ', 100%, 100% )' );
		grad.addColorStop( 1, 'hsl( ' + hue + ', 100%, 50% )' );
		
	context.fillStyle = grad;
	context.lineTo( outerX, outerY );
}

function drawCircle( context, centerX, centerY, radius, colour, type, shadows, shadowBlur, thickness )
{
	if ( shadows )
	{
		context.save();
		
		context.shadowColor = colour;
		context.shadowBlur = shadowBlur;
	}
	
	context.beginPath();

	context.arc( centerX, centerY, radius, 0, glyph.TwoPi, false );
	
	if ( type == 'fill' )
	{
		context.fillStyle = colour;
		context.fill();
	}
	else if ( type == 'stroke' )
	{
		context.lineWidth = thickness;
		context.strokeStyle = colour;
		context.stroke();
	}
	
	context.closePath();
	
	if ( shadows )
		context.restore();
}

function drawWheel( canvas, padding, pieSize )
{        
	padding = padding || 5;
	pieSize = pieSize || 1;
	
	var context = canvas.getContext( '2d' );
	
	var width	= canvas.width,
		height	= canvas.height;
	
	var centerX = width / 2,
		centerY = height / 2,
		sizeX	= centerX - padding,
		sizeY 	= centerY - padding,
		radius = Math.min( centerX, centerY ) - padding;
		
	
	drawCircle( context, centerX, centerY, radius, '#000000', 'fill', true, 10 );	
	
	var step = pieSize * 1 / radius;

	var angle = 0;
	while ( angle < glyph.TwoPi )
	{
		context.beginPath();
		context.moveTo( centerX, centerY );
		var hue = Math.floor( 360 * angle / glyph.TwoPi );

		drawWheelTri( context, centerX, centerY, sizeX, sizeY, angle, hue );
		angle += step;
		drawWheelTri( context, centerX, centerY, sizeX, sizeY, angle, hue, 0.02 );

		context.closePath();
		context.fill();
	}
	
	drawCircle( context, centerX, centerY, radius, '#000000', 'stroke', true, 5, 1 );
}

var colourPickerPopup = false;
var colourPickerActive = false;
var colourPickerSelecting = false;

glyph.colourPickerClose = function()
	{
		if ( !colourPickerPopup )
			return;
		
		if ( colourPickerActive.glyph_colourCallback )
		{
			var hex = colourPickerActive.value;
			var rgb = glyph.hexToRGB( hex );
			colourPickerActive.glyph_colourCallback( hex, rgb );
		}
		
		colourPickerSelecting = false;
		colourPickerPopup.style.display = 'none';
		colourPickerActive = false;	
	};

function pickColourFromWheel( el, event, context )
{
	if ( !colourPickerSelecting ) return;
			
	var bounds = el.getBoundingClientRect();
	var x = event.pageX - bounds.left - ( document.documentElement.scrollLeft || document.body.scrollLeft );
	var y = event.pageY - bounds.top - ( document.documentElement.scrollTop || document.body.scrollTop );

	var data = context.getImageData( x, y, 1, 1 ).data;
	var r = data[0];
	var g = data[1];
	var b = data[2]; 
	var rgb = r + ', ' + g + ', ' + b;

	var hex = glyph.rgbToHex( r, g, b );

	document.getElementById( 'glyph_colourPickerRGB' ).value = rgb;
	document.getElementById( 'glyph_colourPickerHex' ).value = hex;
	colourPickerActive.style.backgroundColor = hex;
	colourPickerActive.value = hex;
}

function setupPickerPopup( width, height )
{
	width = width || 200;
	height = height || 200;
	
	var popup = document.createElement( 'div' );
	popup.setAttribute( 'id', 'glyph_colourPickerPopup' );
	popup.style.position = 'absolute';
	popup.style.width = width + 'px';
	popup.style.height = height + 40 + 'px';
	
	var canvas = document.createElement( 'canvas' );
	canvas.setAttribute( 'id', 'glyph_colourPickerCanvas' );
	canvas.width = width;
	canvas.height = height;
	canvas.style.cursor = 'crosshair';
	
	var context = canvas.getContext('2d');
	drawWheel( canvas, 15, 1 );
	
	canvas.onmousedown = function( event )
		{
			colourPickerSelecting = true;
		};
	
	canvas.onmouseup = function( ev ) { pickColourFromWheel( this, ev, context ); glyph.colourPickerClose(); };
	
	canvas.onmousemove = function( ev ) { pickColourFromWheel( this, ev, context ); };
		
	popup.appendChild( canvas );
	
	
	var container = document.createElement( 'div' );
	container.style.textAlign = 'center';
	
		var rgb = document.createElement( 'input' );
		rgb.style.textAlign = 'center';
		rgb.style.width = '85px';
		rgb.setAttribute( 'type', 'text' );
		rgb.setAttribute( 'id', 'glyph_colourPickerRGB' );
		rgb.value = '255, 255, 255';
		rgb.onchange = function() { glyph.colourPickerChange( 'rgb', this ); };
		container.appendChild( rgb );
		
		var hex = document.createElement( 'input' );
		hex.style.textAlign = 'center';
		hex.style.width = '60px';
		hex.setAttribute( 'type', 'text' );
		hex.setAttribute( 'id', 'glyph_colourPickerHex' );
		hex.value = '#FFFFFF';
		hex.onchange = function() { glyph.colourPickerChange( 'hex', this ); };
		container.appendChild( hex );
		
		rgb.style.marginRight = '15px';
	popup.appendChild( container );
	
	popup.style.display = 'none';
	document.body.appendChild( popup );
	
	colourPickerPopup = popup;
}

var ignoreClick = false;
glyph.colourPickerChoose = function( div )
	{
		colourPickerActive = div;
		colourPickerPopup.style.display = 'block';
		colourPickerPopup.style.top = div.offsetTop + 'px';
		colourPickerPopup.style.left = div.offsetLeft + div.offsetWidth + 3 + 'px';
		
		var hex = div.value;
		document.getElementById( 'glyph_colourPickerRGB' ).value = glyph.hexToRGBString( hex );
		document.getElementById( 'glyph_colourPickerHex' ).value = hex;
		
		ignoreClick = true;
		setTimeout( function() { ignoreClick = false; }, 100 );
	};
	
glyph.colourPickerSet = function( div, colour )
	{		
		if ( colour.substr( 0, 1 ) != '#' )
			colour = glyph.rgbStringToHex( colour );
		
		div.value = colour;
		div.style.backgroundColor = colour;
	};

glyph.colourPicker = function( params )
	{
		if ( !colourPickerPopup )
			setupPickerPopup();
		
		if ( !params )
			params = {};
		
		var useInput = params.input,
			colour = params.colour,
			el = params.el;
		
		var el_type = 'div';
		if ( useInput )
			el_type = 'input';
		
		colour = colour || '#FFFFFF';
		if ( el && el.style.backgroundColor )
			colour = el.style.backgroundColor;
		
		if ( el && el.value )
			colour = el.value;
		
		if ( colour.substr( 0, 1 ) != '#' )
			colour = glyph.rgbStringToHex( colour );
		
		if ( !el )
			el = document.createElement( el_type );
		
		el.className = 'colourPicker';
		el.style.display = 'inline-block';
		el.style.width = '20px';
		el.style.height = '20px';
		el.style.border = '1px solid #000000';
		el.style.marginLeft = '3px';
		
		el.innerHTML = '&nbsp;';
		
		el.style.color = 'rgba( 0, 0, 0, 0 )';
		el.style.cursor = 'pointer';
		el.setAttribute( 'spellcheck', false );
		
		// default colour
		el.style.backgroundColor = colour;
		el.value = colour;
		
		el.onclick = function() { glyph.colourPickerChoose( el ); };
		
		if ( params.callback )
			el.glyph_colourCallback = params.callback;
		
		return el;
	};

glyph.colourPickerChange = function( type, input )
	{
		var hex = input.value;
		var rgb = input.value;
		
		if ( type == 'rgb' )		
			hex = glyph.rgbStringToHex( rgb );
		else if ( type == 'hex' )
			rgb = glyph.hexToRGBString( hex );
		
		document.getElementById( 'glyph_colourPickerRGB' ).value = rgb;
		document.getElementById( 'glyph_colourPickerHex' ).value = hex;
		colourPickerActive.style.backgroundColor = hex;
		colourPickerActive.value = hex;
	};

glyph.ready( function()
	{		
		var colourPickers = document.querySelectorAll( '.glyph_colourPicker' );
		for ( var i = 0; i < colourPickers.length; i++ )
		{
			var picker = colourPickers[i];
			var params = picker.getAttribute( 'glyph-pickerparams' );
			if ( params )
			{
				params = eval( '(' + params + ')' );
				glyph.colourPicker( { el: picker, input: params.input, colour: params.colour, callback: eval( params.callback ) } );
			}
			else
				glyph.colourPicker( { el: picker } );
		}
	});

function clickOutsideColourPicker( ev )
{
	if ( !colourPickerActive ) return;
	
	if ( !ignoreClick )
		if ( ev.target != colourPickerPopup &&
			ev.target.parentNode != colourPickerPopup &&
			 ev.target.parentNode.parentNode != colourPickerPopup )
			glyph.colourPickerClose();
}
glyph.event( window, 'click', clickOutsideColourPicker );

function escapeOuttaColourPicker( ev )
{
	if ( !colourPickerActive ) return;
	
	if ( ev.keyCode == 27 )
		glyph.colourPickerClose();
}
glyph.event( window, 'keyup', escapeOuttaColourPicker );

}());
