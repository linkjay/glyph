# json

## glyph.parseJSON( `json` )
Parse JSON, but return `undefined` if an error is caught.  
This is helpful for handling malformed or invalid JSON, like so:
```
var data = glyph.parseJSON( json );
if ( !data )
	throw 'error';
```

## glyph.jsonp( `url`, `callback` )
Request JSONP from `url`, which will be received in `callback`  
- `url` **[String]**
- `callback` **[String or Function]**

Callback function arguments
 - `json` **[Object]**
