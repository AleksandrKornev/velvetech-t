const { authenticate } = require('@feathersjs/authentication').hooks;

const getCategories = require('../../hooks/get-categories');

const createCategories = require('../../hooks/create-categories');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [getCategories()],
    get: [getCategories()],
    create: [createCategories()],
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
