/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const app = express()
// const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {

    const templateVars = {
        userId: null
    }

    if (templateVars.userId) {
        res.redirect('../')
    }

    res.render('../views/login.ejs', templateVars)
  });
  router.post("/", (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password

    console.log(email)
    console.log(password)

    const params = [email, password]
      db.query(`SELECT * FROM users (name, email, password) VALUES ($1, $2, $3) Returning*;`, params)
      .then( res => {
        console.log('success: ', res.rows[0])
        // return
        params.push(res.rows[0])

      })
      .catch( err => {
        console.log(err)
        console.log(err.message)
      })
      res.redirect("/main")

  })

return router;
};


