/*global Terraformer*/
require(["esri/map"], function (Map) {
	"use strict";

	var map, wkt, primitive;

	wkt = 'MULTILINESTRING((1223237.061147753 968557.1533555186,1222895.6525480265 968550.1102739442,1222895.6525480265 968550.1102739442,1222554.8724909977 968542.8796450214,1222545.3402694887 968542.9844187635))';
	primitive = Terraformer.WKT.parse(wkt);
	console.log(primitive);
	console.log(Terraformer.ArcGIS);
	map = new Map("map", {
		basemap: "gray",
		center: [-120.80566406246835, 47.41322033015946],
		zoom: 7,
		showAttribution: true
	});

	map.on("load", function (map) {

	});
});