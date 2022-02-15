require("dotenv").config();
const PORT = process.env.PORT || 8080;
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);


const databaseQuery = (restaurant, user=1) => {
  return db.query(
    `SELECT * FROM todos
    WHERE category = '${restaurant}'
    AND user_id = ${user}
    AND completed = false;`
  ).then(res => {
    return res.rows
  })
  .catch()
};

// databaseQuery('restaurant')

module.exports = { databaseQuery }
