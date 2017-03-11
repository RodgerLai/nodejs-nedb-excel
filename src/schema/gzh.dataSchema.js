module.exports = [
  {
    key: '_id',
    title: '存储ID',
    dataType: 'int',
    showInTable: false,
     primary: true,
  },
   {
    key: 'no',
    title: '序号',
    dataType: 'int',
  },
  {
    key: 'gid',
    title: '公众号ID',
    dataType: 'varchar',
     validator: [{required: true, message: '必填'}],
   },
   {
    key: 'name',
    title: '公众号',
    dataType: 'varchar',
     validator: [{required: true, message: '必填'}],
  },
  {
    key: 'type',
    title: '分类',
    dataType: 'varchar',
    showType: 'select',
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
  },
  {
    key: 'fans',
    title: '粉丝数/W',
    dataType: 'int',
   
  },
  {
    key: 'h1',
    title: '头条/元',
    dataType: 'int',
   
  },
  {
    key: 'h2',
    title: '二条/元',
    dataType: 'int',
   
  },
  {
    key: 'h3',
    title: '三条/元',
    dataType: 'int',
  
  },
   {
    key: 'h4',
    title: '四条/元',
    dataType: 'int',
   
  },
   {
    key: 'remarks',
    title: '备注',
    dataType: 'varchar',
    },
   {
    key: 'commentfunc',
    title: '是否有评论功能',
   showType: 'radio',
    options: [{key: '是', value: '是'}, {key: '否', value: '否'}],
  },
   {
    key: 'readamount',
    title: '阅读量',
    dataType: 'int',
   
  },
   {
    key: 'isauth',
    title: '是否认证',
    showType: 'radio',
    options: [{key: '是', value: '是'}, {key: '否', value: '否'}],
  },
   {
    key: 'mediacell',
    title: '媒体手机',
    dataType: 'varchar',
    
  },
  {
    key: 'mediaqq',
    title: '媒体QQ',
    dataType: 'varchar',
  
  },{
    key: 'discount',
    title: '折扣',
    dataType: 'varchar',
   
  },{
    key: 'nextupdate',
    title: '下次更新',
    dataType: 'varchar',
   
  },{
    key: 'businessdock',
    title: '商务对接',
    dataType: 'varchar',
  
  },
];
