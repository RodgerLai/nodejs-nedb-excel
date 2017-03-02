/**
 * Created by ASUS on 2017/1/3.
 */
var currentDadui;
$(document).ready(function(){
    switchNav(".fa-calendar"); //导航切换样式处理
    showDaduisTabHelper();//hbs:注入大队tab数据
    myhelper();
});




function showDaduisTabHelper(){//hbs:注入大队tab数据
    $.get("/dadui/queryAll",function(result){
        var data = {daduis:result};
        var head_source   = $("#ul_daduis_template").html();
        var content_source   = $("#tab_zhongdui_template").html();
        var head_template = Handlebars.compile(head_source);
        var content_template = Handlebars.compile(content_source);
        $("#ul_daduis").html(head_template(data));
        $("#tab_zhongdui").html(content_template(data));
        currentDadui = $("#ul_daduis").find(".active a").attr("href");
        showZhongduisHelper(currentDadui);
    });
}
function tab_dataInit(a){//tab切换onclick注册的方法
    currentDadui = $(a).attr("href");
    showZhongduisHelper(currentDadui);
}

function showZhongduisHelper(currentDadui){//hbs: 中队行显示
    console.log(currentDadui);
    $.get("/post/queryBydadui?id="+currentDadui.split("_")[2],function(posts){//获取岗位信息
        var data_zhongduis = {zhongduis:groupByZhongdui(posts)};
        var zhongdui_source = $("#block_zhongdui_template").html();
        var zhongdui_template = Handlebars.compile(zhongdui_source);
        $(currentDadui).html(zhongdui_template(data_zhongduis));
    });
}
function groupByZhongdui(posts){//根据中队id进行数据分组
    var map = {},dest = [];
    for(var i = 0; i < posts.length; i++){
        var pi = posts[i];
        if(!map[pi.zhongdui_id]){
            dest.push({
                zhongdui_id: pi.zhongdui_id,
                zhongdui_name: pi.zhongdui_name,
                data: [pi]
            });
            map[pi.zhongdui_id] = pi;
        }else{
            for(var j = 0; j < dest.length; j++){
                var dj = dest[j];
                if(dj.zhongdui_id == pi.zhongdui_id){
                    dj.data.push(pi);
                    break;
                }
            }
        }
    }
    console.log(dest);
    return dest;
}

function myhelper(){//某些特殊数据加载的处理
    Handlebars.registerHelper('star',function(type){//岗位级别显示
        var str = "";
        if(type !=null && type > 0){
            for(var i=0;i<type;i++){
                str +=  "<i class='fa fa-star star-yellow' title='岗位级别'></i>&nbsp;";
            }
        }
        return new Handlebars.SafeString(str);
    });
    Handlebars.registerHelper('work',function(worktime){//显示执勤时间分班
        var str = "<li title='班次-执勤时间'><a>";
        if(worktime !=null && worktime.length > 0){
            var arr = worktime.split(",");
            for(var i=0;i<arr.length;i++){
                var time = arr[i].split("=")[1];
                switch (arr[i].split("=")[0]){
                    case "早":
                        str += "<span title='早班'> <i class='fa fa-sun-o' style='color:#ffd473'></i>早&nbsp;"+time+"</span>&nbsp;&nbsp;";break;
                    case "中":
                        str += "<span title='中班'> <i class='fa fa-sun-o' style='color:#ffa920'></i>中&nbsp;"+time+"</span>&nbsp;&nbsp;";break;
                    case "日":
                        str += "<span title='日班'> <i class='fa fa-sun-o' ></i>日&nbsp;"+time+"</span>&nbsp;&nbsp;";break;
                    case "夜":
                        str += "<span  title='夜班'> <i class='fa fa-moon-o' ></i>夜&nbsp;"+time+"</span>&nbsp;&nbsp;";break;
                    default:
                        str += "<span title='工作时间'> <i class='fa fa-clock-o' ></i>执勤时间&nbsp;"+time+"</span>&nbsp;&nbsp;";break;
                }

            }
        }
        return new Handlebars.SafeString(str+"</a></li>");
    });
}