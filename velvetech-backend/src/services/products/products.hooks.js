const { authenticate } = require('@feathersjs/authentication').hooks;

const getCategories = require('../../hooks/get-categories');

const createProduct = require('../../hooks/create-product');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [getCategories()],
    get: [getCategories()],
    create: [createProduct()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
