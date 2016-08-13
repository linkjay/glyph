# accordion

## glyph.accordion()
Create an expandable accordion container  
Returns **[DOMElement]**

## glyph.accordionToggle( `accordion` )
Manually toggle an accordion open or closed  
- `accordion` **[DOMElement]**

## accordion members
- `accordion.contents` **[DOMElement]** contents of the accordion, can be modified with `innerHTML`
- `accordion.label` **[DOMElement]** accordion title, can be modified with `innerHTML`

## creating an accordion in HTML
Accordions can also be created on page load in HTML:
```
// HTML
<div class="glyph_accordion" title="Something">contents</div>
```
