const passport = require('passport');
const str = require('passport-local').Strategy;
const User = require('../models/Users');


passport.use(new str({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return done(null, false, {
            message: 'User not found.'
        });
    } else {
        //instance of user
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect Password'})
        }
    }
}));

//Save id on the session
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//Unsave id on the session
passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{
        done(err, user);
    })
})


