const { Pool } = require('pg');
const variables = require('../../settings.ts');

const myURI = variables.postgres;

const pool = new Pool({
  connectionString: myURI,
});

const URI = process.env.PG_URI || myURI;

module.exports = pool;
