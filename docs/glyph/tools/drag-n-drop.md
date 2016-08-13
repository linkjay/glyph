# drag n drop

## glyph.dragInit( `container`, `[params]` )
Initialize a `container` as having draggable elements
- `container` **[DOMElement]**
- <sub><sup>optional</sup></sub> `params` **[Object]**
	- <sub><sup>optional</sup></sub> `group` **[String]** some identifier, only elements within the same group may interact with one another
	- <sub><sup>optional</sup></sub> `templates` **[Boolean]** should elements within this container be treated as templates?  
		<sup>default: **false**, if **true** dragging elements from this container will create copies, and the original will remain in place as a template</sup>
	- <sub><sup>optional</sup></sub> `axis` **[String]** axis to drag on, can be `x`, `y`, or `both`  
		<sup>default: **both**</sup>
	- <sub><sup>optional</sup></sub> `safezone` **[Integer]** drag will not begin until element has been dragged this many pixels away from its origin  
		<sup>default: **0**, when non-0 this will help prevent short clicks from unintentionally dragging elements around</sup>
		
## css classes
- `.glyph_draggable` designates a container of draggable elements
- `.glyph_drag-placeholder` used for styling placeholder elements
- `.glyph_drag-active` used for styling the element currently being dragged
- `.glyph_drag-frozen` designates an element that has a frozen position
- `.glyph_drag-disabled` designates an element that cannot be dragged

## initializing a draggable container in HTML
Draggable containers can also be created on page load in HTML:
```
<div class="glyph_draggable" glyph-dragparams="{ group: 'abc', safezone: 5, axis: 'y' }">
	<div>element 1</div>
	<div>element 2</div>
	<div>element 3</div>
</div>
```
