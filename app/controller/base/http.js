'use strict';

const Controller = require('egg').Controller;

/**
 * 抽象一个请求结果的返回值
 *  成功 {msg:'success', code: 0, data}
 *  失败 {msg:'err msg', code: !=0, data:{}}
 */
class HttpController extends Controller {
  async success(data) {
    this.ctx.body = {
      msg: data && data.msg || 'success',
      code: 0,
      data,
    };
  }

  async fail(data = {}) {
    this.logger.error(data);
    this.ctx.body = {
      msg: data && data.msg || 'fail',
      code: data && data.code || 999,
      data,
    };
  }
}

module.exports = HttpController;
