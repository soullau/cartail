$(function() {
	L.mapbox.accessToken = global.mapAccessToken;
	global.map = L.mapbox.map('map', global.mapBoxId, {
		zoomControl : false
	}).setView([ -23, 113 ], 6);

	L.control.zoomslider().addTo(global.map);

	dataUtil.invokeGroupListApi('',function(resData){
		car.terminalGroupInit(resData);
	     dataUtil.invokeLinkCarListApi(resData.group[0].id,function(resData){
				car.carListInit(resData);//初始化右边列表
				car.initCars(resData);// 初始化markers
		  });
	});
	window.setInterval(function() {
		dataUtil.invokeLinkCarListApi($('#terminal_group').val(), function(
				resData) {
			car.flushStatus(resData);
		});
	}, global.flashFreq);// 刷新markers

});
