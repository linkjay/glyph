(function(){

glyph.calendar = {};

glyph.ready( function()
	{	
		var elements = document.getElementsByClassName( 'glyph_calendar' );
		for ( var i = 0; i < elements.length; i++ )
			attachCalendar( elements[i], i );
	});

glyph.calendar.data = {};
var MonthNames = new Array(
							"January", 
							"February",
							"March", 
							"April",
							"May",
							"June",
							"July",
							"August",
							"September", 
							"October",
							"November",
							"December"
							);

function attachCalendar( div, i )
{
	div.setAttribute( 'id', 'glyph_calendar_' + i );

	var topBar = document.createElement( 'div' );
	topBar.setAttribute( 'class', 'TopBar' );	
	div.appendChild( topBar );
	
		var monthContainer = document.createElement( 'span' );
		monthContainer.setAttribute( 'class', 'MonthContainer' );
		topBar.appendChild( monthContainer );
		
			var previousMonth = document.createElement( 'span' );
			previousMonth.setAttribute( 'class', 'TopButton Left' );
			previousMonth.innerHTML = "&lt;";
			previousMonth.onclick = function() { increaseMonth( i, -1 ); };
			monthContainer.appendChild( previousMonth );
			
			var nextMonth = document.createElement( 'span' );
			nextMonth.setAttribute( 'class', 'TopButton Right' );
			nextMonth.innerHTML = "&gt;";
			nextMonth.onclick = function() { increaseMonth( i, 1 ); };
			monthContainer.appendChild( nextMonth );

			var monthSelect = document.createElement( 'select' );
			monthSelect.setAttribute( 'id', 'glyph_calendar_' + i + '_MonthSelect' );
			monthSelect.setAttribute( 'class', 'TopLabel TopSelect' );
			monthSelect.style.width = '100px';
			monthContainer.appendChild( monthSelect );
			
			monthSelect.onchange = function() { glyph.calendar.setDisplay( i, glyph.calendar.data[i].year, this.selectedIndex, true ); };
							
			for ( var month in MonthNames )
			{
				var op = document.createElement( 'option' );
				op.value = month;
				op.innerHTML = MonthNames[ month ];
				monthSelect.appendChild( op );
			}
			
		var yearContainer = document.createElement( 'span' );
		yearContainer.setAttribute( 'class', 'YearContainer' );
		topBar.appendChild( yearContainer );
		
			var previousYear = document.createElement( 'span' );
			previousYear.setAttribute( 'class', 'TopButton Left' );
			previousYear.innerHTML = "&lt;";
			previousYear.onclick = function() { increaseYear( i, -1 ); };
			yearContainer.appendChild( previousYear );
			
			var nextYear = document.createElement( 'span' );
			nextYear.setAttribute( 'class', 'TopButton Right' );
			nextYear.innerHTML = "&gt;";
			nextYear.onclick = function() { increaseYear( i, 1 ); };
			yearContainer.appendChild( nextYear );

			var yearLabel = document.createElement( 'span' );
			yearLabel.setAttribute( 'id', 'glyph_calendar_' + i + '_YearLabel' );
			yearLabel.setAttribute( 'class', 'TopLabel' );
			yearLabel.style.width = '55px';
			yearContainer.appendChild( yearLabel );
	
			yearLabel.innerHTML = '2013';
			
	var dayContainer = document.createElement( 'div' );
	dayContainer.setAttribute( 'class', 'DayContainer' );
	div.appendChild( dayContainer );
	
		var weekLegend = document.createElement( 'div' );
		weekLegend.setAttribute( 'class', 'WeekLegend' );
		dayContainer.appendChild( weekLegend );
		
		weekLegend.innerHTML = 'S M T W T F S';
		
		var spacer = document.createElement( 'div' );
		spacer.setAttribute( 'class', 'Spacer' );
		dayContainer.appendChild( spacer );
		
		var dayBucket = document.createElement( 'div' );
		dayBucket.setAttribute( 'class', 'DayBucket' );
		dayBucket.setAttribute( 'id', 'glyph_calendar_' + i + '_DayBucket' );
		dayContainer.appendChild( dayBucket );
		
	// create data
	if ( !glyph.calendar.data[i] )
		glyph.calendar.data[i] = {};	
		
	// callback
	glyph.calendar.glyph_calendarCallback = div.getAttribute( 'glyph-callback' );
	
	// set id
	div.glyph_calendarID = i;
		
	// done loading
	glyph.calendar.setDisplay( i );
}

glyph.calendar.setDisplay = function( id, year, month, isInternal )
	{
		// use today if no year and month given
		if ( !year && !month )
		{
			var today = new Date();
			
			month = today.getMonth();
			year = today.getFullYear();
		}
		else if ( !isInternal )
			month = month - 1;
		
			
		// store values
		glyph.calendar.data[id].year = year;
		glyph.calendar.data[id].month = month;
		
		// set labels
		document.getElementById( 'glyph_calendar_' + id + '_YearLabel' ).innerHTML = year;
		document.getElementById( 'glyph_calendar_' + id + '_MonthSelect' ).selectedIndex = month;
		
		// empty bucket
		var bucket = document.getElementById( 'glyph_calendar_' + id + '_DayBucket' );
		bucket.innerHTML = '';
			
		// create date on the 1st
		var date = new Date( year, month, 1, 12, 0, 0 );
		
		// what day of the week is the 1st?
		var offset = date.getDay();
		
		// create that many blank days to offset
		for( var i = 0; i < offset; i++ )
			addDay( id, '', true );
		
		
		// loop through all days in month
		var lastDay = new Date( year, month + 1, 0, 12, 0, 0 );
		
		var filled = 0;
		while ( date <= lastDay )
		{
			// add day to calendar
			var day = date.getDate();
			addDay( id, day, false );
		
			// increase day
			var newDate = date.setDate( date.getDate() + 1 );
			date = new Date( date );
			
			filled++;
		}
		
		// create blanks to fill empty spaces
		var blanks = 42 - filled - offset;
		for( var i = 0; i < blanks; i++ )
			addDay( id, '', true );
	};

function increaseMonth( id, m )
{
	var year = glyph.calendar.data[id].year;
	var month = glyph.calendar.data[id].month;
	
	month += m;
	
	if ( month > 11 )
		month = 0;
		
	if ( month < 0 )
		month = 11;
	
	glyph.calendar.setDisplay( id, year, month, true );
}

function increaseYear( id, y )
{
	var year = glyph.calendar.data[id].year;
	var month = glyph.calendar.data[id].month;
	
	year = parseInt( year );
	year += y;
	
	glyph.calendar.setDisplay( id, year, month, true );
}

function addDay( id, day, greyed )
{	
	var bucket = document.getElementById( 'glyph_calendar_' + id + '_DayBucket' );
	
	var icon = document.createElement( 'div' );
	icon.setAttribute( 'class', 'Day' );
	icon.innerHTML = day;
	
	var year = glyph.calendar.data[id].year;
	var month = glyph.calendar.data[id].month;
	
	// highlight if needed
	if ( glyph.calendar.data[id].highlight && glyph.calendar.data[id].highlight[year] && glyph.calendar.data[id].highlight[year][month] )
		if ( glyph.calendar.data[id].highlight[year][month][day] === true )
			icon.setAttribute( 'class', 'Day Highlighted' );
			
	if ( glyph.calendar.data[id].selected && glyph.calendar.data[id].selected == year + "_" + month + "_" + day )
		icon.setAttribute( 'class', 'Day Selected' );
		
	if ( greyed )
		icon.setAttribute( 'class', 'Day Greyed' );
	else
		icon.onclick = function() { dayClicked( id, day ); };
		
	icon.setAttribute( 'id', 'glyph_cal_' + id + '_' + year + '_' + month + '_' + day );
	
	bucket.appendChild( icon );
}

glyph.calendar.highlightDate = function( id, year, month, day )
	{
		year = parseInt( year );
		month = parseInt( month - 1 );
		day = parseInt( day );

		if ( !glyph.calendar.data[id].highlight )
			glyph.calendar.data[id].highlight = {};
			
		if ( !glyph.calendar.data[id].highlight[year] )
			glyph.calendar.data[id].highlight[year] = {};
			
		if ( !glyph.calendar.data[id].highlight[year][month] )
			glyph.calendar.data[id].highlight[year][month] = {};
			
		glyph.calendar.data[id].highlight[year][month][day] = true;
		
		var icon = document.getElementById( 'glyph_cal_' + id + '_' + year + '_' + month + '_' + day );
		if ( icon )
			icon.setAttribute( 'class', 'Day Highlighted' );
	};

glyph.calendar.dehighlightAll = function( id )
	{
		glyph.calendar.data[id].highlight = {};
		//glyph.calendar.data[id].selected = false;
		
		var year = glyph.calendar.data[id].year;
		var month = glyph.calendar.data[id].month;
		
		// create date on the 1st
		var date = new Date( year, month, 1, 12, 0, 0 );
		
		// loop through all days in month
		var lastDay = new Date( year, month + 1, 0, 12, 0, 0 );
		
		while ( date <= lastDay )
		{	
			// remove highlighting from that day's icon
			var day = date.getDate();
			
			var icon = document.getElementById( 'glyph_cal_' + id + '_' + year + '_' + month + '_' + day );
			if ( icon )
				icon.setAttribute( 'class', 'Day' );
				
			if ( glyph.calendar.data[id].selected && glyph.calendar.data[id].selected == year + "_" + month + "_" + day )
				icon.setAttribute( 'class', 'Day Selected' );
		
			// increase day
			var newDate = date.setDate( date.getDate() + 1 );
			date = new Date( date );
		}
	};

glyph.calendar.deselect = function( id )
	{
		var year = glyph.calendar.data[id].year;
		var month = glyph.calendar.data[id].month;
		
		// create date on the 1st
		var date = new Date( year, month, 1, 12, 0, 0 );
		
		// loop through all days in month
		var lastDay = new Date( year, month + 1, 0, 12, 0, 0 );
		
		while ( date <= lastDay )
		{	
			// remove highlighting from that day's icon
			var day = date.getDate();
			
			var icon = document.getElementById( 'glyph_cal_' + id + '_' + year + '_' + month + '_' + day );
			if ( icon )
				icon.setAttribute( 'class', 'Day' );
				
			// highlight if needed
			if ( glyph.calendar.data[id].highlight && glyph.calendar.data[id].highlight[year] && glyph.calendar.data[id].highlight[year][month] )
				if ( glyph.calendar.data[id].highlight[year][month][day] === true )
					icon.setAttribute( 'class', 'Day Highlighted' );
		
			// increase day
			var newDate = date.setDate( date.getDate() + 1 );
			date = new Date( date );
		}
		
		glyph.calendar.data[id].selected = false;
	};

glyph.calendar.selectDate = function( id, year, month, day, isInternal )
	{
		glyph.calendar.deselect( id );
		
		year = parseInt( year );
		month = parseInt( month );
		day = parseInt( day );
		
		if ( !isInternal )
			month = month - 1;

		var icon = document.getElementById( 'glyph_cal_' + id + '_' + year + '_' + month + '_' + day );
		if ( icon ) icon.setAttribute( 'class', 'Day Selected' );
		glyph.calendar.data[id].selected = year + "_" + month + "_" + day;
	};
	
function dayClicked( id, day )
{	
	var calData = glyph.calendar.data[id];
	glyph.calendar.selectDate( id, calData.year, calData.month, day, true );
	
	// callback
	var dateArr = {};
	dateArr.year = calData.year;
	dateArr.monthName = MonthNames[ calData.month ];
	dateArr.month = calData.month + 1;
	dateArr.day = day;
	
	var callback = eval( glyph.calendar.glyph_calendarCallback );
	callback( dateArr );
}

glyph.calendar.getID = function( cal )
	{
		return cal.glyph_calendarID;
	};

}());
