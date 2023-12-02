const isStudentAuth = (req, res, next) => {
    if (req.session.userID && req.session) {
        return next();
    } else {
        res.redirect("/std_log.html");
    }
    
}

const isStaffAuth = (req, res, next) => {
  if (req.session.userID && req.session) {
    return next();
  } else {
    res.redirect("/staff_log.html");
  }
};

module.exports = { isStudentAuth, isStaffAuth };