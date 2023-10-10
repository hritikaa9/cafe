const pkg = require('pg');
const { Client } = pkg;
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  host: process.env.dbhost,
  user: process.env.dbuser,
  port: process.env.dbport,
  password: process.env.dbpass,
  database: process.env.db,
});

client.connect((err) => {
  if (err) console.log(err);
  else console.log("Database connected");
});

module.exports = {client};