const ajv = require("../config/ajv.config");

function addProfileValidator() {
  const schema = {
    type: 'object',
    removeEmpty: true,
    properties: {
      firstName: {
        type: 'string',
        minLength: 1
      },
      lastName: {
        type: 'string'
      },
      slug: {
        type: 'string',
        toSlug: true,
        minLength: 3
      },
      biography: {
        type: 'string'
      },
      dateOfBirth: {
        type: 'string',
        format: 'date'
      },
      dateOfDeath: {
        type: 'string',
        format: 'date'
      }
    },
    required: ['firstName']
  };

  return ajv.compile(schema);
}

function editProfileValidator() {
  const schema = {
    type: 'object',
    removeEmpty: true,
    properties: {
      firstName: {
        type: 'string',
        minLength: 1
      },
      lastName: {
        type: 'string'
      },
      slug: {
        type: 'string',
        toSlug: true,
        minLength: 3
      },
      biography: {
        type: 'string'
      },
      dateOfBirth: {
        type: 'string',
        format: 'date'
      },
      dateOfDeath: {
        type: 'string',
        format: 'date'
      }
    }
  };

  return ajv.compile(schema);
}

module.exports = {
  addProfileValidator,
  editProfileValidator
};