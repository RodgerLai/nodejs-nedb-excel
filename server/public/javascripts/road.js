
/**
 * Created by ASUS on 2017/1/3.
 */
var $table = $("#roadTable"),$remove = $('#remove'),edit_select_dadui= [],
    $new = $("#submit_new"),oTable,$query=$("#query_Btn"),$new_dadui=$("#new_dadui");
$(document).ready(function(){
    oTable = new tableInit(); oTable.Init();//表格初始化
    deletes("/road/delete");//批量删除
    switchNav(".fa-road"); //导航切换样式处理
    initSelect();//初始化select下拉框
    initDate();//日期控件
    initRadio();//radio init
});
function tableInit(){
    this.Init = function () {
        $table.bootstrapTable({
            pagination: true,
            url: "/road/query",
            queryParams: oTable.queryParams,
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    field: 'type',
                    align: 'center',
                    width:'5',
                    formatter: typeFormatter,
                    sortable: true
                }, {
                    title: '道路',
                    field: 'road',
                    align: 'left',
                    formatter: spanFormatter,
                    sortable: true
                }, {
                    title: '路况',
                    field: 'condition',
                    align: 'left',
                    formatter: conditionFormatter,
                    sortable: true
                }, {
                    title: '上报单位',
                    field: 'dadui_name',
                    align: 'left',
                    formatter: daduiFormatter,
                    sortable: true
                }, {
                    title: '上报时间',
                    field: 'uptime',
                    align: 'left',
                    formatter: spanFormatter,
                    sortable: true
                }, {
                    field: 'id',
                    width:'10%',
                    title: '操作',
                    align: 'center',
                   // events: operateEvents,
                    formatter: positionFormatter
                }
            ]
        });
    }
    this.queryParams = function(){
          return {dadui_id:$("#query_dadui").val()=="*"?null:$("#query_dadui").val(),
              road: $("#query_road").val() == "" ? null : $("#query_road").val(),
              daterange:$("#query_daterange").val()==""?null:$("#query_daterange").val()
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
    var road = $("#new_road").val();
    var type = $(".radios  .r_on input").val();
    var condition = $("#new_condition").val();
    var dadui_id = $new_dadui.val()=="*"?"":$new_dadui.val();
    if($.trim(road)=="") {
        $(".remind").text("道路不能为空！");
        $("#new_road").focus();
        return;
    }
    if(condition.length>300){
        $(".remind").text('路况不能超过600个字符!');return;
    }
    $(".remind").text("");

    var roadcondition = {road:road,type:type,condition:condition,dadui_id:dadui_id};
    $.postJSON("/road/add",JSON.stringify(roadcondition),function(result){
                if(result==1){
                    $.gritter.add({
                        title: '提示',
                        text: '上报路况成功!',
                        sticky: false,
                        time: 2500
                    });
                    $("#modal_new").modal('show').modal('hide');
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
            $.postJSON("/road/update", JSON.stringify(row),function(data){//编辑请求  并返回值
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
function conditionFormatter(data) {
    if(data==null||data=="null")data="";
    if(data.length>10)data = data.substr(0,50)+"...";
    return "<span style='cursor:pointer' href='javascript:void(0)' >"+data+"</span>";
}
//位置
function positionFormatter(value, row) {
    return ['<a class="edit btn btn-success btn-xs" href="javascript:void(0)" title="地图上查看">'+
        '<i class="fa fa-map-marker"></i>'+
        '</a>'];
}
//类型
function typeFormatter(value, row) {
    if(value==1){
        return "<span title='正常' style='cursor:pointer' data-value='1'><i class='fa fa-thermometer' style='color:forestgreen'></i></span>";
    }else if(value==2){
        return "<span title='拥堵' style='cursor:pointer' data-value='2'><i class='fa fa-thermometer' style='color:#ff8a1c'></i></span>";
    }else{
        return "<span title='堵塞' style='cursor:pointer' data-value='3'><i class='fa fa-thermometer' style='color:red'></i></span>";
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
function initDate(){
    $('#query_daterange').daterangepicker(
        {
            ranges: {
                '今天': ['today', 'today'],
                '昨天': ['yesterday', 'yesterday'],
                '过去一周': [Date.today().add({ days: -6 }), 'today'],
                '过去一个月': [Date.today().add({ days: -29 }), 'today'],
                '当月': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                '上个月': [Date.today().moveToFirstDayOfMonth().add({ months: -1 }), Date.today().moveToFirstDayOfMonth().add({ days: -1 })]
            },
            singleDatePicker: true,
            timePicker24Hour:true,
            timePickerSeconds:true,
            autoUpdateInput: false,
            opens: 'left',
            format: 'yyyy-MM-dd',
            separator: ' 到 ',
            startDate: Date.today().add({ days: -29 }),
            endDate: Date.today(),
            //  minDate: '01/01/2012',
            maxDate: Date.today(),
            locale: {
                applyLabel: '提交',
                fromLabel: '从',
                toLabel: '到',
                customRangeLabel: '自定义范围',
                daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                firstDay: 1
            },
            showWeekNumbers: true,
            buttonClasses: ['btn-danger']
        },
        function(start, end) {
            $('#daterange span').html(start.toString('MMMM d, yyyy') + ' - ' + end.toString('MMMM d, yyyy'));
        }
    );
}