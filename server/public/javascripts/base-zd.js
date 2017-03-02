
/**
 * Created by ASUS on 2017/1/3.
 */
var $table = $("#zhongduiTable"),$remove = $('#remove'),edit_select_dadui= [],
    $new = $("#submit_newDadui"),oTable,$query=$("#query_Btn");
$(document).ready(function(){
    oTable = new tableInit(); oTable.Init();//表格初始化
    deletes("/zhongdui/delete");//批量删除
    switchNav(".fa-cogs"); //导航切换样式处理
    initSelect();//初始化select下拉框
});
function tableInit(){
    this.Init = function () {
        $table.bootstrapTable({
            pagination: true,
            url: "/zhongdui/query",
            queryParams: oTable.queryParams,
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '中队名称',
                    field: 'name',
                    align: 'left',
                    formatter: spanFormatter,
                    sortable: true
                }, {
                    title: '责任区域',
                    field: 'responsiblearea',
                    align: 'left',
                    formatter: spanFormatter,
                    sortable: true
                }, {
                    title: '所属大队',
                    field: 'dadui_name',
                    align: 'left',
                    formatter: daduiFormatter,
                    sortable: true
                }, {
                    field: 'id',
                    width:'10%',
                    title: '操作',
                    align: 'left',
                    events: operateEvents,
                    formatter: operateFormatter
                }
            ]
        });
    }
    this.queryParams = function(){
          return {dadui_id:$("#query_dadui").val()=="*"?null:$("#query_dadui").val(),
              name: $("#query_name").val() == "" ? null : $("#query_name").val(),
              responsiblearea:$("#query_responsiblearea").val()==""?null:$("#query_responsiblearea").val()
          }
    }
}
//查询
$query.click(function(){
    $table.bootstrapTable('destroy');//表格销毁
    oTable.Init()
});
//新建中队
$new.click(function(){
    if($.trim($("#new_name").val())==""){
        $(".remind").text("中队名称不能为空！");
        $("#new_name").focus();
        return;
    }else{
        $(".remind").text("");
    }
    var zhongdui = {name:$("#new_name").val(),responsiblearea:$("#new_responsiblearea").val(),
        dadui_id:$("#new_dadui").val()=="*"?"":$("#new_dadui").val()};
    $.postJSON("/zhongdui/add",JSON.stringify(zhongdui),function(result){
                if(result==1){
                    $.gritter.add({
                        title: '提示',
                        text: '新建中队成功!',
                        sticky: false,
                        time: 2500
                    });
                    $("#modal_new").modal('show').modal('hide');
                   // $table.bootstrapTable('resetView');//表格销毁
                    $table.bootstrapTable('destroy');//表格销毁
                    oTable.Init();
                }else{
                    alert("服务器异常，请联系技术人员！");
                }
    });
});

//操作
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        var $edit = $(this); var $row =myedit.getRow($table,index,true);
        //各字段的编辑
        var $name = $row.find("td:nth-child(2) span");
        var $responsiblearea = $row.find("td:nth-child(3) span");
        var $dadui= $row.find("td:nth-child(4) span");
        $table.bootstrapTable('resetView');
        if($edit.hasClass("editting")){//编辑完成
            myedit.endEdit($row,$edit);

            row.dadui_id = $dadui.attr("data-value");
            if(row.dadui_id=="*"||row.dadui_id=="null")row.dadui_id="";
            $.postJSON("/zhongdui/update", JSON.stringify(row),function(data){//编辑请求  并返回值
                if(data==1) {
                    $.gritter.add({
                        title: '提示',
                        text: '编辑信息成功!',
                        sticky: false,
                        time: 2000,
                    });
                }else{
                    alert("编辑失败，请联系技术人员！");
                }
            });
        }else{//开始编辑
            myedit.startEdit($row,$edit);
            //变成可编辑状态
            $name.editable({//中队名
                title: '中队名称',
                value:row.name,
                validate: function(value) {
                    if(/(^\s+)|(\s+$)/g.test(value)){
                        return '中队名不能输入空格!';
                    }
                    if(value.length>25){
                        return '中队名不能超过50个字符!';
                    }
                    if($.trim(value) == '') return '中队名不能为空！';
                    row.name = value;
                }
            });
            $responsiblearea.editable({//责任区域
                title: '责任区域',
                type:'textarea',
                value:row.responsiblearea,
                validate: function(value) {
                    if(value.length>100){
                        return '责任区域名不能超过200个字符!';
                    }
                    row.responsiblearea = value;
                }
            });
            $dadui.editable({//大队
                type:'select2',
                title: '所属大队',
                emptytext: '未选',
                showbuttons: true,
                placement: 'top',
                source: [{value:"*",text:"不属于任何大队"}].concat(edit_select_dadui),
                select2: {
                    width: '230px',
                },
                validate: function (value) { //字段验证
                    $dadui.attr("data-value",value);
                }
            });
        }
    },
    'click .cancel': function (e, value, row, index) {//取消编辑
        var $row =myedit.getRow($table,index,true);
        myedit.cancelEdit($row,$(this));
    }
};



//大队数据引入
function daduiFormatter(value, row) {
    if(value==null) {
        return "<span style='cursor:pointer' data-value='" + row.dadui_id + "'></span>";
    }else{
        return "<span style='cursor:pointer' data-value='" + row.dadui_id + "'>" + value + "</span>";

    }
}

function initSelect() {
    $.getJSON("/dadui/queryAll", '', function (data) {
        for (var i = 0; i < data.length; i++) {
            edit_select_dadui.push({value:data[i].id,text:data[i].name});
            $("#query_dadui").append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
            $("#new_dadui").append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        }
        $("#query_dadui").select2();
        $("#new_dadui").select2({width:"300px"});
    });
}
