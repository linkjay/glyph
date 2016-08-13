# events

## glyph.event( `target`, `name`, `callback` )
Create an event callback
- `target` **[String]** target event name
- `name` **[String]** some unique name for this callback
- `callback` **[Function]** function to call on event trigger

## glyph.removeEvent( `target`, `name`, `callback` )
Remove an event callback
- `target` **[String]**
- `name` **[String]**
- `callback` **[Function]**

## glyph.ready( callback )
Create a 'ready' event callback  
Called when DOM and scripts are done loading
- `callback` **[Function]**
