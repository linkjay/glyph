glyph.init = function( variable )
	{
		var variable = variable || '$';
		glyph.globalVar = variable;
		
		glyph.oldVar = window[variable];
		glyph.oldVarVar = window[variable+variable];
		
		window[variable] = glyph;
		window[variable+variable] = glyph.sel;
	};
	
glyph.reset = function()
	{
		var variable = glyph.globalVar;
		
		window[variable] = glyph.oldVar;
		window[variable+variable] = glyph.oldVarVar;
	};
