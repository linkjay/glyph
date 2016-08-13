# math

## glyph.rand( `min`, `max` )
Returns **[Integer]** between `min` and `max`
- `min` **[Integer]**
- `max` **[Integer]**

## glyph.round( `float`, `places` )
Rounds a `float` to however many decimal `places`  
Returns **[Float]**
- `float` **[Float]**
- `places` **[Integer]**

## glyph.clamp( `number`, `min`, `max` )
Clamp a `number` between `min` and `max`  
Returns **[Float]**
- `number` **[Float]**
- `min` **[Float]**
- `max` **[Float]**

## glyph.rgbToHex( `r`, `g`, `b` )
Converts RGB colour values to hex  
Returns **[String]**
- `r` **[Integer or String]**
- `g` **[Integer or String]**
- `b` **[Integer or String]**

## glyph.rgbStringToHex( `rgb` )
Converts an RGB colour string (like in CSS) to hex  
Returns **[String]**
- `rgb` **[String]**

## glyph.hexToRGB( `hex` )
Converts a hex colour to RGB values  
- `hex` **[String]**

Returns **[Object]:**
- `r` **[Integer]**
- `g` **[Integer]**
- `b` **[Integer]**

## glyph.hexToRGBString( `hex` )
Converts a hex colour to an RGB string (like in CSS)  
Returns **[String]**
- `hex` **[String]**

## glyph.closestPoT( `number` )
Find the closest power of two to `number`  
Returns **[Integer]**
- `number` **[Float]**

## glyph.dist( `n1`, `n2` )
Distance (or length) between two numbers  
Returns **[Float]**
- `n1` **[Float]**
- `n2` **[Float]**

## glyph.lerp( `v0`, `v1`, `w` )
Linear interpolation between `v0` and `v1` by `w`  
Returns **[Float]**
- `v0` **[Float]**
- `v1` **[Float]**
- `w` **[Float]**

## glyph.smoothstep( `e0`, `e1`, `x` )
Smooth interpolation between `e0` and `e1` by `x`  
Returns **[Float]**
- `e0` **[Float]**
- `e1` **[Float]**
- `x` **[Float]**

## glyph.TwoPi
**[Float]** Two pies.
