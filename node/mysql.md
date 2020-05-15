###ORM-Sequelize
npm i sequelize mysql2 -S
```javascript
(async () => {
  const Sequelize = require("sequelize");
  // 建立连接
  //(用户名,密码)
  const sequelize = new Sequelize("test", "root", "example", {
    host: "localhost",
    dialect: "mysql",//方言
    operatorsAliases: false,
    pool:{
        max:10,
        min:0,
        idle:30000
    }
 });
  // 定义模型 
  const Fruit = sequelize.define("Fruit", {
    //uuid
    id: {
     type: Sequelize.DataTypes.UUID,
     defaultValue: Sequelize.DataTypes.UUIDV1,
     primaryKey: true//主键
   },
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
 },{
    timestamps:false,//避免自动生成时间戳字段
    tableName:'ffff',//表名
    
});
  // 同步数据库，force: true则会删除已存在表
  let ret = await Fruit.sync()

  //增加
  ret = await Fruit.create({
    name: "香蕉",
    price: 3.5
 })
 //全部查询
  ret = await Fruit.findAll()
//更新
 await Fruit.update(
   { price: 4 },
   { where: { name:'香蕉'} }
 )
//条件查询
const Op = Sequelize.Op;

  ret = await Fruit.findAll({
    // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
//少于4 大于2
    where: { price: { [Op.lt]: 4, [Op.gt]: 2 } }
 })

})()
```