var car = (function() {
	var color = {
		driving : 0,
		stop : 1,
		engineOff : 2,
		speeding : 3,
		ldlling : 4,
		disconnect : 5
	},
	auto_fit = false,
	markers = [],
	featureLayer=null, 
	// car的图标，用html生成
	carMarkerFun = function(carObj) {
		var $tp = $('#carIconTemplate');
		$('a', $tp).html(carObj.name);
		$tp.find('div').attr('id','car_'+carObj.id)
			.css('background','url(./images/rectcar' + car.color[carObj.status] + '.png) no-repeat');
		//$tp.find('img').rotate(360 * Math.random());
		var carIcon = L.divIcon({
			html : $tp.html()
		});
		var marker = L.marker([ carObj.lat, carObj.lng ], {
			icon : carIcon,
		});
		marker.id=carObj.id;//车辆的ID
		
		marker.bindPopup(car.carDetail(carObj))/*.on('click',function(){
			
		})*/;//..addTo(map);
		
		return marker;
	},
	carDetail = function(carObj){
		var $tp = $('#carDetailTemplate').clone();
		$('.car_name', $tp).html(carObj.name);
		$('.car_commuter', $tp).html(carObj.name);
		$('.car_number', $tp).html(carObj.name).css('background','url(./images/rectcar' + car.color[carObj.status] + '.png) no-repeat');;
		$('.carrunstate', $tp).html(carObj.name);
		$('.car_addr', $tp).html(carObj.name);
		$('.car_runtime', $tp).html(carObj.name);
		return $tp.html();
	},
	// 初始化所有车辆
	// carList的格式：[{id,name,status,x,y},{id,name,status,x,y}]
	initCars = function(carList) {
		if (carList != null && carList.length > 0) {
			for ( var i = 0; i < carList.length; i++) {
				var marker = carMarkerFun(carList[i]);
				car.markers.push(marker);
			}
			car.featureLayer = L.featureGroup(car.markers).addTo(map);
			//if(car.auto_fit){
				map.fitBounds(car.featureLayer.getBounds());
			//}
		}
	},
	flushStatus = function(){
		var data=carlist0;
		var markers = car.markers;
		for ( var k = 0; k < markers.length; k++) {
			for ( var j = 0; j < data.length; j++) {
				if(markers[k].id==data[j].id){
					$('#car_'+markers[k].id).css('background','url(./images/rectcar' + car.color[data[j].status] + '.png) no-repeat');
					var lat_o = markers[k].getLatLng().lat;
					var lng_o = markers[k].getLatLng().lng;
					
					
					var lat_n = data[j].lat;//+0.0001;data[j].lat=lat_n;
					var lng_n = data[j].lng+0.0001;data[j].lng=lng_n;
					
					var rotate = Math.atan2(lat_n-lat_o,lng_n-lng_o)/Math.PI*180;
					if(rotate <= 0){
						rotate=Math.abs(rotate);
					}else{
						rotate = 360-rotate;
					}
					$('#car_'+markers[k].id).find('img').rotate({animateTo:rotate});
					markers[k].setLatLng([lat_n,lng_n]);
				}
			}
		}
		if(car.auto_fit){
		 map.fitBounds(car.featureLayer.getBounds());//合适的大小
		}
	}
	;
	return {
		color : color,
		auto_fit:auto_fit,
		markers:markers,
		carDetail:carDetail,
		featureLayer:featureLayer,
		initCars : initCars,
		flushStatus:flushStatus
	};
})();