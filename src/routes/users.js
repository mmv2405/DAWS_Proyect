const express = require("express");
const router = express.Router();
const User = require('../models/Users');
const passport  = require('passport');


router.get('/users/login', (req, res) => {
    res.render('users/login');
});

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});


router.get('/users/register', (req, res) => {
    res.render('users/register');
});

router.post('/users/register', async (req, res) => {
    const {
        name,
        lastname,
        email,
        password,
        password2
    } = req.body;
    const errors = [];
    if (!name) {
        errors.push({
            text: 'A name must be provided'
        });
    }
    if (!lastname) {
        errors.push({
            text: 'Provide a last name'
        });
    }
    if (password != password2) {
        errors.push({
            text: 'Passwords do not match'
        });
    }
    if (!password.length) {
        errors.push({
            text: 'Password needs to be at least 6 characters'
        });
    }
    if (errors.length > 0) {
        res.render('users/register', {
            errors,
            name,
            lastname,
            email,
            password,
            password2
        });
    } else {
        //create our new user
        const emailUser = await User.findOne({
            email: email
        });
        if (emailUser) {
            req.flash('error', 'The Email is already in use');
            //res.redirect('/users/login');
        }
    const newUser = new User({
        name,
        lastname,
        email,
        password
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('succes', 'Registration success')
    res.redirect('/users/login');
}

console.log(req.body)

});

router.post('/users/login', passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.use(function(req,res,next){
    res.status(404).render('404.hbs');
}); //Renders on auth websites

module.exports = router;