const Users = require('./../../schemas/users')
module.exports = (req, res) => {
    console.log('Teste');
    let user = new Users();

    return res.render('users/create', {
        title: 'Users - ChatSchool Admin',
        user,
        user_logged: req.user
    });
}