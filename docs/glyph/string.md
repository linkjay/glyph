# string

## glyph.empty( `str` )
Returns **[Boolean]** if `str` is empty  
- `str` **[String]**

## glyph.insertStrAt( `newtext`, `string`, `index` )
Inserts `newtext` into `string` at `index`  
- `string` **[String]** string to insert text into
- `newtext` **[String]** new text being inserted
- `index` **[Integer]** character index to insert text at

## glyph.concat( `object`, `[encode]` )
Concatenate `object` into a key, value string for URLs (with &'s and ='s)  
Returns **[String]**
- `object` **[Object]**
- <sub><sup>optional</sup></sub> `encode` **[Boolean]**  
	<sup>default: **false**, if **true** will pass all keys and values through URI encoding</sup>
	
## glyph.sanitize( `str` )
Sanitize `str` for use in URIs (replaces & with %26)  
Returns **[String]**
- `str` **[String]**

## glyph.encode( `str` )
URI-encode `str`  
Returns **[String]**
- `str` **[String]**

## glyph.inStr( `needle`, `haystack` )
Returns **[Boolean]** if `needle` is found in `haystack`
- `needle` **[String]**
- `haystack` **[String]**

## glyph.strCount( `needle`, `haystack` )
Returns **[Integer]** for number of times `needle` is found in `haystack`
- `needle` **[String]**
- `haystack` **[String]**

## glyph.htmlDecode( `str` )
Decode HTML entities in `str`  
Returns **[String]**
- `str` **[String]**

## glyph.htmlEncode( `str` )
Decode `str` with HTML entities  
Returns **[String]**
- `str` **[String]**

## glyph.strcmp( `a`, `b` )
Compare strings `a` and `b`  
Returns **`-1`** if `a` comes after `b`  
Returns **`1`** if `b` comes after `a`  
- `a` **[String]**
- `b` **[String]**

## glyph.split( `str`, `delimiter`, `limit` )
Split `str` by a `delimiter` with a `limit` on how many times it splits  
Returns **[Array]**  
- `str` **[String]**
- `delimiter` **[String]**
- `limit` **[Integer]**

## glyph.regex( `regex`, `str` )
Execute `regex` on `str` and return all capture group matches as an array  
Returns **[Array]**  
- `regex` **[RegEx]**
- `str` **[String]**
