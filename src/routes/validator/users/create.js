module.exports = (req, res, next) => {
    req
        .checkBody('name', 'O campo name é obrigatório')
        .notEmpty();
    req
        .checkBody('email', 'O campo email é obrigatório')
        .notEmpty()
        .isEmail();
    req
        .checkBody('password', 'O campo password é obrigatório')
        .notEmpty();

    let errors = req.validationErrors();

    if (!errors) {
        return next();
    }

    return res.redirect('/users/new');

}