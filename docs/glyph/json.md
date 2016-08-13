# json

## glyph.parseJSON( `json` )
Parse JSON, but return `undefined` if an error is caught.  
This is helpful for handling malformed or invalid JSON, like so:
```
var data = glyph.parseJSON( json );
if ( !data )
	throw 'error';
```
