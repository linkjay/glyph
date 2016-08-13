# effect

## glyph.fadeDelete( `element`, `[delay]` )
Fade an `element` away, then delete it after `delay` seconds
- `element` **[DOMElement]**
- <sub><sup>optional</sup></sub> `delay` **[Integer]**  
	<sup>default: **1**</sup>

## glyph.stretchIn( `element`, `[params]` )
Stretch an `element` in (after creation)
- <sub><sup>optional</sup></sub> params **[Object]**
	- <sub><sup>optional</sup></sub> delay **[Integer]** seconds before element is full sized  
		<sup>default: **0.4**</sup>
	- <sub><sup>optional</sup></sub> vertical **[Boolean]** stretch vertically  
		<sup>default: **true**</sup>
	- <sub><sup>optional</sup></sub> horizontal **[Boolean]** stretch horizontally  
		<sup>default: **false**</sup>
	- <sub><sup>optional</sup></sub> uniform **[Boolean]** stretch vertically and horizontally  
		<sup>default: **false**</sup>
		
## glyph.stretchOut( `element`, `[params]` )
Stretch an `element` out (after creation)
- <sub><sup>optional</sup></sub> params **[Object]**
	- <sub><sup>optional</sup></sub> delay **[Integer]** seconds before element is gone  
		<sup>default: **0.4**</sup>
	- <sub><sup>optional</sup></sub> remove **[Boolean]** also remove `element` after delay   
		<sup>default: **true**</sup>
	- <sub><sup>optional</sup></sub> vertical **[Boolean]** stretch vertically  
		<sup>default: **true**</sup>
	- <sub><sup>optional</sup></sub> horizontal **[Boolean]** stretch horizontally  
		<sup>default: **false**</sup>
	- <sub><sup>optional</sup></sub> uniform **[Boolean]** stretch vertically and horizontally  
		<sup>default: **false**</sup>
