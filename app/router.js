'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);

  /**
   * crud
   *  查分为 查一条 和 查全部
   */
   router.resources('/api/posts', controller.home)
};
