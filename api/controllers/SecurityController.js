var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            console.log("user: ", JSON.stringify(user));
            console.log("err: ", err);
            if ((err) || (!user || user == false)) {
                return res.json(403,{
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.json(200,{
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    }
};