# dom

## glyph.id( `id` )
Shorthand alias for `document.getElementById`  
Returns **[DOMElement]**
- `id` **[String]** id of element to retrieve

## glyph.sel( `selector`, `[parent]` )
Shorthand alias for `document.querySelectorAll`  
Will query children under `parent` if specified  
Returns **[[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)]**
- `selector` **[String]** selector to query
- <sub><sup>optional</sup></sub> `parent` **[DOMElement]** parent element to query

## glyph.addClass( `element`, `class` )
Adds class to element
- `element` **[DOMElement]**
- `class` **[String]**

## glyph.removeClass( `element`, `class` )
Removes class from element
- `element` **[DOMElement]**
- `class` **[String]**

## glyph.hasClass( `element`, `class` )
Check if `element` has `class`  
Returns **[Boolean]**
- `element` **[DOMElement]**
- `class` **[String]**

## glyph.toggleClass( `element`, `class` )
Toggles class on element
- `element` **[DOMElement]**
- `class` **[String]**

## glyph.hasParent( `element`, `parent` )
Check if `element` has `parent` (recursive)  
Returns **[Boolean]**
- `element` **[DOMElement]**
- `parent` **[DOMElement]**

## glyph.matches( `element`, `selector` )
Check if `element` matches `selector`  
Returns **[Boolean]**
- `element` **[DOMElement]**
- `selector` **[String]**

## glyph.matchParents( `element`, `selector`, `[offset]` )
Check if `element`'s parents match `selector` (recursive) and return the one that does  
Returns matching parent **[DOMElement]** or **`false`**
- `element` **[DOMElement]**
- `selector` **[String]**
- <sub><sup>optional</sup></sub> `offset` **[Integer]**  
	<sup>if set, will return matching parent's n<sup>th</sup> child</sup>

## glyph.hasParentSelector( `element`, `selector` )
Check if `element`'s parents matches `selector` (recursive)  
Returns **[Boolean]**
- `element` **[DOMElement]**
- `selector` **[String]**

## glyph.insertAfter( `element`, `reference` )
Insert `element` after `reference` element
- `element` **[DOMElement]**
- `reference` **[DOMElement]**

## glyph.insertBefore( `element`, `reference` )
Insert `element` before `reference` element
- `element` **[DOMElement]**
- `reference` **[DOMElement]**

## glyph.remove( `element` )
Remove `element`
- `element` **[DOMElement]**

## glyph.clear( `element` )
Clears `element`'s innerHTML
- `element` **[DOMElement]**

## glyph.set( `element`, `attribute`, `value` )
Sets `element`'s `attribute` to `value`
- `element` **[DOMElement]**
- `attribute` **[String]**
- `value` **[String]**

## glyph.get( `element`, `attribute` )
Get the value of `element`'s `attribute`  
Returns **[String]**
- `element` **[DOMElement]**
- `attribute` **[String]**

## glyph.create( `type`, `[subtype]` )
Create a new element with `type`  
Returns **[DOMElement]**
- `attribute` **[String]**
- <sub><sup>optional</sup></sub> `subtype` **[String]**  
	<sup>if set, will set the `type` attribute of the new element to `subtype`</sup>

## glyph.append( `child`, `parent` )
Appends `child` to `parent`  
If `child` is a string, appends to the `parent`'s innerHTML
- `child` **[DOMElement or String]**
- `parent` **[DOMElement]**

## glyph.contains( `element`, `child` )
Check if `element` is a parent of `child`
Returns **[Boolean]**
- `element` **[DOMElement]**
- `child` **[DOMElement]**

## glyph.pageScroll()
Get the page's current scroll offset  
Returns **[Object]:**
- `top` **[Integer]**
- `left` **[Integer]**

## glyph.size( `element` )
Get an `element`'s computed size from CSS
- `element` **[DOMElement]**

Returns **[Object]:**
- `width` **[Integer]**
- `height` **[Integer]**

## glyph.bounds( `element` )
Get an `element`'s bounding rectangle  
Returns **[[DOMRect](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect)]**
- `element` **[DOMElement]**

## glyph.boundsOuter( `element` )
Get an `element`'s bounding rectangle with margins added  
Returns **[[DOMRect](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect)]**
- `element` **[DOMElement]**

## glyph.offset( `element` )
Get an `element`'s bounding rectangle with page scroll offset added  
Returns **[[DOMRect](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect)]**
- `element` **[DOMElement]**

## glyph.offsetOuter( `element` )
Get an `element`'s bounding rectangle with page scroll offset and margins added  
Returns **[[DOMRect](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect)]**
- `element` **[DOMElement]**

## glyph.addOption( `dropdown`, `name`, `value` )
Shortcut to add an option tag to a `dropdown`
- `dropdown` **[DOMElement]**
- `name` **[String]**
- `value` **[String]**

## glyph.selectOptionText( `dropdown`, `text` )
Select a `dropdown` option by text (innerHTML)
- `dropdown` **[DOMElement]**
- `text` **[String]**

## glyph.selectOptionValue( `dropdown`, `value` )
Select a `dropdown` option by value
- `dropdown` **[DOMElement]**
- `value` **[String]**

## glyph.selectedOption( `dropdown` )
Returns **[DOMElement]** of selected option
- `dropdown` **[DOMElement]**

## glyph.setDefaultOptionText( `dropdown`, `text` )
Set the default (first) option of a `dropdown` by text (innerHTML)
- `dropdown` **[DOMElement]**
- `text` **[String]**

## glyph.setDefaultOptionValue( `dropdown`, `value` )
Set the default (first) option of a `dropdown` by value
- `dropdown` **[DOMElement]**
- `value` **[String]**

## glyph.sortChildren( `parent`, `attribute`, `[reverse]` )
Sort `parent`'s children by the value of their `attribute`
- `parent` **[DOMElement]**
- `attribute` **[String]**
- <sub><sup>optional</sup></sub> `reverse` **[Boolean]**

## glyph.frameContent( `frame` )
Returns **[DOMElement]** of `frame`'s body
- `frame` **[DOMElement]**

## glyph.include( `url`, `[callback]` )
Includes a script or stylesheet from `url`  
Calls `callback` when done loading
- `url` **[String]**
- <sub><sup>optional</sup></sub> `callback` **[Function]**
