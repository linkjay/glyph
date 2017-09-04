# particle

## glyph.particle.init( `canvas` )
Prepares canvas for use with particles  
Returns **[[particleContext](#particlecontext)]**
- `canvas` **[DOMElement]** *`<canvas>`* element to create particles in
		
## glyph.particle.create( `context` )
Create and return a particle object  
Returns **[[glyphParticle](#glyphparticle)]**
- `context` **[[particleContext](#particlecontext)]** context returned from `glyph.particle.canvas`

## glyph.particle.emit( `particle` )
Emits and begins rendering a particle
- `particle` **[[glyphParticle](#glyphparticle)]** particle to emit

## glyph.particle.delete( `particle` )
Deletes a particle object
- `particle` **[[glyphParticle](#glyphparticle)]** particle to delete

## glyphParticle
All parameters optional
- `position` **[[Vector](#vector)]** position of particle
- `offset` **[[Vector](#vector)]** local offset to position
- `velocity` **[[Vector](#vector)]** velocity of particle
- `acceleration` **[[Vector](#vector)]** acceleration of particle

- `opacity` **[Float]** opacity of particle (0-1)
- `scale` **[Float]** scale of particle (0-1)
	
- `image` **[String or [Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)]** URL to image or Image object
- `radius` **[Float]** radius of particle if no image is set
- `colour` **[[Vector](#vector)]** colour of particle if no image is set

- `rotation` **[Float]** initial rotation of particle in degrees
- `rotation_vel` **[Float]** rotational velocity in degrees
- `rotation_accel` **[Float]** rotational acceleration in degrees

- `lifespan` **[Float]** lifespan of particle in milliseconds
- `life_offset` **[Float]** offset to initial life in milliseconds

- `opacity_end` **[Float]** opacity at end of lifespan  
- `scale_end` **[Float]** scale at end of lifespan
- `colour_end` **[[Vector](#vector)]** colour at end of lifespan

- `callback` **[[particleCallback](#particlecallback)]** per-particle update callback

## particleContext
Extends **[CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)**

## Vector
- `x` or or `r` or `[0]` **[Float]**
- `x` or or `g` or `[1]` **[Float]**
- `x` or or `b` or `[2]` **[Float]**

## particleCallback
Called every frame before drawing and after base update code
- `particle` **[[glyphParticle](#glyphparticle)]**
- `frameTime` **[Float]**
