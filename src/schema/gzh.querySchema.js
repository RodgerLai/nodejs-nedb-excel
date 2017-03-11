// 定义某个表的querySchema
// schema的结构和含义参考下面的例子
// 注意: 所有的key不能重复

module.exports = [
  {
    key: 'gid',  // 传递给后端的字段名
    title: 'ID',  // 前端显示的名称
    dataType: 'varchar',
  },
  {
    key: 'name',
    title: '公众号名',
    dataType: 'varchar',
  },{
    key: 'type',
    title: '类型',
    dataType: 'int',
    showType: 'multiSelect',  // 下拉框选择, antd版本升级后, option的key要求必须是string, 否则会有个warning, 后端反序列化时要注意
    options: [{key: '金融财经', value: '金融财经'}, {key: '管理', value: '管理'}, {key: '互联网', value: '互联网'}
    , {key: '创业', value: '创业'}, {key: '新闻资讯', value: '新闻资讯'}, {key: '电商', value: '电商'}
    , {key: '营销', value: '营销'}, {key: '科技', value: '科技'}, {key: '地域', value: '地域'}
    , {key: '职场', value: '职场'}, {key: '教育', value: '教育'}, {key: '法律', value: '法律'}
    , {key: '旅行', value: '旅行'}, {key: '汽车', value: '汽车'}, {key: '母婴', value: '母婴'}
    , {key: '娱乐', value: '娱乐'}, {key: '搞笑', value: '搞笑'}, {key: '音乐', value: '音乐'}
    , {key: '电影', value: '电影'}, {key: '房产', value: '房产'}, {key: '两性', value: '两性'} 
    , {key: '时尚', value: '时尚'}, {key: '情感', value: '情感'}, {key: '星座', value: '星座'}
    , {key: '游戏', value: '游戏'}, {key: '美食', value: '美食'}, {key: '阅读', value: '阅读'}
    , {key: '视觉', value: '视觉'}, {key: '体育', value: '体育'}, {key: '生活', value: '生活'}
    , {key: '健康', value: '健康'}, {key: '百科', value: '百科'}, {key: '其他', value: '其他'}],
    //defaultValue: '*', // 这个defaultValue必须和options中的key是对应的
  },
    {
    key: 'h1',
    title: '头条(元)',
    dataType: 'int',
    showType: 'between',  // 整数范围查询, 对于范围查询, 会自动生成xxBegin/xxEnd两个key传递给后端
    //defaultValueBegin: 100,  // 对于between类型不搞max/min了, 太繁琐
   // defaultValueEnd: 100000,
  },
  {
    key: 'h2',
    title: '二条(元)',
    dataType: 'int',
    showType: 'between',  // 整数范围查询, 对于范围查询, 会自动生成xxBegin/xxEnd两个key传递给后端
    //defaultValueBegin: 100,  // 对于between类型不搞max/min了, 太繁琐
    //defaultValueEnd: 50000,
  },
  {
    key: 'h3',
    title: '三条(元)',
    dataType: 'int',
    showType: 'between',  // 整数范围查询, 对于范围查询, 会自动生成xxBegin/xxEnd两个key传递给后端
    //defaultValueBegin: 100,  // 对于between类型不搞max/min了, 太繁琐
    //defaultValueEnd: 10000,
  },
  {
    key: 'h4',
    title: '四条(元)',
    dataType: 'int',
    showType: 'between',  // 整数范围查询, 对于范围查询, 会自动生成xxBegin/xxEnd两个key传递给后端
    //defaultValueBegin: 1,  // 对于between类型不搞max/min了, 太繁琐
   // defaultValueEnd: 5000,
  },{
    key: 'fans',
    title: '粉丝(W)',
    dataType: 'int',
    showType: 'between',  // 整数范围查询, 对于范围查询, 会自动生成xxBegin/xxEnd两个key传递给后端
  },{
    key: 'discount',
    title: '折扣',
    dataType: 'int',
    showType: 'between',  // 整数范围查询, 对于范围查询, 会自动生成xxBegin/xxEnd两个key传递给后端
    //defaultValueBegin: 1,  // 对于between类型不搞max/min了, 太繁琐
    //defaultValueEnd: 10,
  },
   {
    key: 'commentfunc',
    title: '是否开启评论功能',
    dataType: 'varchar',
    showType: 'radio',
    options: [{key: '是', value: '是'}, {key: '否', value: '否'}],
  },{
    key: 'isauth',
    title: '是否认证',
    dataType: 'varchar',
    showType: 'radio',
    options: [{key: '是', value: '是'}, {key: '否', value: '否'}],
  },
  {
    key: 'businessdock',
    title: '商务对接',
    dataType: 'varchar',
  },
];
