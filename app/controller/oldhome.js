'use strict';

// const Controller = require('egg').Controller;
const HttpController = require('./base/http');

// 校验参数
const createRule = {
  title: 'string',
  content: {
    type: 'string',
  },
};

class HomeController extends HttpController {

  // 创建数据
  async create() {
    // 1. 获取 post参数
    const { ctx } = this;

    // 2. 获取数据、写入 mongoose

    try {
      // 校验参数
      ctx.validate(createRule, ctx.request.body);

      const { title, content } = ctx.request.body;

      const postsInstance = new ctx.model.Posts({ // egg 会自动转为大驼峰 posts --> Posts
        title, content,
      });

      const res = await postsInstance.save();
      await this.success(res);
    } catch (error) {
      await this.fail(error);
    }
  }

  // 查询全部数据
  async index() {
    const { ctx } = this;
    // console.log('----', ctx.csrf);
    // 1. 查询数据
    try {
      const res = await ctx.model.Posts.find();
      await this.success(res);
    } catch (error) {
      await this.fail(error);
    }
  }

  // 查询一条数据
  async show() {
    const { ctx } = this;

    try {
      // 1. 获取id
      const { id } = ctx.params;

      // 2. 查询数据
      const res = await ctx.model.Posts.find({
        _id: id,
      });
      await this.success(res);
    } catch (error) {
      await this.fail(error);
    }
  }

  // 删除
  // deletedCount为0的时候，表示删除了一条不存在的数据，也是成功
  // 若是id的长度不对 则会报错
  async destroy() {
    const { ctx } = this;

    try {
      // 1. 获取id
      const { id } = ctx.params;

      // 2. 删除
      const res = await ctx.model.Posts.remove({
        _id: id,
      });

      await this.success(res);
    } catch (error) {
      await this.fail(error);
    }
  }

  // 更新
  async update() {
    const { ctx } = this;

    try {
      // 1. 获取id 和 需要更新的数据
      const { id } = ctx.params;
      const requestBody = ctx.request.body;

      // 2. 更新, 需要 1. 查询条件 2. 更新的数据
      const res = await ctx.model.Posts.update({
        _id: id,
      }, {
        $set: {
          ...requestBody,
        },
      });

      await this.success(res);
    } catch (error) {
      await this.fail(error);
    }
  }

}

module.exports = HomeController;
