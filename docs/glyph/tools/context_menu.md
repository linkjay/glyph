# context menu

## glyph.contextMenu( `template` )
Create and return a context menu
- `template` **[Array]** template to build context menu from

## context menu templates
glyph uses an array of menu items to build context menus.  
Hopefully the example below is self-descriptive enough.  
 * `click` can be a string or a function.  
 * You can have as many levels of `submenu` as you want.

```
[
	{
		label: 'item 1',
		click: function() { alert( 'item 1 clicked' ); }
	},
	{
		label: 'item 2',
		click: "alert( 'item 2 clicked' );"
	},
	{
		label: 'item 3',
		submenu:
			[
				{
					label: 'item 4',
					click: "alert( 'item 4 clicked' );"
				}
			]
	}
]
```
