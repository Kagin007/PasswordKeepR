/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM users;`
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

//main page that displays user's list of URLS.

// ** FROM TINY APP
// app.get("/user", (req, res) => {
//   const cookiesUser = req.session.userID;
//   //if user is not logged in they are redirected to the register page
//   const userUrls = filterUserID(urlDatabase, cookiesUser);
//   const templateVars = {
//     user: users[cookiesUser],
//     urls: userUrls,
//   };
//   if (cookiesUser) {
//     res.render("urls_index", templateVars);
//   } else {
//     res.render("not_logged_in", templateVars);
//   }
// });
