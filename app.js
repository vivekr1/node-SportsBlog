const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/sportsblog';
mongoose.connect(url);
const db = mongoose.connection;


const port = 3000;
// init app
const app = express();

// view setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Moment setup
app.locals.moment = require('moment')

const index = require('./routes/index');
const articles = require('./routes/articles');
const manage = require('./routes/manage');
const categories = require('./routes/categories');


// body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// express static folder
app.use(express.static(path.join(__dirname, 'public')));  

// express session 
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));



app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

  app.listen(port, ()=>{
    console.log('server started on port ', port);
  });