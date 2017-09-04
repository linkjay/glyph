# ajax

## glyph.ajax ( `params` )
Ajax helper function
- `params` **[Object]**
	- `url` **[String]** URL to send the request to
	- <sub><sup>optional</sup></sub> `data` **[Object]** data to send along with the request
	- <sub><sup>optional</sup></sub> `method` **[String]** GET HTTP method (GET, POST, etc..)  
		<sup>default: **'GET'**</sup>
	- <sub><sup>optional</sup></sub> `contentType` **[String]** content type of data  
		<sup>default: **'application/x-www-form-urlencoded'**</sup>
	- <sub><sup>optional</sup></sub> `escape` **[Boolean]** should data be escaped?  
		<sup>default: **true**</sup>
	- <sub><sup>optional</sup></sub> `binary` **[Boolean]** is the data binary?  
		<sup>default: **false**, sets *contentType* to **'application/octet-stream'** and *escape* to **false** when **true**</sup>
	- <sub><sup>optional</sup></sub> `callback` **[[ajaxCallback](#ajaxcallback)]** callback function
	- <sub><sup>optional</sup></sub> `args` **[*any*]** value(s) to pass through to callback
	- <sub><sup>optional</sup></sub> `callback_progress` **[[ajaxProgressCallback](#ajaxprogresscallback)]** 'progress' event callback
	- <sub><sup>optional</sup></sub> `maxTries` **[Integer]** maximum number of tries  
		<sup>default: **1**</sup>
	- <sub><sup>optional</sup></sub> `responseType` **[String]**

### ajaxCallback
- `arguments` **[Object]**
	- `response` **[[XMLHttpRequest.responseText](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText)]** response text
	- `success` **[Boolean]** was the request successful
	- `status` **[Integer]** HTTP status code
	- `request` **[[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)]** request object
	- `args` **[*any*]**  custom values passed from glyph.ajax

### ajaxProgressCallback
- `arguments` **[Object]**
	- `progress` **[[ProgressEvent](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)]** upload progress event
	- `args` **[*any*]** custom values passed from glyph.ajax
