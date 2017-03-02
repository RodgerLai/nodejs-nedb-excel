var Script = function () {

//    sidebar dropdown menu

    jQuery('#sidebar .sub-menu > a').click(function () {
        var last = jQuery('.sub-menu.open', $('#sidebar'));
        last.removeClass("open");
        jQuery('.arrow', last).removeClass("open");
        jQuery('.sub', last).slideUp(200);
        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(200);
        } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(200);
        }
        var o = ($(this).offset());
        diff = 200 - o.top;
        if(diff>0)
            $("#sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            $("#sidebar").scrollTo("+="+Math.abs(diff),500);
    });

//    sidebar toggle


    $(function() {
        function responsiveView() {
            var wSize = $(window).width();
            if (wSize <= 768) {
                $('#container').addClass('sidebar-close');
                $('#sidebar > ul').hide();
            }

            if (wSize > 768) {
                $('#container').removeClass('sidebar-close');
                //$('#sidebar > ul').show();
                $('#sidebar > ul').hide();
            }
        }
        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
    });

    $('.icon-reorder').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-180px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '180px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    });

// custom scrollbar
    $("#dadui_duty_table").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', cursorborder: '', zindex: '1000'});

    $("html").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', cursorborder: '', zindex: '500'});

// widget tools

    jQuery('.widget .tools .icon-chevron-down').click(function () {
        var el = jQuery(this).parents(".widget").children(".widget-body");
        if (jQuery(this).hasClass("icon-chevron-down")) {
            jQuery(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
            el.slideUp(200);
        } else {
            jQuery(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
            el.slideDown(200);
        }
    });

    jQuery('.widget .tools .icon-remove').click(function () {
        jQuery(this).parents(".widget").parent().remove();
    });

//    tool tips

    $('.tooltips').tooltip();

//    popovers

    $('.popovers').popover();



// custom bar chart

    if ($(".custom-bar-chart")) {
        $(".bar").each(function () {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2000)
        })
    }


//custom select box

//    $(function(){
//
//        $('select.styled').customSelect();
//
//    });
}();

$(document).ready(function(){

});


/**
 * 获取数据ajax-get请求
 * @author laixm
 */
$.getJSON = function (url,data,callback){
    $.ajax({
        url:url,
        type:"get",
        contentType:"application/json",
        dataType:"json",
        timeout:10000,
        data:data,
        success:function(data){
            callback(data);
        },
        error:function(xhr,textstatus,thrown){
            alert("请求失败");
        }
    });
};

/**
 * 提交json数据的post请求
 * @author laixm
 */
$.postJSON = function(url,data,callback){
    $.ajax({
        url:url,
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:data,
        timeout:60000,
        success:function(msg){
            callback(msg);
        },
        error:function(xhr,textstatus,thrown){
            alert("请求失败");
        }
    });
};

/**
 * 修改数据的ajax-put请求
 * @author laixm
 */
$.putJSON = function(url,data,callback){
    $.ajax({
        url:url,
        type:"put",
        contentType:"application/json",
        dataType:"json",
        data:data,
        timeout:20000,
        success:function(msg){
            callback(msg);
        },
        error:function(xhr,textstatus,thrown){
            alert("请求失败");
        }
    });
};
/**
 * 删除数据的ajax-delete请求
 * @author laixm
 */
$.deleteJSON = function(url,data,callback){
    $.ajax({
        url:url,
        type:"delete",
        contentType:"application/json",
        dataType:"json",
        data:data,
        success:function(msg){
            callback(msg);
        },
        error:function(xhr,textstatus,thrown){
                alert("删除失败");
        }
    });
};


