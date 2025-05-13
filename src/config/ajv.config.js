const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({
    useDefaults: true,
    removeAdditional: true,
    coerceTypes: true
});
addFormats(ajv);

function removeEmptyValues(obj) {
    if (!obj || typeof obj !== 'object') return;

    const stack = [{ obj, key: null, parent: null }];
    const seen = new WeakSet();

    while (stack.length > 0) {
        const { obj: currentObj, key, parent } = stack.pop();

        if (seen.has(currentObj)) {
            continue;
        }
        seen.add(currentObj);

        if (key === null && parent === null) {
            if (Array.isArray(currentObj) && currentObj.length === 0) {
                currentObj.length = 0;
                continue;
            }
        }

        if (key !== null && parent !== null) {
            if (
                currentObj === undefined ||
                currentObj === null ||
                currentObj === '' ||
                (Array.isArray(currentObj) && currentObj.length === 0)
            ) {
                delete parent[key];
                continue;
            }
        }

        if (currentObj && typeof currentObj === 'object') {
            const keys = Object.keys(currentObj);

            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                const value = currentObj[k];

                if (value && typeof value === 'object') {
                    stack.push({ obj: value, key: k, parent: currentObj });
                } else if (value === undefined || value === null || value === '') {
                    delete currentObj[k];
                }
            }
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
    validate: function (_, { parentData, parentDataProperty }) {
        if (parentData && parentDataProperty) {
            const slug = parentData[parentDataProperty]
                .trim()
                .toLowerCase()
                .replace(/[^\p{L}\p{N}\s-]/gu, '')
                .replace(/[\s_]+/g, '-')
                .replace(/^-+|-+$/g, '');

            parentData[parentDataProperty] = slug;
        }
        return true;
    }
});

ajv.addKeyword({
    keyword: 'decodeUrlArray',
    modifying: true,
    schema: false,
    validate: function (schema, { parentData, parentDataProperty }) {
        const data = parentData[parentDataProperty];
        if (typeof data === 'string' && parentData && parentDataProperty) {
            const decodedString = decodeURIComponent(data);
            parentData[parentDataProperty] = JSON.parse(decodedString);
        }

        return true;
    }
});

ajv.addKeyword({
    keyword: 'commaSeparatedIntegers',
    modifying: true,
    schema: false,
    validate: function (schema, { parentData, parentDataProperty }) {
        const data = parentData[parentDataProperty];

        if (Array.isArray(data)) return true;
        if (typeof data !== 'string') return false;

        const parts = data.split(',').map(part => part.trim());
        const ints = parts.map(n => Number(n));

        if (ints.some(n => !Number.isInteger(n) || n < 1)) return false;

        parentData[parentDataProperty] = ints;

        return true;
    }
});

ajv.addFormat('username', /^[a-zA-Z0-9](?!.*[_\-.]{2})[a-zA-Z0-9_\-.]{3,28}[a-zA-Z0-9]$/);
ajv.addFormat('strong-password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/);
ajv.addFormat('iran-phone', /^09\d{9}$/);
ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);

module.exports = ajv;