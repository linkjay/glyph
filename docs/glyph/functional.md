# functional

## glyph.inArray( `item`, `array` )
Returns **[[Boolean]]** if `item` is in `array`
- `item` **[*any*]**
- `array` **[Array]**

## glyph.isArray( `variable` )
Returns **[[Boolean]]** if `variable` is an array
- `variable` **[*(any)*]**

## glyph.inArray( `object` )
Convert an `object` to an array  
Returns **[[Array]]**
- `object` **[Object]**

## glyph.clone( `array` )
Duplicate an `array`, breaking references to the original  
Returns **[[Array]]**
- `array` **[Array]**

## glyph.copy( `object` )
Duplicate an `object`, breaking references to the original  
Returns **[[Object]]**
- `object` **[Object]**

## glyph.forEach( `array`, `function` )
Calls `function` for each element in `array`
- `array` **[Array or [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)]**
- `function` **[Function(`el`,`i`)]**
	- `element` **[*any*]**
	- `index` **[Integer]**
	
## glyph.cancelEvent( `event` )
Cancel an event from happening (or continuing)
- `event` **[[Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)]**

## glyph.eventTarget( `event` )
Get the target element of an event  
Returns **[[DOMElement]]**
- `event` **[[Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)]**
