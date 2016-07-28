LensBlurDepthExtractor.js
=========================

This library parses images created with the new Android camera app mode Lens Blur and extracts the depth map.

Extractor tool is here: https://clicktorelease.com/tools/lens-blur-depth-extractor

Demo is here: https://www.clicktorelease.com/code/depth-player/

![Snapshot](snapshot.jpg)

How to use
----------

Include the library:
<pre><code>&lt;script src="LensBlurDepthExtractor.js" &gt;&lt;/script&gt;</code></pre>

Instantiate an object:
<pre><code>var d = new DepthReader();</code></pre>

Load from a file:
<pre><code>d.loadFile( 
    'table.jpg', 
    function( src ) { /* src is base64 png source */ }, 
    function( error ) { /* error is a string */ } 
);</code></pre>

Or, load directly from an array buffer
<pre><code>d.parseFile( 
    arrayBuffer, 
    function( src ) { /* src is base64 png source */ }, 
    function( error ) { /* error is a string */ } 
);</code></pre>

License
-------

MIT licensed

Copyright (C) 2016 Jaume Sanchez Elias http://twitter.com/thespite

Table picture by https://twitter.com/blurspline

http://www.clicktorelease.com
