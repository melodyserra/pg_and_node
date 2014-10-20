"use strict"

var DB = require('./mydb_lib.js');

var library_db = new DB("library_example_app", 5432, "localhost");

library_db.query("SELECT * FROM books;", function(err, resultSet){
    if (err) console.log("SELECT FAILED :-(", err);
    console.log(resultSet.rows);
});

library_db.query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
["The Great Gatsby", "Fitzgerald"], function(err, resultSet){
  if (err) console.log("INSERT FAILED :-(", err);
  console.log(resultSet.rows);
});

library_db.end();

