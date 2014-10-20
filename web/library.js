"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

function Book(title, author, id) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function Library() {
}
// TOGETHER!
Library.prototype.all = function(buzzer) {
	var allBooks = [];

	db.query("SELECT * FROM books;", [], function(err, resultSet){
    	if (err) {
    		console.log("QUERY FAILED", err);
    	}
    	resultSet.rows.forEach(function(row){
    		var aBook = new Book(row.title, row.author, row.id);
    		allBooks.push(aBook);
    	});
 			// console.log(allBooks);
 			buzzer(allBooks);
        });
	};

	// retrieve books
	// allBooks.push(new Book('The Great Gatsby', 'Fitzgerald', 1));
	// allBooks.push(new Book('Tin Drum', 'Grass', 1));


Library.prototype.add = function(title, author, buzzer) {
	db.query("INSERT INTO books(title,author) VALUES ($1,$2);", [title,author], function(err, resultSet){
		if(err) console.log("QUERY FAILED", err);
		// console.log(resultSet);
		buzzer();
		// resultSet.rows.forEach(function(row){
		// 	var newBook = new Book(row.title, row.author, row.id);
		// 	allBooks.push(newBook);
		// });
		// console.log(newBook);
		// buzzer(newBook);
		// TODO
		// db.query... INSERT
		// call buzzer with the new book
	});
};

Library.prototype.destroy = function(id, buzzer) {
	db.query("DELETE FROM books WHERE id = $1;", [id], function(err, resultSet){
		console.log(id);
		if(err) console.log("QUERY FAILED", err);
		// console.log(resultSet);
		buzzer();
	});
};
	// TODO
	// db.query... DELETE
	// call buzzer without params when done


Library.prototype.update = function(id, title, author, buzzer) {
	db.query("UPDATE books SET title = $1, author = $2 WHERE id = $3", [title, author, id], function(err, resultSet){
		if(err) console.log("QUERY FAILED", err);
		buzzer();
	});
};
	// TODO
	// db.query... UPDATE
	// call buzzer without params when done

Library.prototype.findById = function(id, buzzer) {
	db.query("SELECT * FROM books WHERE id=$1", [id], function(err, resultSet){
		if(err) console.log("QUERY FAILED" + err);
			var foundBook = new Book(resultSet.rows[0].title,resultSet.rows[0].author,resultSet.rows[0].id);
			
				buzzer(foundBook);
		});
	};
	// TODO
	// db.query... SELECT
	// call buzzer with the book found

module.exports = Library;
