const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('./sequelize');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let user = await Users.findOne({ where: { username } }).then((user) => user);

    if (!user) {
      return done(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }

    user = user.dataValues;

    return done(null, {
      id: user.id,
      username: user.username,
      role: user.role,
      enabled: user.enabled
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
