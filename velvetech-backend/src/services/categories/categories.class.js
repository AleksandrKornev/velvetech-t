const { Service } = require('feathers-knex');

exports.Categories = class Categories extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'categories'
    });
  }
};
