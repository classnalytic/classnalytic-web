const express = require('express');

const router = express.Router();

const AuthticationMiddleware = require('../middlewares/AuthenticationMiddlewares');
const { Enrolls, Users, Classrooms, Rooms, Subjects } = require('../services/sequelize');

router.use(AuthticationMiddleware);

router.get('/', async (req, res) => {
  let user = req.user;
  let classrooms = await Enrolls.findAll({
    where: { userId: user.id },
    order: ['createdAt'],
    include: [
      { model: Users, attributes: { exclude: ['password'] } },
      { model: Classrooms, include: [Rooms, Subjects] }
    ]
  });

  return res.send(classrooms);
});

router.get('/:id', async (req, res) => {
  let id = req.params.id;

  let classroom = await Classrooms.findById(id, { include: [Subjects, Rooms] })
    .then((data) => {
      if (!data) {
        return { found: false };
      }

      return { ...data.toJSON(), found: true };
    })
    .catch(() => ({ found: false }));

  return res.send({ ...classroom });
});

module.exports = router;
