var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db_User = require("../model/model.user");

module.exports = function(app) {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(new LocalStrategy((username, password, done) => {
        db_User.findUser(username).then(rows => {
            if (rows.length === 0) {
                return done(null, false);
            } else {
                if (rows[0].Password == password) {
                    return done(null, rows[0]);
                } else {
                    return done(null, false);
                }
            }
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        db_User.findUser(user.Name).then(rows => {
            if (rows.length > 0) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    })

    //login 
    app.post("/login", passport.authenticate('local', {
        failureRedirect: "/",
        successRedirect: "/todolist"
    }));

}