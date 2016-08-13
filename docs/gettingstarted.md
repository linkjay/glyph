# usage
1. Include `glyph.min.js` or `glyph.js` in your code:  
`<script src="glyph.min.js"></script>`  
2. You're done!

# shortcuts & compatibility

glyph is meant to be as compatible as possible, and should not interfere with any other libraries.  
By default, the only global variable is `glyph`

However, if you aren't using any other libraries, you can enable glyph's shortcut functions to simplify your code.

## glyph.init( `[variable]` )
Sets glyph shortcut functions to `$` and `$$`  
- <sub><sup>optional</sup></sub> `variable` **[String]** name of variable to use instead of `$`

## glyph.reset()
Restores `$` and `$$` (or whatever variable you chose) to their previous values  
All glyph functions can still be accessed under the `glyph` variable

## $
<sup>Alias of [glyph.id](glyph/dom.md#glyphid-id-)</sup>

All `glyph` member functions can be accessed under this variable  
It can also be used to quickly return elements by a specified ID

## $$
<sup>Alias of [glyph.sel](glyph/dom.md#glyphsel-selector-parent-)</sup>

Query selector shortcut so you don't have to type `document.querySelectorAll` every time
