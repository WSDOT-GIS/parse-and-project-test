parse-and-project-test
======================

A test application that uses Terraformer and Proj4JS to parse OGC Simple Geometry and project the results.

The test page will...

1. Parse an OGC Simple Geometry representation of a polyline
2. Project the polyline from [2927] to [3857].
3. Add the polyline to a map as a graphic.

## Setup ##

1. Clone the repository: `git clone --recurse-submodules`
2. Open the project file in Visual Studio. (Created with Visual Studio 2013.)

## Submodules ##

* [Terraformer]
  * [terraformer-wkt-parser]
  * [terraformer-arcgis-parser]

## External references (via [cdnjs]) ##

  * [Proj4js]
  * [use.js]


[cdnjs]://cdnjs.com/
[2927]:http://spatialreference.org/ref/epsg/2927/
[3857]:http://spatialreference.org/ref/sr-org/7483/
[Proj4js]://trac.osgeo.org/proj4js/
[Terraformer]://github.com/esri/Terraformer
[terraformer-wkt-parser]://github.com/Esri/terraformer-wkt-parser/
[terraformer-arcgis-parser]://github.com/Esri/terraformer-arcgis-parser/
[use.js]://github.com/tbranyen/use.js
