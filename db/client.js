const { Client } = require("pg");
require("dotenv").config();

const connectionString =
  process.env.DATABASE_URL || "https://localhost:5432/biznus";
console.log(process.env.DATABASE_URL);

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
