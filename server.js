// load .env data into process.env
require("dotenv").config();

//body parser for post
var bodyParser = require('body-parser')

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
// const bodyParser = require('body-parser');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// database helper query functions
const { databaseQuery } = require("./helpers.js")

console.log(dbParams)

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const todosRoutes = require("./routes/todolist");
const widgetsRoutes = require("./routes/widgets");

//add todo
// app.use("/api/addToDo", todosRoutes(db))

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/todos", todosRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render('login')
})

app.get("/register", (req, res) => {
  res.render('registration')
})

app.get("/main", (req, res) => {
  //need a function that filters by user/cookies
    return Promise.all([
      databaseQuery('movie'),
      databaseQuery('restaurant'),
      databaseQuery('book'),
      databaseQuery('product')])
      .then( response => {
        // console.log('response', response)
        const templateVars = {
          movie: response[0],
          restaurant: response[1],
          book: response[2],
          product: response[3]
        }

        res.render("main", templateVars)
    })
});

app.post("/main", (req, res) => {
  // console.log('res', res)
  const newCategory = req.body.data.category
  const todoId = req.body.data.id

  console.log(req.body.data)

  db.query(`UPDATE todos
            SET category = '${newCategory}'
            WHERE id = ${todoId};`)

});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
