# colour picker

## glyph.colourPicker()
Create and return a new colour picker  
Returns **[DOMElement]**

## glyph.colourPickerSet( `type`, `colour` )
- `type` **[String]** `hex` or `rgb`
- `colour` **[String]** hex or rgb colour to change to

## glyph.colourPickerChoose( `picker` )
Choose a colour with the specified colour `picker`
- `picker` **[DOMElement]** colour picker to choose colour for

## glyph.colourPickerClose()
Closes the currently open colour picker

## creating a colour picker in HTML
Colour pickers can also be created on page load in HTML:
```
// HTML
<div class="glyph_colourPicker"></div>
```
