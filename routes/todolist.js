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
    categoryFinder(description).then( category => {

      const params = [1, category, description, true, '2002-12-31', '2003-10-31']
      db.query(`INSERT INTO todos (user_id, category, description, completed, created_date, completed_date) VALUES ($1, $2, $3, $4, $5, $6) Returning*;`, params)
      .then( res => {
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
