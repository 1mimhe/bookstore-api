const crypto = require("crypto");

async function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString("hex"));
        });
    });
}

module.exports = {
    hashPassword
}