exports.checkAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    if (req.session.user.rol !== 'admin') {
        return res.redirect("/canchas"); 
    }

    res.locals.user = req.session.user;
    next();
}