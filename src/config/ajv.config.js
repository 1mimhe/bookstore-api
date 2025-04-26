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

ajv.addKeyword({
    keyword: 'toSlug',
    modifying: true,
    schema: false,
    validate: function (_, data, parentSchema, dataPath, parentData, propertyName) {
      if (typeof data === 'string' && parentData && propertyName) {
        const slug = data
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-');

        parentData[propertyName] = slug;
      }
      return true;
    }
});

ajv.addFormat('username', /^[a-zA-Z0-9](?!.*[_\-.]{2})[a-zA-Z0-9_\-.]{3,28}[a-zA-Z0-9]$/);
ajv.addFormat('strong-password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/);
ajv.addFormat('iran-phone', /^09\d{9}$/);
ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);

module.exports = ajv;