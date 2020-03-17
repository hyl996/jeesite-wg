var oldRefCode,oldRefName;//存放参照选择之前的值
$(document).ready(function() {
	InitQuery();
	//参照字段选择前过滤
	$(".input-group").on("mousedown",function showDeptTreeRef(){
		var id=$(this).attr("id");
		oldRefName=$(this).context.children[0].value;
		oldRefCode=$(this).context.children[1].value;
		resetDataUrl(id);
	});
	$('#dataGrid').dataGrid('refresh');//业务单据默认不查询
})
//初始化查询条件
function InitQuery(){
	$(".form-group input").val("");
	$("#pkOrgCode").val(getMainOrgCode());
	$("#pkOrgName").val(getMainOrgName());
}
/**查询条件必输项校验**/
function checkQueryNotNull(){
	var num=0;
	var pkOrg=$("#pkOrgCode").val();
	if (pkOrg=="") {
		layer.tips('请输入组织', '#pkOrgDiv',{tips: [2,"#c7360c"],tipsMore: true});
		num++;
	}
	
	var pkPro=$("#pkProjectCode").val();
	if(pkPro==""){
		layer.tips('请输入项目', '#pkProjectDiv',{tips: [2,"#ff0000b5"],tipsMore: true});
		num++;
	}
	
	return num;
}
/***查询***/
function queryData(){
	var num=checkQueryNotNull();
	if(num==0){
		$("#btnSearch").click();
		$('#dataGrid').dataGrid('refresh');
	}
}

/**重置**/
function resetBtn(){
	InitQuery();
}

function resetDataUrl(id){
	//项目根据组织过滤
	if(id==("pkProjectDiv")){
		//获取当前行组织值
		var pkOrg=$('#pkOrgCode').val();
		var newurl='/js/a/zl/zlProject/treeData';
		if(pkOrg==""){
			newurl+="?pkOrg=' '";
		}else{
			newurl+="?pkOrg="+pkOrg;
		}
		$("#"+id).attr("data-url",newurl);
	}
	
	//部门根据组织过滤
	if(id==("pkDeptDiv")){
		//获取当前行组织值
		var pkOrg=$('#pkOrgCode').val();
		var newurl='/js/a/base/bdDept/treeData';
		if(pkOrg==""){
			newurl+="?pkOrg=' '";
		}else{
			newurl+="?pkOrg="+pkOrg;
		}
		$("#"+id).attr("data-url",newurl);
	}
}

/**
 * 选择回调方法
 * @param id  标签的id
 * @param act 动作事件：ok、clear、cancel
 * @param index layer的索引号
 * @param layero layer内容的jQuery对象
 * @param nodes 当前选择的树节点数组
 */
function treeselectCallback(id, act, index, layero, nodes){
	
	if(id=='pkOrg' && (act == 'ok' || act == 'clear')){//项目选择
		if(nodes==null||nodes==undefined){
			$('#pkDeptCode').val(null);
			$('#pkDeptName').val(null);
			$('#pkProjectCode').val(null);
			$('#pkProjectName').val(null);
			return;
		}
		var newpro=$("#pkProjectCode").val();
		if(newpro!=oldRefCode){
			$('#pkDeptCode').val(null);
			$('#pkDeptName').val(null);
			$('#pkProjectCode').val(null);
			$('#pkProjectName').val(null);
		}
	}
}
function listselectCallback(id, act, index, layero,selectData,nodes){

}

/**参照开票申请**/
function refKPSQList(){
	//多窗口模式，层叠置顶
    js.layer.open({//前面要加js.否则参照弹出异常
    	id:'zyref1',
    	type: 2, //此处以iframe举例
    	title: '开票登记参照开票申请',
    	area: ['1100px', $(top.window).height()*3/4 + "px"],
    	shade: 0.2,
    	content: '/js/a/ct/ctInvoiceapply/refKpsqForKpdjList',
    	btn: ['确认', '取消'],
    	yes: function(index, layero){
    		$('#dataGrid').dataGrid('reloadGrid');//刷新当前列表数据区域
    		var data = $(layero).find("iframe").contents().find("#dataGrid");//获取弹出框内dataGrid
    		var selectRows = data.dataGrid('getSelectRows');
    		if(selectRows.length<=0){
    			js.showMessage("请至少选择一条数据！",null,'warning');
    			return;
    		}
    		if(selectRows.length>1){
    			js.showMessage("请选择一条数据！",null,'warning');
    			return;
    		}
    		/*var selectData=[]; 
    		for(var i=0;i<selectRows.length;i++){
    			var status=data.dataGrid('getRowData', selectRows[i]);
    			selectData.push(status);
    		}
    		var pkOrg_arr=selectData[0]["pkOrg.officeCode"];
    		var pkProject_arr=selectData[0]["pkProject.code"];
    		
    		for(var i=1;i<selectData.length;i++){
    			var pkOrg=selectData[i]["pkOrg.officeCode"];
    			var pkProject=selectData[i]["pkProject.code"];
    			if(pkOrg!=pkOrg_arr){
    				js.showMessage('所选单据组织不同，不可制单!','','warning',3000);
					return  ;
    			}
    			if(pkProject!=pkProject_arr){
    				js.showMessage('所选单据项目不同，不可制单!','','warning',3000);
					return  ;
    			}
    		}*/
    		
    		var pks = selectRows.join("-");
    		js.addTabPage($(this), "新增开票登记", "/js/a/ct/ctInvoiceregister/refAddFromKPSQ?pks="+pks, null, null);//弹出新的标签页
    	},
    	btn2: function(index, layero){
    		layer.close(index);
    	},
    	zIndex: layer.zIndex,
    });
}

