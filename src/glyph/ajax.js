(function(){

function sendCallback( success, xmlhttp, params )
{
	params.callback( {
						response: xmlhttp.responseText,
						success: success,
						status: xmlhttp.status,
						request: xmlhttp,
						args: params.args
					 } );
	if ( !success )
		throw 'failed ajax request';
}

glyph.ajax = function( params, attemptNum )
	{			
		if ( typeof params.args == 'undefined' )
			params.args = {};
		
		var method = 'GET';
		if ( params.method )
			method = params.method;
		
		if ( method == 'GET' )
			params.url += '?' + glyph.concat( params.data );
		
		attemptNum = attemptNum || 0;
		params.maxTries = params.maxTries || 1;

		var xmlhttp = new XMLHttpRequest();		
		xmlhttp.open( method, params.url, true );
		
		xmlhttp.onreadystatechange = 	function()
										{											
											if ( xmlhttp.readyState == 4 )
											{
												if ( xmlhttp.status == 200 )
												{													
													if ( params.callback )
														sendCallback( true, xmlhttp, params );
												}
												else
												{
													attemptNum++;
													
													if ( params.maxTries > 0 && attemptNum < params.maxTries )
														glyph.ajax( params, attemptNum );
													else
														sendCallback( false, xmlhttp, params );
												}
											}
										};
										
		if ( params.callback_progress )
			xmlhttp.upload.addEventListener( 'progress', function( e ) { params.callback_progress( {
																										progress: e,
																										args: params.args
																									} ); }, false );
		
		var contentType = params.contentType || 'application/x-www-form-urlencoded';
		if ( params.binary === true )
			contentType = 'application/octet-stream';
		xmlhttp.setRequestHeader( 'Content-type', contentType );
		
		if ( params.data && method != 'GET' )
		{		
			if ( params.binary === true )
				params.escape = false;
			
			if ( params.escape !== false )
			{
				if ( typeof params.data == 'object' )
					params.data = glyph.concat( params.data, '&', true );
				else if ( typeof params.data == 'string' )
					params.data = glyph.sanitize( params.data );
			}

			xmlhttp.send( params.data );
		}
		else
			xmlhttp.send();
	};

}());
