/**
 * Created by ASUS on 2017/1/2.
 */
var zhongdui = {
    model:function(){return {id:"",name:"",responsiblearea:"",dadui_id:"",dadui_name:""}},
    insert:'INSERT INTO t_du_zhongdui(name, responsiblearea,dadui_id) VALUES(:name, :responsiblearea,:dadui_id)',
    update:'update t_du_zhongdui set name=:name, responsiblearea=:responsiblearea,dadui_id=:dadui_id where id=:id',
    delete: 'delete from t_du_zhongdui where id in',
    queryById: 'select t.*,d.name as dadui_name from t_du_zhongdui t left join t_du_dadui d on t.dadui_id = d.id where t.id=:id',
    queryAll: 'select t.*,d.name as dadui_name from t_du_zhongdui t left join t_du_dadui d on t.dadui_id = d.id',
    query: 'select t.*,d.name as dadui_name from t_du_zhongdui t left join t_du_dadui d on t.dadui_id = d.id where 1=1 '
};

module.exports = zhongdui;
