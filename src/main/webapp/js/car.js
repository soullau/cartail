var car = (function() {
	var color = {
		driving : 0,
		stop : 1,
		engineOff : 2,
		speeding : 3,
		ldlling : 4,
		disconnect : 5
	},
	carList = [];
	auto_fit = false,
	markers = [],
	featureLayer=null, 
	// car的图标，用html生成
	//{id:'1',terminalId:'001',remark:'truck 1',status:'driving',direction:'W'}
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
		
		marker.bindPopup(car.carDetail(carObj));//@TODO:要改
		
		return marker;
	},
	carDetail = function(carObj){
		var $tp = $('#carDetailTemplate').clone();
		$('.car_info_color', $tp).attr('src','images/carlistpoint'+car.color[carObj.status]+'.gif');
		$('.car_name', $tp).html(carObj.name);
		$('.car_commuter', $tp).html(carObj.name);
		$('.car_number', $tp).html(carObj.name).css('background','url(./images/rectcar' + car.color[carObj.status] + '.png) no-repeat');;
		$('.carrunstate', $tp).html(carObj.name);
		$('.car_addr', $tp).html(carObj.name);
		$('.car_runtime', $tp).html(carObj.name);
		return $tp.html();
	},
	// 初始化所有车辆
	//{vehicles:[{id:'1',terminalId:'001',remark:'truck 1',status:'driving',direction:'W'},{id:'2',terminalId:'002',remark:'truck 2',status:'Speeding',direction:'E'}]};
	// carList的格式：[{id,name,status,x,y},{id,name,status,x,y}]
	initCars = function(resData) {
		carList = resData;//.vehicles;
		car.markers=[];
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
		var data=carList;
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
	},
	//resData的格式:{vehicles:[{id:'1',terminalId:'001',remark:'truck 1',status:'driving',direction:'W'},{id:'2',terminalId:'002',remark:'truck 2',status:'Speeding',direction:'E'}]}
	carListInit = function(resData){
		if(resData!=null && resData.vehicles!=null){
			var carList = resData.vehicles;
			var result='';
			for(var i = 0; i < carList.length; i++){
				var $tp = $('#carListTemplate').clone();
				$('ul',$tp).attr('dataid',carList[i].terminalId);//车辆的标识ID
				
				$('.carList_v1', $tp).attr('src','images/carlistrect'+car.color[carList[i].status]+'.gif');
				$('.carList_v4', $tp).attr('src','images/carlistpoint'+car.color[carList[i].status]+'.gif');
				$('.carList_v2', $tp).html(carList[i].remark);
				$('.carList_v2', $tp).attr('dataid',carList[i].terminalId);//车辆的标识ID
				$('.carList_v3', $tp).html(carList[i].status);
				result += $tp.html();
			}
			$('#carlist').html(result).undelegate().delegate('.carList_v2','click',function(){
				var $this = $(this);
				var dataid = $this.attr('dataid');
				for(var i = 0 ; i < car.markers.length; i++){
					if(car.markers[i].id==dataid){
						map.panTo([ car.markers[i].getLatLng().lat, car.markers[i].getLatLng().lng ]);
					}
				}
			});
		}
	};;
	return {
		color : color,
		auto_fit:auto_fit,
		markers:markers,
		carDetail:carDetail,
		featureLayer:featureLayer,
		initCars : initCars,
		flushStatus:flushStatus,
		carListInit:carListInit
	};
})();