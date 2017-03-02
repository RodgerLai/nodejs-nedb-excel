
/**
 * Created by ASUS on 2017/1/3.
 */
var $table = $("#daduiTable"),$remove = $('#remove'),$new = $("#submit_newDadui"),oTable;
$(document).ready(function(){
    oTable = new tableInit(); oTable.Init();//表格初始化
    deletes("/dadui/delete");//批量删除
    switchNav(".fa-cogs"); //导航切换样式处理
});


function tableInit(){
    this.Init = function () {
        $table.bootstrapTable({
            pagination: false,
            url: "/dadui/queryAll",
            queryParams: oTable.queryParams,
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '大队名称',
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
    this.queryParams ={}
}

//新建大队
$new.click(function(){
    if($.trim($("#new_name").val())==""){
        $(".remind").text("大队名称不能为空！");
        $("#new_name").focus();
        return;
    }else{
        $(".remind").text("");
    }
    var dadui = {name:$("#new_name").val(),responsiblearea:$("#new_responsiblearea").val()};
    $.postJSON("/dadui/add",JSON.stringify(dadui),function(result){
                if(result==1){
                    $.gritter.add({
                        title: '提示',
                        text: '新建大队成功!',
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
        var $edit = $(this); var $row =myedit.getRow($table,index,false);
        //各字段的编辑
        var $name = $row.find("td:nth-child(2) span");
        var $responsiblearea = $row.find("td:nth-child(3) span");
        $table.bootstrapTable('resetView');
        if($edit.hasClass("editting")){//编辑完成
            myedit.endEdit($row,$edit)

            $.postJSON("/dadui/update", JSON.stringify(row),function(data){//编辑请求  并返回值
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
            $name.editable({//大队名
                title:"大队名",
                value:row.name,
                validate: function(value) {
                    if(/(^\s+)|(\s+$)/g.test(value)){
                        return '大队名不能输入空格!';
                    }
                    if(value.length>25){
                        return '大队名不能超过50个字符!';
                    }
                    if($.trim(value) == '') return '大队名不能为空！';
                    row.name = value;
                }
            });
            $responsiblearea.editable({//责任区域
                title:"责任区域",
                type:'textarea',
                value:row.responsiblearea,
                validate: function(value) {
                    if(value.length>100){
                        return '责任区域不能超过200个字符!';
                    }
                    row.responsiblearea = value;
                }
            });
        }
    },
    'click .cancel': function (e, value, row, index) {//取消编辑
        var $row =myedit.getRow($table,index,false);
        myedit.cancelEdit($row,$(this));
    }
};


