"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Library = require('./library.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var library = new Library();

//Home
app.get('/', function(req, res){
  res.render('home');
});

//Index
app.get('/books', function(req, res){
  //DONE!
  console.log("/BOOKS");

  var buzzer = (function(leBooks) {
    res.render('library/index', {allBooks: leBooks});
});

  library.all(buzzer);

});

//New
app.get('/books/new', function(req, res){
  //DONE
	res.render("library/new");
});

//Create
app.post('/books', function(req, res) {
	//TODO
  console.log("/books -> Implement me.");
  library.add(req.body.book.title, req.body.book.author, function(){
    res.redirect('/books');
  });
  // library.add ....
});

//Show
app.get('/books/:id', function(req, res) {
  var id = req.params.id;
  library.findById(id, function(foundBook){
  //TODO
  console.log("/books -> Implement me.");
  // library.findById ...
  // Add library/show.ejs page and render it with found book
  // Add "Show" link on '/books' page.
  res.send("implement show book. showing book " + req.params.id);
  });
});

//Edit
app.get('/books/:id/edit', function(req, res) {
	var id = req.params.id;
  library.findById(id, function(foundBook){
    res.render('library/edit', {book:foundBook});
  });
});
  //TODO
  // console.log("/books/:id/edit -> Implement me.");
  // console.log(library.findById(id));
  
  //res.render('library/edit', {book: library.findById(id)});


//Update
app.put('/books/:id', function(req, res) {
	var id = req.params.id;
  var title=req.body.book.title;
  var author=req.body.book.author;
  library.update(id, title, author, function(){
  //TODO
  console.log("/books/:id -> Implement me.");
  // library.update ...
  res.redirect('/books');
  });
});


//Delete
app.delete('/books/:id', function(req, res) {
	var id = req.params.id;
  library.destroy(id, function(){
  //TODO
  // library.destroy ...
  res.redirect('/books');
  });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});