const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({ useDefaults: true, removeAdditional: true });
addFormats(ajv);

function removeEmptyValues(obj) {
    if (!obj || typeof obj !== 'object') return;

    const stack = [{ obj, key: null }];
    const seen = new WeakSet();

    while (stack.length > 0) {
        const { obj: currentObj, key } = stack.pop();

        if (seen.has(currentObj)) {
            continue;
        }
        seen.add(currentObj);

        if (key && (currentObj === undefined || currentObj === null || currentObj === '')) {
            delete obj[key];
            continue;
        }

        if (currentObj && typeof currentObj === 'object') {
            Object.keys(currentObj).forEach(key => {
                const value = currentObj[key];
                if (value && typeof value === 'object') {
                    stack.push({ obj: value, key });
                } else if (value === undefined || value === null || value === '') {
                    delete currentObj[key];
                }
            });
        }
    }
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
        const isValidUsername = /^[a-zA-Z0-9](?!.*[_\-.]{2})[a-zA-Z0-9_\-.]{3,28}[a-zA-Z0-9]$/.test(username);
        return isValidUsername;
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