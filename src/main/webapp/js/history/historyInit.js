$(function(){
	L.mapbox.accessToken = global.mapAccessToken;
	global.map = L.mapbox.map('historyMap', global.mapBoxId, {
		zoomControl : false
	}).setView([  -25, 140 ], 13);

	L.control.zoomslider().addTo(global.map);
	
	dataUtil.invokeGroupListApi('',function(resData){
		historyCar.terminalGroupInit(resData);
	});
	
	// Create array of lat,lon points.
	var line_points = [
	    [23.13002, 113.41382],
	    [23.13003, 113.41483],
	    [23.13005, 113.41584],
	    [23.13006, 113.41786],
	    [23.14007, 113.41885],
	    [23.16012, 113.42092],
	    [23.13022, 113.43372],
	    [23.13009, 113.45375],
	    [23.17020, 113.46376],
	    [23.19000,113.44979]
	];

	// Define polyline options
	// http://leafletjs.com/reference.html#polyline
	var polyline_options = {
	    color: 'green'
	};

	// Defining a polygon here instead of a polyline will connect the
	// endpoints and fill the path.
	// http://leafletjs.com/reference.html#polygon
	var polyline = L.polyline(line_points, polyline_options).addTo(global.map);
	polyline.on('click',function(e){
		L.popup().setLatLng(e.latlng).setContent(
				"You clicked the map at " + e.latlng.toString())
				.openOn(global.map);
	});
	global.map.fitBounds(polyline.getBounds());
	
	
	var carIcon = L.divIcon({
		html : '<div class="carstar"><p>A</p></div>'
	});
	var markerA = L.marker([23.13002, 113.41382], {
		icon : carIcon,
	});
	var carIcon1 = L.divIcon({
		html : '<div class="carstar"><p>B</p></div>'
	});
	var markerB = L.marker([23.19000,113.44979], {
		icon : carIcon1,
	});
	var markers=[];
	markers.push(markerA);
	markers.push(markerB);
	var markerLayer = L.featureGroup(markers).addTo(global.map);
	global.map.fitBounds(markerLayer.getBounds());
	
});
	