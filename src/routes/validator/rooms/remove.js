module.exports = (req, res, next) => {
    req
        .checkParams('id', 'O campo id é obrigatório')
        .notEmpty()
        .isMongoId();

    let errors = req.validationErrors();

    if (!errors) {
        return next();
    }

    return res.redirect('/rooms');
}