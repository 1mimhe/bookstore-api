const ajv = require("../configs/ajv.config");

function registrationValidator() {
    const schema = {
        type: 'object',
        removeEmpty: true,
        properties: {
            username: { type: 'string', format: 'username' },
            password: { type: 'string', format: 'strong-password' },
            firstName: { type: 'string', minLength: 2 },
            lastName: { type: 'string', minLength: 2 },
            phoneNumber: { type: 'string', format: 'iran-phone' },
            email: { type: 'string', format: 'email' },
        },
        required: ['username', 'firstName', 'password'],
        additionalProperties: false,
    };

    return ajv.compile(schema);
}

module.exports = {
    registrationValidator
}