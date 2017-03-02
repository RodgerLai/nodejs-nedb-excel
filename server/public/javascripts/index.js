/**
 * Created by ASUS on 2017/1/3.
 */
$(document).ready(function(){
    initFileInput("excelInputFile","/file/uploading");
    switchNav(".fa-home"); //导航切换样式处理
});

//初始化fileinput控件（第一次初始化）
function initFileInput(ctrlName, uploadUrl) {
    var control = $('#' + ctrlName);

    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        allowedFileExtensions : ['xls', 'xlsx'],//接收的文件后缀
        allowedPreviewTypes  :['xls', 'xlsx'],//接收的文件后缀
        maxFileCount:31,
        enctype: "multipart/form-data",
        showUpload: true, //是否显示上传按钮
        showCaption: false,//是否显示标题
        browseOnZoneClick:true,
        //dropZoneEnabled: false,//是否显示拖拽区域
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        // maxImageWidth: 50,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
        //minFileCount: 0,
        // change thumbnail footer template
        previewFileIconSettings: {
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'xlsx': '<i class="fa fa-file-excel-o  text-success"></i>',
        },
        browseClass: "btn btn-primary btn-xs", //按钮样式
        removeClass: "btn btn-file btn-xs", //按钮样式
        uploadClass: "btn btn-info btn-xs", //按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    });
    control.on('filepreupload', function(event, data, previewId, index, jqXHR) {
        console.log("filepreupload:"+event);
        // do your validation and return an error like below
        /*if (customValidationFailed) {
         return {
         message: 'You are not allowed to do that',
         data: {key1: 'Key 1', detail1: 'Detail 1'}
         };
         }*/
    });
    control.on('fileuploaderror', function(event,params,msg) {
        console.log(msg);
        alert("上传出错！");return;
        // do your validation and return an error like below
        /*if (customValidationFailed) {
         return {
         message: 'You are not allowed to do that',
         data: {key1: 'Key 1', detail1: 'Detail 1'}
         };
         }*/
    });
    control.on('fileuploaded', function(event, params) {
        console.log("fileuploaded:");
        console.log(event);
        // params.abortData will contain the additional abort data passed
        // params.abortMessage will contain the aborted error message passed
    });
}




