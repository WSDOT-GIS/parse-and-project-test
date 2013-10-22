/*global require, Terraformer, Proj4js */
require([
	"esri/map",
	"esri/geometry/jsonUtils",
	"use!proj4js",
	"proj4js/defs/GOOGLE.min",
	"use!terraformer",
	"use!terraformer-wkt-parser",
	"use!terraformer-arcgis-parser"
], function (Map, jsonUtils, Proj4js, prjGoogle, Terraformer, TFWkt, TFAgs) {
	"use strict";

	/** Converts wkt into an ArcGIS polyline.
	 * @param {string} wkt The OGC Simple Geometry Well-Known Text.
	 * @param {number} [wkid] The Well-Known ID of the spatial reference. Defaults to 4326.
	 * @returns {esri/geometry/Geometry}
	 */
	function wktToGeometry(wkt, wkid) {
		var polyline;
		// Parse into a terraformer primitive.
		polyline = TFWkt.parse(wkt);
		// Convert primitive into a polyline object. (Regular JS object)
		polyline = TFAgs.convert(polyline);

		// Update the spatail reference if one was provided. Otherwise use default.
		if (wkid) {
			polyline.spatialReference.wkid = 2927;
		}

		// Convert regular JS object into esri/geometry/Geometry.
		polyline = jsonUtils.fromJson(polyline);

		return polyline;
	}

	var map;

	// Create the map.
	map = new Map("map", {
		basemap: "gray",
		center: [-120.80566406246835, 47.41322033015946],
		zoom: 7,
		showAttribution: true
	});

	// Setup state plane projection system for Proj4js.
	Proj4js.defs["EPSG:2927"] = "+proj=lcc +lat_1=47.33333333333334 +lat_2=45.83333333333334 +lat_0=45.33333333333334 +lon_0=-120.5 +x_0=500000.0001016001 +y_0=0 +ellps=GRS80 +to_meter=0.3048006096012192 +no_defs";


	map.on("load", function (/*map*/) {
		var wkt, polyline;

		wkt = 'MULTILINESTRING((1223237.061147753 968557.1533555186,1222895.6525480265 968550.1102739442,1222895.6525480265 968550.1102739442,1222554.8724909977 968542.8796450214,1222545.3402694887 968542.9844187635))';
		polyline = wktToGeometry(wkt);
		console.log(polyline);

	});
});