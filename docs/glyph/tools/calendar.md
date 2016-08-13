# calendar

## creating a calendar in HTML
Calendars must be created on page load in HTML:
```
// HTML
<div class="glyph_calendar" glyph-callback="MyCallback"></div>
```

## calendarCallback
- `date` **[Object]**
	- `year` **[Integer]** full year
	- `month` **[Integer]** numeric month 1-12
	- `monthName` **[String]** full month name
	- `day` **[Integer]** numeric date 1-31

## glyph.calendar.setDisplay( `id`, `year`, `month` )
Set the year and month to display
- `id` **[Integer]** calendar ID
- `year` **[Integer]** year to display
- `month` **[Integer]** month to display

## glyph.calendar.highlightDate( id, year, month, day )
Highlight a date
- `id` **[Integer]** calendar ID
- `year` **[Integer]** year of date to highlight
- `month` **[Integer]** month of date to highlight
- `day` **[Integer]** day to highlight

## glyph.calendar.dehighlightAll( id )
Remove all highlighted days from the calendar
- `id` **[Integer]** calendar ID

## glyph.calendar.deselect( id )
Remove current day selection
- `id` **[Integer]** calendar ID

## glyph.calendar.selectDate( id, year, month, day )
Select a date
- `id` **[Integer]** calendar ID
- `year` **[Integer]** year of date to select
- `month` **[Integer]** month of date to select
- `day` **[Integer]** day to select

## glyph.calendar.getID( el )
Get the internal ID of a calendar element for use with other functions
- `element` **[DOMElement]** calendar ID
