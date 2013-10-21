require(["terraformer", "terraformer-wkt-parser", "esri/map"], function (Terraformer, TerraformerWKT, Map) {
	"use strict";

	var map;

	map = new Map("map", {
		basemap: "gray",
		center: [-120.80566406246835, 47.41322033015946],
		zoom: 7,
		showAttribution: true
	});
});