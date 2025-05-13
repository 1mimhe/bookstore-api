const ajv = require("../config/ajv.config");

function addPublisherValidator() {
  const schema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1
      },
      slug: {
        type: "string",
        minLength: 1
      },
      description: {
        type: "string"
      }
    },
    required: ["name", "slug"],
    additionalProperties: false
  };

  return ajv.compile(schema);
}

module.exports = {
  addPublisherValidator
};