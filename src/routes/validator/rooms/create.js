module.exports = (req, res, next) => {

    req
        .checkBody('name','O campo name é obrigatório')
        .notEmpty();
    req
        .checkBody('description','O campo description é obrigatório')
        .notEmpty();
    req
        .checkBody('enable', 'O campo enable é obrigatório')
        .notEmpty();

    let errors = req.validationErrors();

    if (!errors){
        return next();
    }
    return res.redirect('/rooms');
}