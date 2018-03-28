const Rooms = require('./../../schemas/rooms');
module.exports = (req, res) => {
    
    Rooms
        .findById(req.params.id)
        .then((room) => {
            if (!room){
                return res.sendStatus(404);
            }
            return res.render('rooms/edit', {
                title: 'Rooms - ChatSchool Admin',
                room,
                user_logged: req.user
            })
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
}