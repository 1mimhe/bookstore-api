const ajv = require("../config/ajv.config");

function userAddressValidator() {
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
      additionalProperties: false,
  };

  return ajv.compile(schema);
}

module.exports = {
  userAddressValidator
};