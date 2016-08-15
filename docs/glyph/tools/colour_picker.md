# colour picker

## glyph.colourPicker( `[params]` )
Create and return a new colour picker  
Returns **[DOMElement]**
- <sub><sup>optional</sup></sub> `params` **[Object]**
	- <sub><sup>optional</sup></sub> `colour` **[String]** initial colour in RGB or hex
	- <sub><sup>optional</sup></sub> `callback` **[Function]** called when colour is changed, takes `hex` and `rgb` arguments
	- <sub><sup>optional</sup></sub> `input` **[Object]** if **true**, will use `<input>` element instead of `<div>`

## glyph.colourPickerSet( `picker`, `colour` )
- `picker` **[DOMElement]** colour picker to set colour for
- `colour` **[String]** hex or rgb colour to change to

## glyph.colourPickerChoose( `picker` )
Manually popup the colour `picker` for the user to choose a new colour
- `picker` **[DOMElement]** colour picker to choose colour for

## glyph.colourPickerClose()
Closes the currently open colour picker

## creating a colour picker in HTML
Colour pickers can also be created on page load in HTML:
```
// HTML
<div class="glyph_colourPicker" glyph-pickerparams="{ colour: '#f00', callback: 'colourChanged' }"></div>
```
