
/**
 * Created by ASUS on 2017/1/3.
 */
var $table = $("#policeTable"),$remove = $('#remove'),edit_select_dadui= [],edit_select_zhongdui= [],
    edit_select_post= [],$new = $("#submit_new"),oTable,$query=$("#query_Btn"),
    $query_zhongdui = $("#query_zhongdui"),$query_dadui = $("#query_dadui"),
    $new_zhongdui = $("#new_zhongdui"),$new_dadui = $("#new_dadui"),
    $query_post = $("#query_post"),$new_post = $("#new_post");
$(document).ready(function(){
    oTable = new tableInit(); oTable.Init();//表格初始化
    deletes("/police/delete");//批量删除
    switchNav(".fa-cogs"); //导航切换样式处理
    initSelect();//初始化select下拉框
    initRadio();//男女radio list 初始化

});
function tableInit(){
    this.Init = function () {
        $table.bootstrapTable({
            pagination: true,
            url: "/police/query",
            queryParams: oTable.queryParams,
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '名字',
                    field: 'name',
                    align: 'left',
                    formatter: nullFormatter,
                    sortable: true
                }, {
                    title: '性别',
                    field: 'gender',
                    align: 'center',
                    formatter: genderFormatter,
                    sortable: true
                }, {
                    title: '警号',
                    field: 'policenumber',
                    align: 'left',
                    formatter: nullFormatter,
                    sortable: true
                }, {
                    title: '手台号',
                    field: 'tetra_id',
                    align: 'left',
                    formatter: nullFormatter,
                    sortable: true
                }, {
                    title: '位置',
                    align: 'center',
                    formatter: positionFormatter,
                    sortable: true
                }, {
                    title: '所属大队',
                    field: 'dadui_name',
                    align: 'left',
                    formatter: daduiFormatter,
                    sortable: true
                }, {
                    title: '所属中队',
                    field: 'zhongdui_name',
                    align: 'left',
                    formatter: zhongduiFormatter,
                    sortable: true
                }, {
                    title: '岗位',
                    field: 'post_name',
                    align: 'left',
                    formatter: postFormatter,
                    sortable: true
                }, {
                    title: '描述',
                    field: 'remark',
                    align: 'left',
                    formatter: nullFormatter,
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
          return {
              dadui_id:$query_dadui.val()=="*"?null:$query_dadui.val(),
              zhongdui_id:$query_zhongdui.val()=="*"?null:$query_zhongdui.val(),
              post_id:$query_post.val()=="*"?null:$query_post.val(),
              name: $("#query_name").val() == "" ? null : $("#query_name").val(),
              policenumber: $("#query_policenumber").val() == "" ? null : $("#query_policenumber").val(),
          }
    }
}

//查询
$query.click(function(){
    $table.bootstrapTable('destroy');//表格销毁
    oTable.Init()
});
//新建
$new.click(function(){
    var name = $("#new_name").val();
    var gender = $(".radios  .r_on input").val();
    var policenumber = $("#new_policenumber").val();
    var tetra_id = $("#new_tetra_id").val();
    var remark = $("#new_remark").val();
    var dadui_id = $new_dadui.val()=="*"?"":$new_dadui.val();
    var zhongdui_id = $new_zhongdui.val()=="*"?"":$new_zhongdui.val();
    var post_id = $new_post.val()=="*"?"":$new_post.val();
    if($.trim(policenumber)=="") {
        $(".remind").text("警号不能为空！");
        $("#new_policenumber").focus();
        return;
    }
    if(name.length>30){
        $(".remind").text('名字不能超过60个字符!');return;
    }
    if(policenumber.length>30){
        $(".remind").text('警号不能超过60个字符!');return;
    }
    if(tetra_id.length>30){
        $(".remind").text('手台号不能超过60个字符!');return;
    }
    $(".remind").text("");
    var police = {name:name,gender:gender,policenumber:policenumber,tetra_id:tetra_id,
        dadui_id:dadui_id,zhongdui_id:zhongdui_id,post_id:post_id,lon:0,lat:0,remark:remark};
    $.postJSON("/police/add",JSON.stringify(police),function(result){
                if(result==1){
                    $.gritter.add({
                        title: '提示',
                        text: '新建警员成功!',
                        sticky: false,
                        time: 2500
                    });

                    $("#modal_new").modal('show').modal('hide');
                    $table.bootstrapTable('destroy');//表格销毁
                    oTable.Init();
                }else if(result==-1){
                    $(".remind").text('该警号已存在!');return;
                }
                else{
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
        var $gender = $row.find("td:nth-child(3) span");
        var $policenumber = $row.find("td:nth-child(4) span");
        var $tetra_id = $row.find("td:nth-child(5) span");
        var $remark = $row.find("td:nth-child(10) span");
        var $dadui= $row.find("td:nth-child(7) span");
        var $zhongdui= $row.find("td:nth-child(8) span");
        var $post= $row.find("td:nth-child(9) span");
        $table.bootstrapTable('resetView');
        if($edit.hasClass("editting")){//编辑完成
            myedit.endEdit($row,$edit);

            row.gender = $gender.attr("data-value");
            row.dadui_id = $dadui.attr("data-value");
            if(row.dadui_id=="*"||row.dadui_id=="null")row.dadui_id="";

            row.zhongdui_id = $zhongdui.attr("data-value");
            if(row.zhongdui_id=="*"||row.zhongdui_id=="null")row.zhongdui_id="";

            row.post_id = $post.attr("data-value");
            if(row.post_id=="*"||row.post_id=="null")row.post_id="";
            $.postJSON("/police/update", JSON.stringify(row),function(data){//编辑请求  并返回值
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
                title: '名字',
                value:row.name,
                validate: function(value) {
                    if(/(^\s+)|(\s+$)/g.test(value)){
                        return '名字不能输入空格!';
                    }
                    if(value.length>30){
                        return '名字不能超过60个字符!';
                    }
                    row.name = value;
                }
            });
            $gender.editable({//性别
                title: '性别',
                type: 'select',
                placement: 'right',
                source: [{value: '1',text:"男"},{value: '2',text:"女"},{value: '0',text:"保密"}],
                validate: function (value) { //赋值
                    $gender.attr("data-value",value);
                }
            });
            $policenumber.editable({//警号
                title: '警号',
                value:row.policenumber,
                validate: function(value) {
                    if(/(^\s+)|(\s+$)/g.test(value)){
                        return '警号不能输入空格!';
                    }
                    if(value.length>30){
                        return '警号不能超过60个字符!';
                    }
                     if($.trim(value) == '') return '警号不能为空！';
                    row.policenumber = value;
                }
            });
            $tetra_id.editable({//手台号
                title: '手台号',
                value:row.tetra_id,
                validate: function(value) {
                    if(/(^\s+)|(\s+$)/g.test(value)){
                        return '手台号不能输入空格!';
                    }
                    if(value.length>30){
                        return '手台号不能超过60个字符!';
                    }
                    row.tetra_id=value;
                }
            });
            $remark.editable({//描述
                title: '描述',
                type:'textarea',
                value:row.remark,
                validate:function(value){
                    row.remark = value;
                }
            });
            $dadui.editable({//大队
                type:'select',
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
                    edit_select_zhongdui = [];
                    edit_select_post = [];
                    if(value == "*")return;
                    $.getJSON("/zhongdui/query", {dadui_id:value}, function (data) {
                        for (var i = 0; i < data.length; i++) {
                            edit_select_zhongdui.push({value:data[i].id,text:data[i].name});
                        }
                    });
                }
            });
            //联动bug
            //
            //todu
            $zhongdui.editable({//中队
                type:'select',
                title: '所属中队',
                emptytext: '未选',
                showbuttons: true,
                placement: 'top',
                source: function(){return [{value:"*",text:"请先选择大队"}].concat(edit_select_zhongdui)},
                select2: {
                    width: '230px',
                },
                validate: function (value) { //字段验证
                    $zhongdui.attr("data-value",value);
                    edit_select_post = [];
                    if(value == "*")return;
                    $.getJSON("/post/query", {zhongdui_id:value}, function (data) {
                        for (var i = 0; i < data.length; i++) {
                            edit_select_post.push({value:data[i].id,text:data[i].name});
                        }
                        console.log(edit_select_post);
                    });

                }
            });

            $post.editable({//岗位
                type:'select',
                title: '所属岗位',
                emptytext: '未选',
                showbuttons: true,
                placement: 'top',
                source: function(){return [{value:"*",text:"请先选择中队"}].concat(edit_select_post)},
                select2: {
                    width: '230px',
                },
                validate: function (value) { //字段验证
                    $post.attr("data-value",value);
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
function zhongduiFormatter(value, row) {
    if(value==null) {
        return "<span style='cursor:pointer' data-value='" + row.zhongdui_id+ "'></span>";
    }else{
        return "<span style='cursor:pointer' data-value='" + row.zhongdui_id + "'>" + value + "</span>";

    }
}
function postFormatter(value, row) {
    if(value==null) {
        return "<span style='cursor:pointer' data-value='" + row.post_id + "'></span>";
    }else{
        return "<span style='cursor:pointer' data-value='" + row.post_id + "'>" + value + "</span>";

    }
}
//位置
function positionFormatter(value, row) {
    if(row.lat==null||row.lon==null||row.lat==0||row.lon==0) {
        return "<span title='未定位' style='cursor:pointer' ><i class='fa fa-map-marker' style='color:grey'></i></span>";
    }else{
        /*return "<span style='cursor:pointer'>" + row.lon+","+row.lat+ "</span>";*/
        return "<span title='"+row.lon+","+row.lat+ "' style='cursor:pointer' ><i class='fa fa-map-marker' style='color:red'></i></span>";

    }
}
//性别
function genderFormatter(value, row) {
     if(value==1){
        return "<span title='男' style='cursor:pointer' data-value='1'><i class='fa fa-mars' style='color:lightseagreen'></i></span>";
    }else if(value==2){
        return "<span title='女' style='cursor:pointer' data-value='2'><i class='fa fa-venus' style='color:pink'></i></span>";
    }else{
        return "<span title='保密' style='cursor:pointer' data-value='0'><i class='fa fa-user-secret'></i></span>";
    }
}
function initSelect() {
    $.when( $.getJSON("/dadui/queryAll", '', function (data) {
        for (var i = 0; i < data.length; i++) {
            edit_select_dadui.push({value:data[i].id,text:data[i].name});
            $query_dadui.append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
            $("#new_dadui").append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        }
        $query_dadui.select2();
        $new_dadui.select2({width:"200px"});
        $query_zhongdui.select2();
        $new_zhongdui.select2({width:"200px"});
        $query_post.select2();
        $new_post.select2({width:"200px"});
    }));
}
//下拉框联动
$query_dadui.change(function(){
    var dadui_id = $(this).val();
    $query_zhongdui.html("");
    $query_post.html("");
    $query_zhongdui.append('<option value="*">请先选择大队</option>');
    $query_post.append('<option value="*">请先选择中队</option>');
    if(dadui_id == "*")return;
    $.getJSON("/zhongdui/query", {dadui_id:dadui_id}, function (data) {
        for (var i = 0; i < data.length; i++) {
            $query_zhongdui.append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        }
    });
});
$query_zhongdui.change(function(){
    var zhongdui_id = $(this).val();
    $query_post.html("");
    $query_post.append('<option value="*">请先选择中队</option>');
    if(zhongdui_id == "*")return;
    $.getJSON("/post/query",{zhongdui_id:zhongdui_id}, function (data) {
        for (var i = 0; i < data.length; i++) {
            $query_post.append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        }
    });
});
$new_dadui.change(function(){
    var dadui_id = $(this).val();
    $new_zhongdui.html("");
    $new_post.html("");
    $new_zhongdui.append('<option value="*">请先选择大队</option>');
    $new_post.append('<option value="*">请先选择中队</option>');
    if(dadui_id == "*")return;
    $.getJSON("/zhongdui/query", {dadui_id:dadui_id}, function (data) {
        for (var i = 0; i < data.length; i++) {
            $new_zhongdui.append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        }
    });
});
$new_zhongdui.change(function(){
    var zhongdui_id = $(this).val();
    $new_post.html("");
    $new_post.append('<option value="*">请先选择中队</option>');
    if(zhongdui_id == "*")return;
    $.getJSON("/post/query",{zhongdui_id:zhongdui_id}, function (data) {
        for (var i = 0; i < data.length; i++) {
            $new_post.append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
        }
    });
});

