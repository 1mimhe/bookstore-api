const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({ useDefaults: true, removeAdditional: true });
addFormats(ajv);

function removeEmptyValues(obj) {
    if (!obj || typeof obj !== 'object') return;

    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value && typeof value === 'object') {
            removeEmptyValues(value);
            if (Object.keys(value).length === 0) {
                delete obj[key];
            }
        } else if (value === undefined || value === null || value === '') {
            delete obj[key];
        }
    });
}

ajv.addKeyword({
    keyword: 'removeEmpty',
    modifying: true,
    schema: false,
    validate: function (_, data) {
        if (data && typeof data === 'object') {
            removeEmptyValues(data);
        }
        return true;
    }
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