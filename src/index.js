//Developer Mode
'use strict';

const express =  require ('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash'); //Message on views
const passport  = require('passport');

//Initialization
const app = express();
require('./database');
require('./config/auth');

//Setting & routes for my directories
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:  path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
//Methods HTTP  to auth and store user data
//Instead of ajax
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Daws',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Global Variables
app.use((req,res,next)=>{
    res.locals.succes = req.flash('succes')
    res.locals.errors = req.flash('errors')
    res.locals.error = req.flash('error')
    next();
})
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));//let app know where public is 

//Server is listening;
app.listen(app.get('port'), ()=> {
    console.log('Server on port' , app.get('port'));
})