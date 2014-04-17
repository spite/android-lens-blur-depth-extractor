(function() {

	'use strict';

	var DepthReader = function() {

	}

	function memcpy(dst, dstOffset, src, srcOffset, length) {
		var dstU8 = new Uint8Array(dst, dstOffset, length);
		var srcU8 = new Uint8Array(src, srcOffset, length);
		dstU8.set(srcU8);
	};

	function ab2str(buf) {
		return String.fromCharCode.apply(null, new Uint8Array(buf));
	}

	DepthReader.prototype.parseFile = function( arrayBuffer, onSuccess, onError ) {
		
	    var byteArray = new Uint8Array(arrayBuffer);
	    var str = '';

	    if( byteArray[ 0 ] == 0xff && byteArray[ 1 ] == 0xd8 ) {

		    var boundaries = [];
		    for (var i = 0; i < byteArray.byteLength; i++) {
		    	if( byteArray[ i ] == 0xff && byteArray[ i + 1 ] == 0xe1 ) {
		    		boundaries.push( i );
		    		i++;
		    	}
		    }
		    boundaries.push( byteArray.byteLength );

		    for( var j = 0; j < boundaries.length - 1; j++ ) {

		    	if( byteArray[ boundaries[ j ] ] == 0xff && byteArray[ boundaries[ j ] + 1 ] == 0xe1 ) {
		    		
		    		var length = byteArray[ boundaries[ j ] + 2 ] * 256 + byteArray[ boundaries[ j ] + 3 ];

		    		var offset = 79;
		    		if( offset > length ) offset = 0;
		    		length += 2;

		    		var tmp = new ArrayBuffer( length - offset );
		    		memcpy( tmp, 0, arrayBuffer, boundaries[ j ] + offset, length - offset);
		    		var tmpStr = ab2str( tmp );
		    		str += tmpStr;

		    	}
		    }

		   	var re = /GDepth:Data="([\S]*)"/;
		   	var m = re.exec(str);
		   	
		   	if( m === null ) {
		   		if( onError ) onError( 'No depth data found' );
		   		return;
		   	}

		   	var depthData = m[ 1 ];
		   	if( onSuccess ) onSuccess( 'data:image/png;base64,' + depthData );

		} else {
			if( onError ) onError( 'File is not a JPEG' );
		}

	}

	DepthReader.prototype.loadFile = function( file, onSuccess, onError ) {

		var xhr = new XMLHttpRequest();
		xhr.open( 'get', file );
		xhr.responseType = 'arraybuffer';
		var self = this;
		xhr.onload = function() {
			self.parseFile( this.response, onSuccess, onError );
		};
		xhr.send( null );

	}

	window.DepthReader = DepthReader;

} )();