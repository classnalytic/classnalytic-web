const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ login: true })
  } else {
    return res.json({ login: false })
  }
})

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.json({ success: false, login: false, info: {} })
    }

    if (!user) {
      return res.json({ success: false, login: false, info: {} })
    }

    req.logIn(user, async err => {
      if (err) {
        return next(err)
      }

      return res.json({
        success: true,
        login: true,
        info: {
          ...user
        }
      })
    })
  })(req, res, next)
})

router.post('/logout', (req, res) => {
  req.logout()
  return res.json({
    success: true
  })
})

module.exports = router
