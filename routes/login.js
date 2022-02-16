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
  router.post("/push", (req, res) => {


    // This is where we need to set a cookie

  })

router.post('/', (req, res) => {
  const { email, password } = req.body;
  console.log(userLogin);
  userLogin(email, password, db)
    .then(user => {
      console.log(user);
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      return res.redirect("/");
    })
    .catch(error => res.send(error));
});

return router;
};


