// 基于准备好的dom，初始化echarts图表
			
$(function(){
	
var myChart = echarts.init(document.getElementById('chart'));
			var option = {
				title : {
					text : 'Vehichle speed',
					textStyle:{
						fontSize: 10,
						fontWeight: 'bolder',
						color: '#000'
						}
				},
				calculable : false,
				grid : {x:30,y:20,x2:0,y2:3},
				xAxis : [ {
					type : 'category',
					boundaryGap : false,
					data : [ '00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00',
							'8:00', '9:00', '10:00', '11:00','12:00','13:00','14:00','15:00',
							'16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				series : [ {
					name : '速度',
					type : 'line',
					smooth : true,
					itemStyle : {
						normal : {
							areaStyle : {
								type : 'default'
							}
						}
					},
					data : [ 10, 12, 21, 54, 20, 83, 10, 12, 21, 54, 20, 83, 10,10, 12, 21, 54, 20, 83, 10, 12, 21, 54, 20, 83 ]
				} ]
			};

			// 为echarts对象加载数据 
			myChart.setOption(option);
			
			var ecConfig = echarts.config;
			function eConsole(param) {
			    var mes = '【' + param.type + '】';
			    if (typeof param.seriesIndex != 'undefined') {
			        mes += '  seriesIndex : ' + param.seriesIndex;
			        mes += '  dataIndex : ' + param.dataIndex;
			    }
			    if (param.type == 'hover') {
			    	console.log('获得车辆坐标！');
			        //document.getElementById('hover-console').innerHTML = 'Event Console : ' + mes;
			    }
			    else {
			        //document.getElementById('console').innerHTML = mes;
			    }
			    console.log(param);
			}
			myChart.on(ecConfig.EVENT.HOVER, eConsole);
});