const express = require('express')

const router = express.Router()

const AuthticationMiddleware = require('../middlewares/AuthenticationMiddlewares')
const { Users } = require('../services/sequelize')

router.use(AuthticationMiddleware)

router.post('/:id', async (req, res) => {
  let id = req.params.id

  let user = await Users.findById(id)
    .then((data) => {
      if (!data) {
        return { found: false }
      }

      delete user.password

      return { ...data.toJSON(), found: true }
    })
    .catch(() => ({ found: false }))

  return res.send({ ...user })
})

module.exports = router
