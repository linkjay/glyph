(function(){

function attachValueListeners( par, container, parel, parid )
{
	glyph.forEach( par.children, function( el, eli )
	{
		if ( el.tagName.toLowerCase() == 'input' )
			glyph.event( el, 'keyup', function( e )
				{
					el.setAttribute( 'value', e.target.value )
					container.data[parid] = parel.innerHTML
				})
		
		attachValueListeners( el, container, parel, parid )
	})
}

function containerScroll( container, offset )
{
	if ( typeof offset == 'undefined' )
		offset = container.scrollTop

	var maxRows = container.maxRows
	var rowHeight = container.rowHeight

	// starting data index
	var startID = Math.floor( offset / rowHeight )
	var id = startID

	// remove out of bounds
	for ( var k in container.rows )
	{
		var row = container.rows[k]
		if ( k < id || k > id + maxRows )
		{
			container.data[k] = row.innerHTML
			container.removeChild( row )
			delete container.rows[k]
		}
	}

	// create and reposition in bounds
	for ( var i = 0; i < maxRows; i++ )
	{
		var row
		if ( id in container.rows )
			row = container.rows[id]
		else
		{
			row = glyph.create( 'div' )
			row.className = 'row'
			row.setAttribute( 'glyph_rowid', id )
			row.innerHTML = container.data[id] || ''

			if ( row.innerHTML == '' )
				continue

			container.appendChild( row )
			container.rows[id] = row

			attachValueListeners( row, container, row, id )
		}			
		
		var y = i * rowHeight
		row.style.top = y + 'px'

		id++
	}

	// update label
	container.label.innerText = 'viewing ' + (startID+1) + '-' + id + ' of ' + container.data.length
}

function updateContainerData( container, data )
{
	container.data = data
	
	var dataHeight = (container.rowHeight * container.data.length) + (container.rowHeight * 1)
	container.dataHeight = dataHeight

	container.padder.style.height = dataHeight + 'px'

	for ( var k in container.rows )
	{
		var row = container.rows[k]
		container.removeChild( row )
		delete container.rows[k]
	}
	container.rows = []

	containerScroll( container )
}

var lastFind = Date.now()
function containerFind( container, value )
{
	if ( Date.now() - lastFind < 100 ) return
	lastFind = Date.now()

	var increment = 1
	if ( value != container.lastFind )
	{
		container.findNum = 0
		increment = 0
	}

	var found = []
	for ( var i in container.data )
	{
		var row = container.data[i]
		if ( row.toLowerCase().indexOf( value.toLowerCase() ) !== -1 )
			found.push( i )
	}

	container.findResults = found
	jumpToFind( container, container.findNum+increment )
	container.lastFind = value
}

function jumpToFind( container, j )
{
	if ( container.findResults.length === 0 )
	{
		container.findNumLabel.innerText = 'not found'
		return
	}

	container.findNum = j
	if ( container.findNum < 0 )
		container.findNum = container.findResults.length-1
	if ( container.findNum >= container.findResults.length )
		container.findNum = 0

	container.findNumLabel.innerText = (container.findNum+1) + ' / ' + container.findResults.length

	var rowHeight = container.rowHeight
	var desiredScroll = container.findResults[ container.findNum ] * rowHeight

	container.scrollTop = desiredScroll
	containerScroll( container, desiredScroll )
}

glyph.updateInfinityBoxData = updateContainerData;

glyph.createInfinityBox = function( el )
	{
		// set up container
		var outer = el
		glyph.addClass( outer, 'glyph_infinityBox' )
		
		var container = glyph.create( 'div' )
		container.className = 'inner'
		outer.appendChild( container )

		container.data = []
		container.rows = {}

		// create temporary row for measuring
		var row = glyph.create( 'div' )
		row.className = 'row'
		row.innerText = 'asdf'
		container.appendChild( row )

		// get single row height & remove
		var rowHeight = glyph.bounds( row ).height
		container.rowHeight = rowHeight
		container.removeChild( row )

		// number of rows that can fit inside container
		var containerHeight = glyph.bounds( container ).height
		var maxRows = containerHeight / rowHeight
		container.maxRows = maxRows

		// create scroll padding element
		var padder = glyph.create( 'div' )
		padder.className = 'padder'
		container.appendChild( padder )
		container.padder = padder

		// hud
		var hud = glyph.create( 'div' )
		hud.className = 'hud'
		outer.appendChild( hud )
		container.hud = hud

		var label = glyph.create( 'div' )
		label.className = 'label'
		hud.appendChild( label )
		container.label = label

		// finder
		var find = glyph.create( 'input', 'text' )
		find.className = 'find'
		find.placeholder = 'type & hit enter to search'
		find.onchange = function( e ) { containerFind( container, e.target.value ) }
		find.onkeyup = function( e ) { if ( e.keyCode == 13 ) containerFind( container, e.target.value ) }
		hud.appendChild( find )
		container.find = find

		// find buttons
		var findButtons = glyph.create( 'div' )
		findButtons.className = 'findButtons'
		hud.appendChild( findButtons )

		var up = glyph.create( 'div' )
		up.className = 'up'
		up.onclick = function() { jumpToFind( container, container.findNum-1 ) }
		findButtons.appendChild( up )

		var down = glyph.create( 'div' )
		down.className = 'down'
		down.onclick = function() { jumpToFind( container, container.findNum+1 ) }
		findButtons.appendChild( down )

		// find label
		var findNumLabel = glyph.create( 'div' )
		findNumLabel.className = 'findNum'
		hud.appendChild( findNumLabel )
		container.findNumLabel = findNumLabel

		// on scroll event
		glyph.event( container, 'scroll', function( e ) { containerScroll( e.target ) } )
		containerScroll( container )

		return container
	};

glyph.scrollInfinityBoxTo = function( container, scrollTo )
	{
		container.scrollTop = scrollTo
		containerScroll( container, scrollTo )
	};

}());
