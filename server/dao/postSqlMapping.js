/**
 * Created by ASUS on 2017/1/2.
 */
var post = {
    model:function(){
        return {
        id:"",
        name:"", //名称
            type:"",//岗位级别  1中队长岗位 2二级岗 3三级岗
        callnumber:"",//呼号
        peakpoint:"",//高峰点
        peaktime:"",//高峰时间
        resttime:"",//工歇时间
        mealtime:"",//就餐时间
        responsiblearea:"",//责任区范围
        patrolline:"",//巡线
        worktime:"",//班次-执勤时间
        createtime:"",//创建时间
        updatetime:"",//更新时间
        isactive:"",//是否有效（0无效，1有效）
        remark:"",//备注
        dadui_id:"",//大队
            dadui_name:"",//大队名
        zhongdui_id:"",//中队
            zhongdui_name:"",//中队名
        }
    },
    insert:'INSERT INTO t_du_post(name,type,callnumber,peakpoint,peaktime,resttime,mealtime,responsiblearea,patrolline,worktime,createtime,updatetime,isactive,remark,dadui_id,zhongdui_id)' +
    ' VALUES(:name,:type, :callnumber,:peakpoint,:peaktime,:resttime,:mealtime,:responsiblearea,:patrolline,:worktime,:createtime,:updatetime,:isactive,:remark,:dadui_id,:zhongdui_id)',
    update:'update t_du_post set name=:name,type=:type,callnumber=:callnumber,peakpoint=:peakpoint,peaktime=:peaktime,resttime=:resttime,mealtime=:mealtime,responsiblearea=:responsiblearea,' +
    'patrolline=:patrolline,worktime=:worktime,createtime=:createtime,updatetime=:updatetime,isactive=:isactive,remark=:remark,dadui_id=:dadui_id,zhongdui_id=:zhongdui_id where id=:id',
    delete: 'delete from t_du_post where id in',
    queryById: 'select t.*,d.name as dadui_name,z.name as zhongdui_name from t_du_post t left join t_du_dadui d on t.dadui_id = d.id  left join t_du_zhongdui z on t.zhongdui_id = z.id where t.id=:id',
    queryAll: 'select t.*,d.name as dadui_name,z.name as zhongdui_name from t_du_post t left join t_du_dadui d on t.dadui_id = d.id  left join t_du_zhongdui z on t.zhongdui_id = z.id',
    query: 'select t.*,d.name as dadui_name,z.name as zhongdui_name from t_du_post t left join t_du_dadui d on t.dadui_id = d.id  left join t_du_zhongdui z on t.zhongdui_id = z.id where 1=1 ',
    queryByZhongdui:'select t.*,z.name as zhongdui_name from t_du_post t left join t_du_zhongdui z on t.zhongdui_id = z.id where z.id=:id',
    queryByDadui:'select t.*,d.name as dadui_name,z.name as zhongdui_name from t_du_post t left join t_du_dadui d on t.dadui_id = d.id ' +
    ' left join t_du_zhongdui z on t.zhongdui_id = z.id where d.id=:id order by t.type'
};

module.exports = post;
