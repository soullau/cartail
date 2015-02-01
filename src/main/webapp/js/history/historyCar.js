var historyCar = (function() {
	var /**
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
		terminalGroupInit : terminalGroupInit
	};
})();