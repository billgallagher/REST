'use strict';

var express = require('express'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  expressValidator = require('express-validator'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

var db = mongoose.connect('mongodb://localhost/device-depot-dev');

var app = express();


// set .html as the default extension
app.set('view engine', 'html');

app.set('showStackError', true);

  // Prettify HTML
app.locals.pretty = true;

app.use(morgan('dev'));

// Request body parsing middleware should be above methodOverride
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

  //Remove the powered by header
  app.disable('x-powered-by');

app.use(function(err, req, res, next){
   	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.route('/api/foo/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  })

app.route('/')
  .get(function(req,res){
    res.send('yo... home page baby!');
  })

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

