# styling

glyph includes its default stylesheets embedded within `glyph.js`  
However, you can override these however you like.

In glyph's unprocessed source, each tool has its own `css` file:  
`src/glyph/tools/*_styles.css`

It's recommended that you use these merely as reference and override their properties in your own stylesheets on your webpage. However, if you prefer, you may also modify them and rebuild glyph instead to have them embedded in your own custom `glyph.js`.

# building

glyph uses [gulp](http://gulpjs.com/) for build automation

1. Install [node and npm](https://nodejs.org/en/)
2. Run `npm install` in the root `glyph` folder
3. Run `gulp` to build

Output will be in the `dist/` folder
