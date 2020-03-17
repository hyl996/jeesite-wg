var oldRefCode,oldRefName;//存放参照选择之前的值
$(document).ready(function() {
	InitQuery();
	$("#searchForm").attr("action","/js/a/ct/ctRentdkz/listData?busidate="+getBusiDate());
	//参照字段选择前过滤
	$(".input-group").on("mousedown",function showDeptTreeRef(){
		var id=$(this).attr("id");
		oldRefName=$(this).context.children[0].value;
		oldRefCode=$(this).context.children[1].value;
		resetDataUrl(id);
	});
	//$('#dataGrid').dataGrid('refresh');//业务单据默认不查询
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
		$("#searchForm").attr("action","/js/a/ct/ctRentdkz/listData?busidate="+getBusiDate());
		$('#dataGrid').dataGrid('refresh');
	}
}

/**重置**/
function resetBtn(){
	InitQuery();
}

//刷新功能
$('#btnRefresh2').click(function(){
	$("#searchForm").attr("action","/js/a/ct/ctRentdkz/listData?busidate="+getBusiDate());
	$('#dataGrid').dataGrid('refresh');
});

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
	//客户根据项目过滤
	if(id==("pkCustomerDiv")){
		//获取当前行组织值
		var pkOrg=$('#pkProjectCode').val();
		var newurl='/js/a/base/bdCustomer/bdCustomerSelect';
		if(pkOrg==""){
			newurl+="?pk_project=' '";
		}else{
			newurl+="?pk_project="+pkOrg;
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
	//楼栋根据项目过滤
	if(id==("pkBuildingDiv")){
		//获取当前行组织值
		var pkProject=$('#pkProjectCode').val();
		var newurl='/js/a/zl/zlBuildingfile/buildingSelect';
		if(pkProject==""){
			newurl+="?pkProjectid=' '";
		}else{
			newurl+="?pkProjectid="+pkProject;
		}
		$("#"+id).attr("data-url",newurl);
	}
	
	//房产根据楼栋过滤
	if(id==("pkHouseDiv")){
		//获取当前行组织值
		var pkProject=$('#pkBuildingCode').val();
		var newurl='/js/a/zl/zlHousesource/housesourceSelect';
		if(pkProject==""){
			newurl+="?buildname=' '";
		}else{
			newurl+="?buildname="+pkProject;
		}
		$("#"+id).attr("data-url",newurl);
	}
	
}

/**列表参照获取界面选择数据(用作参照前方法，变更参照URL)**/
function listselectGetSelectData(id){
	
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
	
	if(id=='pkOrg' && (act == 'ok' || act == 'clear')){//组织选择
		if(nodes==null||nodes==undefined){
			$('#pkDeptCode').val(null);
			$('#pkDeptName').val(null);
			$('#pkProjectCode').val(null);
			$('#pkProjectName').val(null);
			$('#pkCustomerCode').val(null);
			$('#pkCustomerName').val(null);
			$('#pkHouseCode').val(null);
			$('#pkHouseName').val(null);
			$('#pkBuildingCode').val(null);
			$('#pkBuildingName').val(null);
			return;
		}
		var newpro=$("#pkOrgCode").val();
		if(newpro!=oldRefCode){
			$('#pkDeptCode').val(null);
			$('#pkDeptName').val(null);
			$('#pkProjectCode').val(null);
			$('#pkProjectName').val(null);
			$('#pkCustomerCode').val(null);
			$('#pkCustomerName').val(null);
			$('#pkHouseCode').val(null);
			$('#pkHouseName').val(null);
			$('#pkBuildingCode').val(null);
			$('#pkBuildingName').val(null);
		}
	}
	
	if(id=='pkProject' && (act == 'ok' || act == 'clear')){//项目选择
		if(nodes==null||nodes==undefined){
			$('#pkHouseCode').val(null);
			$('#pkHouseName').val(null);
			$('#pkBuildingCode').val(null);
			$('#pkBuildingName').val(null);
			$('#pkCustomerCode').val(null);
			$('#pkCustomerName').val(null);
			return;
		}
		var newpro=$("#pkProjectCode").val();
		if(newpro!=oldRefCode){
			$('#pkHouseCode').val(null);
			$('#pkHouseName').val(null);
			$('#pkBuildingCode').val(null);
			$('#pkBuildingName').val(null);
			$('#pkCustomerCode').val(null);
			$('#pkCustomerName').val(null);
		}
	}
}
function listselectCallback(id, act, index, layero,selectData,nodes){
	if(id=='pkBuilding' && (act == 'ok' || act == 'clear')){//楼栋选择
		if(selectData==null){
			$('#pkHouseCode').val(null);
			$('#pkHouseName').val(null);
			return;
		}
		var newval=$("#pkBuildingCode").val();
		if(newval!=oldRefCode){
			$('#pkHouseCode').val(null);
			$('#pkHouseName').val(null);
		}
	}
}
/**批量开账**/
function batchOpening(){
	var rowIds = $('#dataGrid').dataGrid('getSelectRows'); // 获取选择行
	if(rowIds==null||rowIds.length==0){
		js.showMessage("请至少选择一条数据！",null,'warning');
		return;
	}
	var queryData={'pks':rowIds,'busidate':getBusiDate()};
	$.ajax({
		//type : "post",
		url: './batchOpening',
		contentType: 'application/json;charset=utf-8',
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		traditional : true,//数组
		datatype: 'json',
		data: queryData,
		async : false,
		success: function (data) {
			var data2=$.parseJSON(data);
			if(data2.result == Global.TRUE){
				js.showMessage(data2.message);
				$('#dataGrid').dataGrid('reloadGrid');
			}else if(data.result == Global.FALSE){
				js.showMessage(data2.message,'','warning',3000);
			}
		},
		error: function (msg){
			console.log($.parseJSON(msg.responseText).message);
		}
	});
}
