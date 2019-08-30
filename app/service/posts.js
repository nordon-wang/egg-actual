'use strict';

const Service = require('egg').Service;

class PostsService extends Service {

  // 创建
  async create(data) {
    const { ctx } = this;
    const { title, content } = data;
    const postsInstance = new ctx.model.Posts({ // egg 会自动转为大驼峰 posts --> Posts
      title, content,
    });

    const res = await postsInstance.save();
    return res;
  }


  // 查询全部
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Posts.find();

    return res;
  }

  // 查询一条数据
  async show(_id) {
    const { ctx } = this;

    const res = await ctx.model.Posts.find({
      _id,
    });

    return res;
  }

  // 删除
  async destroy(_id) {
    const { ctx } = this;

    const res = await ctx.model.Posts.remove({
      _id,
    });

    return res;
  }


  // 更新
  async update(_id, requestBody) {
    const { ctx } = this;

    const res = await ctx.model.Posts.update({
      _id,
    }, {
      $set: {
        ...requestBody,
      },
    });

    return res;
  }

}

module.exports = PostsService;
