```javascript
(async () => {
  const { MongoClient: MongoDB } = require('mongodb')
  // 创建客户端
  const client = new MongoDB(
   'mongodb://localhost:27017',
  {
    userNewUrlParser: true
  }
 )
  let ret
  // 创建连接
  ret = await client.connect()
  //创建数据库
  const db = client.db('test')
  //创建表
  const fruits = db.collection('fruits')
  // 添加文档
  ret = await fruits.insertOne({
   name: '芒果',
   price: 20.1
 })
  // 查询文档
  ret = await fruits.findOne()

  // 更新文档
  // 更新的操作符 $set 搜索条件,更新内容
 ret = await fruits.updateOne({ name: '芒果' },
 { $set: { name: '苹果' } })
  // 删除文档
  ret = await fruits.deleteOne({name: '苹果'})
  await fruits.deleteMany()
  client.close()
})()
```
###封装数据库
```javascript
const conf = require("./conf");
const EventEmitter = require("events").EventEmitter;
// 客户端
const MongoClient = require("mongodb").MongoClient;
class Mongodb {
 constructor(conf) {
  // 保存conf
  this.conf=conf;
  this.emmiter = new EventEmitter();
  // 连接
  this.client = new MongoClient(conf.url, { useNewUrlParser: true });
  this.client.connect(err => {
   if (err) throw err;
   console.log("连接成功");
   this.emmiter.emit("connect");
 });
}
//执行
 col(colName, dbName = conf.dbName) {
  return this.client.db(dbName).collection(colName);
}
 once(event, cb) {
  this.emmiter.once(event, cb);
}}
 // 2.导出db
 module.exports = new Mongodb(conf);
```
###Mongose
```javascript
// mongoose.js
const mongoose = require("mongoose");
// 1.连接
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("error", () => console.error("连接数据库失败"));
conn.once("open", async () => {
 // 2.定义一个Schema - Table 理解为表的模板
 const Schema = mongoose.Schema({
  category: String,
  name: String
});
 // 3.编译一个Model, 它对应数据库中复数、小写的Collection
 const Model = mongoose.model("fruit", Schema);
 try {
  // 4.创建，create返回Promise
  let r = await Model.create({
   category: "温带水果",
   name: "苹果",
   price: 5
 });
  console.log("插入数据:", r);
  // 5.查询，find返回Query，它实现了then和catch，可以当Promise使用
  // 如果需要返回Promise，调用其exec()
  r = await Model.find({ name: "苹果" });
  console.log("查询结果:", r);
  // 6.更新，updateOne返回Query
  r = await Model.updateOne({ name: "苹果" }, { $set: { name: '芒果' } });
  console.log("更新结果：", r);
  // 7.删除，deleteOne返回Query
  r = await Model.deleteOne({ name: "苹果" });
  console.log("删除结果：", r);
} catch (error) {
  console.log(error);
}
});
```