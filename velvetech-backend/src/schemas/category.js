const joi = require("joi");

const category = joi.object().keys({
  name: joi
    .string()
    .required()
})

module.exports = category;