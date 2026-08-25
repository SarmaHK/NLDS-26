const fs = require('fs');
const dotenv = require('dotenv');
const parsed = dotenv.parse(fs.readFileSync('.env'));
console.log("DB URL from .env:", parsed.DATABASE_URL);
console.log("System Process Env:", process.env.DATABASE_URL);