//---formatter 格式化返回td
function spanFormatter(data) {
    if(data==null||data=="null")data="";
    return "<span style='cursor:pointer'>" + data+"</span>";
}
function operateFormatter(value, row, index) {
    return [
        '<a class="edit btn btn-success btn-xs" href="javascript:void(0)" title="编辑">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>  ',
        '<a class="cancel btn btn-warning btn-xs" href="javascript:void(0)" title="取消编辑" style="display:none">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
function nullFormatter(data) {
    if(data==null||data=="null")data="";
    if(data.length>10)data = data.substr(0,10)+"...";
    return "<span style='cursor:pointer' href='javascript:void(0)' >"+data+"</span>";
}

//批量删除操作
function deletes(url){
    $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    });
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id});
    }

    $remove.click(function () {
        var ids = getIdSelections();
        $.postJSON(url,"["+ids.toString()+"]",function(data){
            if(data>0){
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                $.gritter.add({
                    title: '提示',
                    text: '删除信息成功!',
                    sticky: false,
                    time: 2500
                });
            }else{
                alert("删除失败，请联系技术人员!");
            }
        });

        $remove.prop('disabled', true);
    });
}

//我的bootrap-editable 编辑封装
var myedit = {
    startEdit ://开始编辑
        function ($row,$edit){
            $edit.siblings("a").css("display","inline-block");
            $row.find(".editable").editable('toggleDisabled');
            $edit.find("i").removeClass("glyphicon-edit");
            $edit.find("i").addClass("glyphicon-ok");
            $edit.addClass("editting");
        },
    endEdit ://结束编辑
        function ($row,$edit){
            $edit.siblings("a").css("display","none")
            $(".form-inline input").val("");
            $edit.find("i").removeClass("glyphicon-ok");
            $edit.find("i").addClass("glyphicon-edit");
            $edit.removeClass("editting");
            $row.find(".editable").editable('toggleDisabled');//转成不可编辑状态
        },
    cancelEdit ://取消编辑
        function ($row,$cancel){
            $row.find(".editable").editable('toggleDisabled');
            $cancel.siblings("a").find("i").removeClass("glyphicon-ok");
            $cancel.siblings("a").find("i").addClass("glyphicon-edit");
            $cancel.siblings("a").removeClass("editting");
            $cancel.css("display","none");
        },
    getRow ://获取row
            function ($table,index,pagination){//表格、索引、表格是否分页
                if(pagination){//分页的情况
                    var currentPage = $(".page-number").filter(".active").find("a").html();//当前页
                    var pageSize = $(".page-size").html();//页面大小
                    index = index+1-(currentPage-1)*pageSize//tr所在行
                }else{
                    index +=1;
                }
                return $table.find("tbody tr:nth-child("+index+")");
    }
}



//导航切换样式处理
function switchNav(css){
    $("#top_menu").find(css).addClass("iactive");
    $("#top_menu "+css).parents("li").hover(
        function () {
            $("#top_menu").find(css).removeClass("iactive");
        },
        function () {
            $("#top_menu").find(css).addClass("iactive");
        }
    );
}

//radio list初始化
function initRadio(){
    var ls = gebtn(document,'label');
    for (var i = 0; i < ls.length; i++) {
        var l = ls[i];
        if (l.className.indexOf('label_') == -1) continue;
        var inp = gebtn(l,'input')[0];
        if (l.className == 'label_radio') {
            l.className = (safari && inp.checked == true || inp.checked) ? 'label_radio r_on' : 'label_radio r_off';
            l.onclick = turn_radio;
        };
    };
}
var gebtn = function(parEl,child) { return parEl.getElementsByTagName(child); };
var safari = (navigator.userAgent.toLowerCase().indexOf('safari') != -1) ? true : false;
var turn_radio = function() {
    var inp = gebtn(this,'input')[0];
    if (this.className == 'label_radio r_off' || inp.checked) {
        var ls = gebtn(this.parentNode,'label');
        for (var i = 0; i < ls.length; i++) {
            var l = ls[i];
            if (l.className.indexOf('label_radio') == -1)  continue;
            l.className = 'label_radio r_off';
        };
        this.className = 'label_radio r_on';
        if (safari) inp.click();
    } else {
        this.className = 'label_radio r_off';
        if (safari) inp.click();
    };
};

