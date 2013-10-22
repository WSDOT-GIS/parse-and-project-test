/*global require, Terraformer, Proj4js */
require([
	"esri/map",
	"esri/geometry/jsonUtils",
	"esri/graphic",
	"esri/symbols/SimpleLineSymbol",
	"dojo/_base/Color",
	"use!proj4js",
	"clientProjection",
	"use!terraformer",
	"use!terraformer-wkt-parser",
	"use!terraformer-arcgis-parser"
], function (Map, jsonUtils, Graphic, SimpleLineSymbol, Color, Proj4js, clientProjection, Terraformer) {
	"use strict";

	/** Converts wkt into an ArcGIS polyline.
	 * @param {string} wkt The OGC Simple Geometry Well-Known Text.
	 * @param {number} [wkid] The Well-Known ID of the spatial reference. Defaults to 4326.
	 * @returns {esri/geometry/Geometry}
	 */
	function wktToGeometry(wkt, wkid) {
		var polyline;
		// Parse into a terraformer primitive.
		polyline = Terraformer.WKT.parse(wkt);
		// Convert primitive into a polyline object. (Regular JS object)
		polyline = Terraformer.ArcGIS.convert(polyline);

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

	// Setup state plane and WGS84 Web Mercator Aux. Sphere projection systems for Proj4js.
	Proj4js.defs["EPSG:2927"] = "+proj=lcc +lat_1=47.33333333333334 +lat_2=45.83333333333334 +lat_0=45.33333333333334 +lon_0=-120.5 +x_0=500000.0001016001 +y_0=0 +ellps=GRS80 +to_meter=0.3048006096012192 +no_defs";
	Proj4js.defs["EPSG:3857"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
	Proj4js.defs["EPSG:102100"] = Proj4js.defs["EPSG:3857"];


	map.on("load", function (/*map*/) {
		var wkt, polyline, srcPrj, destPrj, symbol, graphic;

		srcPrj = new Proj4js.Proj("EPSG:2927");
		destPrj = new Proj4js.Proj("EPSG:3857");

		wkt = "MULTILINESTRING ((1223237.0611477529 968557.15335551859, 1222895.6525480265 968550.11027394421, 1222895.6525480265 968550.11027394421, 1222554.8724909977 968542.8796450214, 1222545.3402694887 968542.98441876355))"
		polyline = wktToGeometry(wkt);
		console.log(polyline);
		polyline = clientProjection.projectEsriGeometry(polyline, srcPrj, destPrj, jsonUtils.fromJson);
		console.log(polyline);

		symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2);
		graphic = new Graphic(polyline, symbol);

		map.graphics.add(graphic);

		map.setExtent(polyline.getExtent());
	});
});