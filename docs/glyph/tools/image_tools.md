# image tools

## glyph.imageSlider( `element`, `[params]` )
Used to create image sliders via Javascript
- `element` **[DOMElement]** container element to turn into a slider
- <sub><sup>optional</sup></sub> `params` **[Object]**
	- <sub><sup>optional</sup></sub> `delay` **[Float]** delay in seconds between image rotations  
		<sup>default: **5**</sup>
	- <sub><sup>optional</sup></sub> `static` **[Boolean]** if static, slider will not rotate images automatically  
		<sup>default: **false**</sup>
	- <sub><sup>optional</sup></sub> `pauseOnHover` **[Boolean]** pauses sliding when user hovers over slider  
		<sup>default: **true**</sup>

## creating an image slider in HTML
```
<div class="glyph_imageSlider" style="width: 512px; height: 218px;" glyph-sliderparams="{ delay: 10 }">
	<img src="thing1.jpg" />
	<img src="thing2.jpg" />
	<img src="thing3.jpg" />
</div>
```

---

## creating lightbox images
```
// with <img> tags
<img glyph-lightbox="group1" src="thing1.jpg" alt="some caption" />
<img glyph-lightbox="group1" src="thing2.jpg" />
<img glyph-lightbox="group1" src="thing3.jpg" />

// with <a> tags
<a glyph-lightbox="group1" href="thing3.jpg">caption 1</a>
<a glyph-lightbox="group1" href="thing3.jpg">caption 2</a>
<a glyph-lightbox="group1" href="thing3.jpg">caption 3</a>
```

## glyph.lightboxInit()
You can also add lightbox functionality to images via Javascript, simply by adding the `glyph-lightbox` attribute to an `image` element.  
Call this function whenever you've manually done so to initialize them.

---

## combining lightboxes and sliders
```
<div style="background: #222; border: 10px solid #222; border-radius: 5px; display: inline-block;">
	<div class="glyph_imageSlider" style="width: 512px; height: 218px;">
		<img glyph-lightbox="something" src="thing1.jpg" alt="caption 1" />
		<img glyph-lightbox="something" src="thing2.jpg" alt="caption 2" />
		<img glyph-lightbox="something" src="thing3.jpg" alt="caption 3" />
		<img glyph-lightbox="something" src="thing4.jpg" alt="caption 4" />
		<img glyph-lightbox="something" src="thing5.jpg" alt="caption 5" />
	</div>
</div>
```
