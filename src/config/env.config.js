const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const envPath = path.join(__dirname, "/../..", `.${process.env.NODE_ENV}.env`);
dotenv.config({ path: envPath });

console.log(`${process.env.MODE} mode.`);