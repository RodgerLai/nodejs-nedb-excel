/**
 * Created by ASUS on 2017/1/2.
 */
var police = {
    model:function(){
        return {
        id:"",
        name:"", //名称
        gender:"",//性别  0保密 1男 2女
        policenumber:"",//警号
        tetra_id:"",//手台ID
        lon:"",//经度
        lat:"",//纬度
        createtime:"",//创建时间
        updatetime:"",//更新时间
        isactive:"",//是否有效（0无效，1有效）
        remark:"",//备注
        dadui_id:"",//大队
        dadui_name:"",//大队名
        zhongdui_id:"",//中队
        zhongdui_name:"",//中队名
        post_id:"",//岗位id
        post_name:"",//岗位名
        }
    },
    insert:'INSERT INTO t_du_police(name,gender,policenumber,tetra_id,lon,lat,createtime,updatetime,isactive,remark,dadui_id,zhongdui_id,post_id)' +
    ' VALUES(:name,:gender, :policenumber,:tetra_id,:lon,:lat,:createtime,:updatetime,:isactive,:remark,:dadui_id,:zhongdui_id,:post_id)',
    update:'update t_du_police set name=:name,gender=:gender,policenumber=:policenumber,tetra_id=:tetra_id,' +
    'updatetime=:updatetime,isactive=:isactive,remark=:remark,dadui_id=:dadui_id,zhongdui_id=:zhongdui_id,post_id=:post_id where id=:id',
    delete: 'delete from t_du_police where id in',
    queryById: 'select t.*,d.name as dadui_name,z.name as zhongdui_name,p.name as post_name from t_du_police t left join t_du_dadui d on t.dadui_id = d.id' +
    '  left join t_du_zhongdui z on t.zhongdui_id = z.id left join t_du_post p on t.post_id = p.id where t.id=:id',
    queryAll: 'select t.*,d.name as dadui_name,z.name as zhongdui_name,p.name as post_name from t_du_police t left join t_du_dadui d on t.dadui_id = d.id ' +
    ' left join t_du_zhongdui z on t.zhongdui_id = z.id left join t_du_post p on t.post_id = p.id ',
    query: 'select t.*,d.name as dadui_name,z.name as zhongdui_name,p.name as post_name from t_du_police t left join t_du_dadui d on t.dadui_id = d.id ' +
    ' left join t_du_zhongdui z on t.zhongdui_id = z.id left join t_du_post p on t.post_id = p.id  where 1=1 ',
};

module.exports = police;
