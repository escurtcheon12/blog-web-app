// const { Pool } = require("pg");
// module.exports = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "blog",
//   password: "123",
//   port: 5432,
// });

// const pgp = require("pg-promise")();
// const db = pgp("postgres://postgres:123@localhost:5432/blog");

const mysql = require("mysql");
require("dotenv").config();

module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_blog",
});
