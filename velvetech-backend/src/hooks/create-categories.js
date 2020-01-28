const joi = require("joi");
const { BadRequest } = require('@feathersjs/errors');
const category = require("../schemas/category");

module.exports = (options = {}) => {
  return async context => {
    const result = joi.validate(context.data, category);

    if (result.error !== null) {
      throw new BadRequest(result.error.details[0].message);
    }

    return context;
  };
};
