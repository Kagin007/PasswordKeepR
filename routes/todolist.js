const express = require('express');
const res = require('express/lib/response');
const router  = express.Router();
const app = express()

// checking to see if i can push//

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM todos;`
    console.log(db.query(query))
    db.query(query)
      .then(data => {
        console.log(data.rows)
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

//temporary values for inserting into DB
const addTodo =  function(user='Adam', description="mcDonalds") {
  return db
    .query(
      `INSERT INTO todos (name, email, category, description, completed, created_date, completed_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`, ['user.name', 'user.email', 'temp-category', 'description', 'false', 'temp-date', 'temp-date'] )

    .then( res => {
      console.log(res.rows)
      return res.rows[0]
    })
    .catch( err => {
      return err.message
    })
}
exports.addTodo = addTodo;

// const getUserWithEmail = (email) => {
//   return db
//     .query(`
//       SELECT * FROM users
//       WHERE email = $1`, [email]
//       )
//     .then(res => {
//       if (!res.rows) {
//         return null
//       }
//         return res.rows[0]
//     })
//     .catch((err) => {
//       return err.message
//     })
//   };

// exports.getUserWithEmail = getUserWithEmail;
