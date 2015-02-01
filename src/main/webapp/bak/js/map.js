var map;
$(function(){
	L.mapbox.accessToken = 'pk.eyJ1Ijoic291bDAzMjgiLCJhIjoiTmp5LXB5YyJ9.tFLqmZTQG5xn_XKAZdYy5Q';
	map = L.mapbox.map('map', 'beiowolf.map-niz3drxf', {
		zoomControl : false
	}).setView([ -25, 140 ], 8);

/*	L.control.layers({
	    'Base Map': L.mapbox.tileLayer('beiowolf.map-niz3drxf'),//.addTo(map)
	    'Grey Map': L.mapbox.tileLayer('beiowolf.map-niz3drxf')
	}, {
	    'Bike Stations': L.mapbox.tileLayer('examples.bike-locations'),
	    'Bike Lanes': L.mapbox.tileLayer('examples.bike-lanes')
	}).addTo(map);*/
	
	L.control.zoomslider().addTo(map);
});
	