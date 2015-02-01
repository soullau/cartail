var car = (function() {
	var color = {
		driving : 0,
		stop : 1,
		engineOff : 2,
		speeding : 3,
		ldlling : 4,
		disconnect : 5
	}, 
	//
	carList = [],
	//
	markers = [], 
	//
	featureLayer = null,
	// car的图标，用html生成
	// {id:'1',terminalId:'001',remark:'truck 1',status:'driving',direction:'W'}
	/**
	 * {id:'1',terminalId:'001',remark:'truck_1',longitude:'113.31572',latitude:'23.13002',status:'driving',direction:'W'}
	 */
	carMarkerFun = function(carObj) {
		var $tp = $('#carIconTemplate');
		$('a', $tp).html(carObj.remark);
		var bgcss = 'url(./images/rectcar' + car.color[carObj.status] + '.png) no-repeat';
		$tp.find('div').attr('id', 'car_' + carObj.id).css('background',bgcss);
		
		var rotate = 0;
		if(carObj.direction=='E'){
			rotate = 0;
		}else if(carObj.direction=='S'){
			rotate = 90;
		}else if(carObj.direction=='W'){
			rotate = 180;
		}else if(carObj.direction=='N'){
			rotate = 270;
		}
		$tp.find('#car_' + carObj.id).find('img').rotate({
			animateTo : rotate
		});
		
		var carIcon = L.divIcon({
			html : $tp.html()
		});
		var marker = L.marker([ parseFloat(carObj.latitude), parseFloat(carObj.longitude) ], {
			icon : carIcon,
		});
		marker.id = carObj.id;// 车辆的ID
		marker.on('click',function(){
			var callback = function(resData){
				marker.unbindPopup().bindPopup(car.carDetail(resData)).openPopup();
			};
			dataUtil.invokeCarDetailApi(marker.id,callback);
		});

		return marker;
	}, 
	/**
	 * 
	 */
	carDetail = function(cardetail) {
		var carObj = cardetail.vehicleStatus;
		var $tp = $('#carDetailTemplate').clone();
		$('.car_info_color', $tp).attr('src',
				'images/carlistpoint' + car.color[carObj.status] + '.gif');
		$('.car_name', $tp).html(carObj.remark);
		$('.car_commuter', $tp).html(carObj.brand);
		$('.car_number', $tp).html(carObj.carNo).css(
				'background',
				'url(./images/rectcar' + car.color[carObj.status]
						+ '.png) no-repeat');
		$('.carrunstate', $tp).html(carObj.duration);
		$('.car_addr', $tp).html(carObj.location);
		$('.car_runtime', $tp).html(carObj.date);
		return $tp.html();
	},
	// 初始化所有车辆
	// carList的格式：[{id,name,status,x,y},{id,name,status,x,y}]
	/**
	 * {vehicles:[{id:'1',terminalId:'001',remark:'truck_1',longitude:'113.31572',latitude:'23.13002',status:'driving',direction:'W'},
	 * {id:'2',terminalId:'002',remark:'truck_2',longitude:'113.31572',latitude:'23.13002',status:'speeding',direction:'E'}]}
	 */
	initCars = function(resData) {
		carList = resData.vehicles;
		car.markers = [];
		if (carList != null && carList.length > 0) {
			for ( var i = 0; i < carList.length; i++) {
				var marker = carMarkerFun(carList[i]);
				car.markers.push(marker);
			}
			car.featureLayer = L.featureGroup(car.markers).addTo(global.map);
			 if($('#auto-fit').is(":checked")){
				 global.map.fitBounds(car.featureLayer.getBounds());
			 }
		}
	}, 
	/**
	 * 刷新车辆状态的方法
	 */
	flushStatus = function(resData) {
	  if (resData != null && resData.vehicles != null) {
		var newCarList = resData.vehicles;
		
		var data = newCarList;
		var markers = car.markers;
		for ( var k = 0; k < markers.length; k++) {
			for ( var j = 0; j < data.length; j++) {
				if (markers[k].id == data[j].id) {
					$('#car_' + markers[k].id).css(
							'background',
							'url(./images/rectcar' + car.color[data[j].status]
									+ '.png) no-repeat');

					var rotate = 0;
					if(data[j].direction=='E'){
						rotate = 0;
					}else if(data[j].direction=='S'){
						rotate = 90;
					}else if(data[j].direction=='W'){
						rotate = 180;
					}else if(data[j].direction=='N'){
						rotate = 270;
					}
					//console.log(rotate);
					$('#car_' + markers[k].id).find('img').rotate({
						animateTo : rotate
					});
					markers[k].setLatLng([ parseFloat(data[j].latitude), parseFloat(data[j].longitude) ]);
				}
			}
		}
		if ($('#auto-fit').is(":checked")) {
			global.map.fitBounds(car.featureLayer.getBounds());// 合适的大小
		}
		}
	},
	/**
	 * {vehicles:[{id:'1',terminalId:'001',remark:'truck_1',longitude:'113.31572',latitude:'23.13002',status:'driving',direction:'W'},
	 * {id:'2',terminalId:'002',remark:'truck_2',longitude:'113.31572',latitude:'23.13002',status:'speeding',direction:'E'}]}
	 */

	carListInit = function(resData) {
		if (resData != null && resData.vehicles != null) {
			var carList = resData.vehicles;
			var result = '';
			for ( var i = 0; i < carList.length; i++) {
				var $tp = $('#carListTemplate').clone();

				var rectgif = 'images/carlistrect' + car.color[carList[i].status]+ '.gif';
				var pointgif = 'images/carlistpoint' + car.color[carList[i].status]+ '.gif';
				
				$('.carList_v1', $tp).attr('src',rectgif);
				$('.carList_v4', $tp).attr('src',pointgif);
				$('.carList_v2', $tp).html(carList[i].remark);
				$('.carList_v2', $tp).attr('dataid', carList[i].id);// 车辆的标识ID
				$('.carList_v3', $tp).html(carList[i].status);
				result += $tp.html();
			}
			//加载列表并绑定点击事件，点击某车辆的时候，地图自动定位到该车辆
			$('#carlist').html(result).undelegate().delegate(
					'.carList_v2',
					'click',
					function() {
						var $this = $(this);
						var dataid = $this.attr('dataid');
						for ( var i = 0; i < car.markers.length; i++) {
							if (car.markers[i].id == dataid) {
								global.map.panTo([
										car.markers[i].getLatLng().lat,
										car.markers[i].getLatLng().lng ]);
							}
						}
					});
		}
	},
	/**
	 * 	右上列表的初始化 开始
	*resData格式：{group:[{id:'11',groupName:'天河分公司',parentId:'1'},{id:'12',groupName:'珠海分公司',parentId:'2'}]}
	 */
	terminalGroupInit=function(resData){
		var options='';//<option>选择</option>
		if(resData!=null && resData.group!=null){
			var groups = resData.group;
			for(var i=0;i<groups.length;i++){
				options+='<option value='+groups[i].id+'>'+groups[i].groupName+'</option>';
			}
		}
		$('#terminal_group').html(options);
		initMySelect();
	},
	initMySelect = function(){
		var aS = document.getElementsByTagName('select');
		for ( var i = 0; i < aS.length; i++) {
			switch (aS[i].getAttribute('mSty')) {
			case 'redLine':
				mySelect.Create(aS[i], 'redLine');
				break;
			case 'blueCircle': 
				mySelect.Create(aS[i], 'blueCircle', true);
				break;
			case 'orangeHeart':
				mySelect.Create(aS[i], 'orangeHeart', true);
				break;
			}
		}
	}
	;
	return {
		color : color,
		markers : markers,
		carDetail : carDetail,
		featureLayer : featureLayer,
		initCars : initCars,
		flushStatus : flushStatus,
		carListInit : carListInit,
		terminalGroupInit : terminalGroupInit
	};
})();