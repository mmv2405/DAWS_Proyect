const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','Not your notes')
    res.redirect('/users/login')
}

module.exports = helpers;