const ajv = require("../config/ajv.config");

function addUserAddressValidator() {
  const schema = {
    type: 'object',
    removeEmpty: true,
    properties: {
      userId: { type: 'number' },
      recipientName: { type: 'string', minLength: 4 },
      country: { type: 'string' },
      province: { type: 'string', minLength: 2 },
      city: { type: 'string', minLength: 2 },
      postalAddress: { type: 'string', minLength: 5 },
      postalCode: { type: 'string', minLength: 10, maxLength: 10 },
      phoneNumber: { type: 'string', format: 'iran-phone' }
    },
    required: ['userId', 'recipientName', 'province', 'city', 'postalAddress'],
  };

  return ajv.compile(schema);
}

function editUserValidator() {
  const schema = {
    type: 'object',
    removeEmpty: true,
    properties: {
      userId: { type: 'number' },
      username: { type: 'string', format: 'username' },
      password: { type: 'string', format: 'strong-password' },
      firstName: { type: 'string', minLength: 2 },
      lastName: { type: 'string', minLength: 2 },
      phoneNumber: { type: 'string', format: 'iran-phone' },
      email: { type: 'string', format: 'email' },
    },
  };

  return ajv.compile(schema);
}

module.exports = {
  addUserAddressValidator,
  editUserValidator
};