/** 
 * posts.js 代表存储的表是 posts
 * 类似extend 无需手动加载 会自动添加到 ctx
*/


module.exports = app => {
  const mongoose = app.mongoose

  // 创建 schema
  const Schema = new mongoose.Schema({
    title: {
      type: String,
      unique: true
    },
    content: String
  })

  // 创建 model 类
  // ctx 上面可以访问到 model 类，在业务代码里面可以很方便的调用这个类进行 crud
  return mongoose.model('posts', Schema) // 将 model 类 return
}