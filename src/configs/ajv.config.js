const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv();
addFormats(ajv);

ajv.addKeyword({
    keyword: 'removeEmpty',
    modifying: true,
    type: 'object',
    compile: () => (data) => {
      if (data && typeof data === 'object') {
        Object.keys(data).forEach(key => {
            if (data[key] === undefined || data[key] === null || data[key] === "") {
                delete data[key];
            }
        });
      }
      return true;
    },
});

ajv.addFormat('username', {
    type: 'string',
    validate: (username) => {
        return /^[a-zA-Z0-9](?!.*[_\-.]{2})[a-zA-Z0-9_\-.]{3,28}[a-zA-Z0-9]$/.test(username);
    }
});

ajv.addFormat('strong-password', {
    type: 'string',
    validate: (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password);
    }
});

ajv.addFormat('iran-phone', {
    type: 'string',
    validate: (phoneNumber) => {
        return /^09\d{9}$/.test(phoneNumber);
    }
});

module.exports = ajv;