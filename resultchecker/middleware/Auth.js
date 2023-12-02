const isAuth = (req, res, next) => {
    if (req.session.userID && req.session) {
        return next();
    } else {
        res.redirect("/std_log.html");
    }
    
}

module.exports = isAuth;