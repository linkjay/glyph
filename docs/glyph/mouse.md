# mouse

## glyph.mousePos
**[Object]** The mouse's current position on the screen  
- `x` **[Float]**
- `y` **[Float]**

## glyph.mouseDown
**[Boolean]** Whether the mouse is currently held down

## glyph.mouseOffset( `element` )
Offset from `element`'s postion to mouse  
- `element` **[DOMElement]**

Returns **[Object]:**
- `x` **[Integer]**
- `y` **[Integer]**

## glyph.mouseDist( `coord` )
Distance from mouse to `coord`  	 
Returns **[Integer]**
- `coord` **[Object or Array]**
	- `x` **[Integer]**
	- `y` **[Integer]**

## glyph.isUnderPos( `element`, `pos` )
Returns **[Boolean]** if `element` is under `pos`
- `element` **[DOMElement]**
- `pos` **[Object or Array]**
	- `x` **[Integer]**
	- `y` **[Integer]**

## glyph.isUnderMouse( `element` )
Returns **[Boolean]** if `element`'s bounds are under the mouse coordinates  
Generally more reliable than `glyph.isMouseOver`
- `element` **[DOMElement]**

## glyph.isMouseOver( `element` )
Returns **[Boolean]** if `element` contains the `:hover` selector
- `element` **[DOMElement]**

## glyph.underMouse( `toArray` )
Returns **[[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) or Array]** of all **DOMElement**s with the `:hover` selector
- `toArray` **[Boolean]** convert **[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)** to **Array**

## `onrightclick` handler
glyph adds a custom `onrightclick` handler to easily set your own right-click callbacks
```
// set from Javascript
el.setAttribute( 'onrightclick', 'doSomething();' );
el.onrightclick = function() { doSomething(); };

// set from HTML
<div onrightclick="doSomething();"></div>
```
