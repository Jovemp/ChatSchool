module.exports = (req, res) => {
    return res.render('main/index', {
        title: 'Chatschool Nodejs',
        user_logged: req.user
    });
}