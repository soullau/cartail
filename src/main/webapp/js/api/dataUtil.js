var dataUtil = (function() {
	/**
	 * response格式
	 * 
	 * {"group":[{"id":"0","groupName":"天河分公司","parentId":"1"},{"id":"1","groupName":"珠海分公司","parentId":"2"}]}
	 */
	var invokeGroupListApi = function(req,callback){
		 $.ajax({
		   type: "POST",
		   url: global.context+"/testdata/groupList.json",
		   data: "",
		   dataType:'json',
		   success: function(resData){
			   if(typeof(resData)==='string'){
				   resData = $.parseJSON(resData);
				}
			   callback(resData);
		   }
		 });
	},
	// 地图上的车辆初始化和右边车辆列表的初始化接口以及刷新的数据
	/**
	 * 得到某个公司或分组的车辆列表
	 * 
	 * request:groupId 某个公司或分组的ID
	 * 
	 * response格式
	 * 
	 * {vehicles:[{id:'1',terminalId:'001',remark:'truck_1',longitude:'113.31572',latitude:'23.13002',status:'driving',direction:'W'},
	 * {id:'2',terminalId:'002',remark:'truck_2',longitude:'113.31572',latitude:'23.13002',status:'speeding',direction:'E'}]}
	 */
	invokeLinkCarListApi = function(groupId,callback) {
		$.ajax({
			type : "POST",
			//url : global.context + "/vehicleInfo/vehicleList",
			url : global.context + "/testdata/vehicleList"+groupId,
			dataType:'json',
			data : "groupId=" + groupId,
			success : function(resData) {
				if(typeof(resData)==='string'){
					   resData = $.parseJSON(resData);
					}
				callback(resData);
			}
		});
	},
	/**
	 * response格式
	 * 
	 * {"vehicleStatus":{"id": "1","carNo":"ABC-01","brand":"Toyota Commuter","remark":"truck_1","status":"stop","date": "Wed,Jul 01@1:08:00 am","location":"33 bala PI,Calamvale,QLD,4116","direction":"W","duration":"20 hrs ago","speed" :"0km/h"}}
	 */
	invokeCarDetailApi = function(carid,callback){
		$.ajax({
			type : "POST",
			//url : global.context + "/vehicleInfo/vehicleStatus",
			url : global.context + "/testdata/carDetail"+carid,
			dataType:'json',
			data : "terminalId=" + carid,
			success : function(resData) {
				if(typeof(resData)==='string'){
					   resData = $.parseJSON(resData);
					}
				callback(resData);
			}
		});
	};
	return {
		invokeGroupListApi : invokeGroupListApi,
		invokeLinkCarListApi : invokeLinkCarListApi,
		invokeCarDetailApi : invokeCarDetailApi
	};
})();
