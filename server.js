// load .env data into process.env
require("dotenv").config();

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

console.log(dbParams)

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

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

    db.query(`SELECT * FROM todos;`)
    .then( response => {
      console.log('SELECT: ', response.rows[0])
      // return
      const userToDos = response.rows[0]

      const templateVars = {
        data: userToDos,
      };

      res.render("main", templateVars)

      // return response
    })
    .catch( err => {
      console.log(err)
      console.log(err.message)
    })

})

app.get("/urls", (req, res) => {
  const cookiesUser = req.session.userID;
  //if user is not logged in they are redirected to the register page
  const userUrls = filterUserID(urlDatabase, cookiesUser);
  const templateVars = {
    user: users[cookiesUser],
    urls: userUrls,
  };
  if (cookiesUser) {
    res.render("urls_index", templateVars);
  } else {
    res.render("not_logged_in", templateVars);
  }
});

// app.post("/todo"), (req, res) => {
//   const description = req.body.todoitem;

//   const addTodo =  function(user='Adam', description="mcDonalds") {
//     return db
//       .query(
//         `INSERT INTO todos (name, email, category, description, completed, created_date, completed_date)
//         VALUES ($1, $2, $3, $4, $5, $6, $7)
//         RETURNING *`, ['user.name', 'user.email', 'temp-category', 'description', 'false', 'temp-date', 'temp-date'] )

//       .then( res => {
//         console.log(res.rows)
//         return res.rows[0]
//       })
//       .catch( err => {
//         return err.message
//       })
//   }
// }

// app.get("/main", (req, res) => {
//   res.render('test')
// })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
