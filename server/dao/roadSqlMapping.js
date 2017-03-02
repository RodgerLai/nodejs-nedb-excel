/**
 * Created by ASUS on 2017/1/2.
 */
var road = {
    model:function(){return {id:"",
        road:"",//路名
        condition:"",//路况
        type:"",//1 正常 2拥堵 3堵塞
        uptime:"",//上报时间
        dadui_id:"",
        dadui_name:""}},
    insert:'INSERT INTO t_du_roadcondition(road, condition,type,uptime,dadui_id) ' +
    'VALUES(:road, :condition,:type,:uptime,:dadui_id)',
    update:'update t_du_roadcondition set road=:road, condition=:condition,type=:type,' +
    'uptime=:uptime,dadui_id=:dadui_id where id=:id',
    delete: 'delete from t_du_roadcondition where id in',
    queryById: 'select t.*,d.name as dadui_name from t_du_roadcondition t left join t_du_dadui d on t.dadui_id = d.id where t.id=:id',
    queryAll: 'select t.*,d.name as dadui_name from t_du_roadcondition t left join t_du_dadui d on t.dadui_id = d.id',
    query: 'select t.*,d.name as dadui_name from t_du_roadcondition t left join t_du_dadui d on t.dadui_id = d.id where 1=1 '
};

module.exports = road;
