# modal

## glyph.modal( `[params]` )
Create and return a modal popup  
If another modal is already open, it will be closed  
Returns **[DOMElement]** of modal's content element
- <sub><sup>optional</sup></sub> `params` **[Object]]*
	- <sub><sup>optional</sup></sub> `overlay` **[Boolean]** create an overlay behind the modal?  
		<sup>default: **false**</sup>
	- <sub><sup>optional</sup></sub> `header` **[Boolean]** create a header at the top of the modal?  
		<sup>default: **true**</sup>
	- <sub><sup>optional</sup></sub> `close` **[Boolean]** create a close button in the header?  
		<sup>default: **true**</sup>
	- <sub><sup>optional</sup></sub> `title` **[String]** title to put in the modal's header  
		<sup>default: **'Modal'**</sup>
	- <sub><sup>optional</sup></sub> `animate` **[Boolean]** animate opening and closing of the modal?  
		<sup>default: **true**</sup>
		
## glyph.modalClose()
Close the currently open modal

## glyph.modalTitle( `text` )
Change the currently open modal's title
- `text` **[String]** new modal title

## glyph.modalClose()
Get the currently open modal's content element  
Returns **[DOMElement]**

## glyph.modalAutosize( `[toWidth]` )
Attempt to automatically size the modal to its contents
- <sub><sup>optional</sup></sub> `toWidth` **[Integer]** size the modal to this fixed width

## glyph.modalSize( `width`, `height`, `[useHeaderDiff]` )
Size the modal to the specified `width` and `height`
- <sub><sup>optional</sup></sub> `useHeaderDiff` **[Boolean]** add the header's height to the final size  
	<sup>default: **true**</sup>
