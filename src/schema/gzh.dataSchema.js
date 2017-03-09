module.exports = [
  {
    key: 'gid',
    title: 'ID',
    dataType: 'int',
    primary: true,
  },
  {
    key: 'name',
    title: '公众号',
    dataType: 'varchar',
    validator: [{type: 'email', required: true, message: '邮箱地址有误'}],
  },
  {
    key: 'type',
    title: '分类',
    dataType: 'varchar',
    validator: [{type: 'url', message: '主页有误'}],
  },
  {
    key: 'fans',
    title: '粉丝数',
    dataType: 'varchar',
    validator: [{type: 'string', pattern: /^[a-zA-Z0-9]+$/, message: '只能是数字+字母'}],
  },
  {
    key: 'h1',
    title: '头条/元',
    dataType: 'varchar',
    validator: [{type: 'string', max: 10, message: '最多10个字符!'}],
  },
  {
    key: 'h2',
    title: '二条/元',
    dataType: 'varchar',
  },
  {
    key: 'h3',
    title: '三条/元',
    dataType: 'varchar',
    placeholder: '字符串yes/no',
    validator: [{required: true, message: '必填'}],
  },
];
