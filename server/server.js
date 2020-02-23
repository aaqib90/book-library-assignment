const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const loki = require('lokijs');

/**
 * Create a in-memory database and collection
 */
const db = new loki('Library');
const books = db.addCollection('books');

const PORT = 8080;

/**
 * Inserting two books object in in-memory db collections
 */

books.insert({
    author: "Marijn Haverbeke",
    "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    count: 20,
    name: "Eloquent JavaScript, Second Edition"
});

books.insert({
    "count": 31,
    "name": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
})

/**
 * middleware json Body parser
 */
app.use(bodyParser.json());

/**
 * Morgon middleware to print the incoming request in the conseole
 */
app.use(morgan('dev'))

/**
 * Enable CORS
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

/**
 * Get request to fetch all the books record from in-memory db collection.
 * @URL - /getBooksInfo
 * @return Books json
 */
app.get('/getBooksInfo', (req, res) => {

    const data = books.find({})
    res.send(data);
    //.catch((err) => res.send(err))

})

/**
 * Insert book object into collection
 * @URL - /addBookInfo
 * @return object
 */
app.post('/addBookInfo', (req, res) => {
    const data = req.body;
    books.insert(data);
    res.json(books.find({}));
})


/**
 * update book object into collection
 * @URL - /updateBookInfo
 * @return object
 */
app.put('/updateBookInfo', (req, res) => {
    const data = req.body;
    let docs = books.findOne({'$loki': data['$loki']});
    docs.name = data.name;
    docs.description = data.description;
    docs.count = data.count;
    docs.author = data.author
    res.json(books.find({}));
})


/**
 *  Bind app to PORT
 */
app.listen(PORT, () => console.log("Server is running at 8080"));
