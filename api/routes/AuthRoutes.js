const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ login: true });
  } else {
    return res.json({ login: false });
  }
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ success: false, info: {} });
    }

    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }

      return res.json({
        success: true,
        info: {
          ...user
        }
      });
    });
  })(req, res, next);
});

module.exports = router;
