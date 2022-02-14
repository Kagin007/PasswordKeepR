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
