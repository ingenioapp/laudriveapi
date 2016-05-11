var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  console.log("user: ", user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser: ", id);
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    console.log("email: ", email);
    console.log("password: ", password);
    User.findOne({ email: email }, function (err, user) {
     console.log("user found: ", user);
     console.log("error found: ", err); 
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: 'Invalid Password'
            });
          var returnUser = {
            email: user.email,
            perfil:user.perfil,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
    });
  }
));