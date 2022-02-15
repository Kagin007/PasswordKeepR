const express = require('express');
const res = require('express/lib/response');
const router  = express.Router();
const app = express();
const { categoryFinder } = require('../categoryCheck');

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

  router.get("/todo", (req, res) => {
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

  router.post("/todo/",  (req, res) => {
    const description = req.body.todoitem;
    console.log('we got here!', description)

    categoryFinder(description).then( category => {

      const params = [1, category, description, true, '2002-12-31', '2003-10-31']
      db.query(`INSERT INTO todos (user_id, category, description, completed, created_date, completed_date) VALUES ($1, $2, $3, $4, $5, $6) Returning*;`, params)
      .then( res => {
        console.log('success1')
        console.log('success: ', res.rows[0])
        // return
        params.push(res.rows[0])
      })
      .catch( err => {
        console.log(err)
        console.log(err.message)
      })
    })
    })

  return router;

};

// const addUser =  function() {
//   return db
//     .query(
//       `INSERT INTO users (name, email, password)
//       VALUES ($1, $2, $3)
//       RETURNING *`, [user.name, user.password, user.email] )

//     .then( res => {
//       console.log(res.rows)
//       return res.rows[0]
//     })
//     .catch( err => {
//       return err.message
//     })
// }

//temporary values for inserting into DB
// const addTodo =  function(user='Adam', description="mcDonalds") {
//   return db
//     .query(
//       `INSERT INTO todos (name, email, category, description, completed, created_date, completed_date)
//       VALUES ($1, $2, $3, $4, $5, $6, $7)
//       RETURNING *`, ['user.name', 'user.email', 'temp-category', 'description', 'false', 'temp-date', 'temp-date'] )

//     .then( res => {
//       console.log(res.rows)
//       return res.rows[0]
//     })
//     .catch( err => {
//       return err.message
//     })
// }
// exports.addTodo = addTodo;

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
