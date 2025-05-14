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
    required: ["name", "slug"]
  };

  return ajv.compile(schema);
}

function editPublisherValidator() {
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
    }
  };

  return ajv.compile(schema);
}

module.exports = {
  addPublisherValidator,
  editPublisherValidator
};