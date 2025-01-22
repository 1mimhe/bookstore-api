const crypto = require("crypto");

async function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
            if (err) reject(err);
            resolve(`${salt}:${derivedKey.toString("hex")}`);
        });
    });
}

async function verifyPassword(password, hashedPassword) {
    return new Promise((resolve, reject) => {
        const [salt, hash] = hashedPassword.split(":");

        if (!salt || !hash) {
            reject(new Error('Stored hash is in invalid format.'));
        }

        crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
            if (err) reject(err);
            const isCorrectPassword = derivedKey.toString("hex") === hash;            
            resolve(isCorrectPassword);
        });
    });
}

module.exports = {
    hashPassword,
    verifyPassword
}