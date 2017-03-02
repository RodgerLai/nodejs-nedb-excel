var dadui = {
	model:function(){return {id:"",name:"",responsiblearea:""}},
	insert:'INSERT INTO t_du_dadui(name, responsiblearea) VALUES(:name, :responsiblearea)',
	update:'update t_du_dadui set name=:name, responsiblearea=:responsiblearea where id=:id',
	delete: 'delete from t_du_dadui where id in',
	queryById: 'select * from t_du_dadui where id=:id',
	queryAll: 'select * from t_du_dadui'
};
 
module.exports = dadui;