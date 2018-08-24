const Sequelize = require('sequelize');
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = require('../config/index');

// Model import
const UsersModel = require('../models/Users');
const ClassroomsModel = require('../models/Classrooms');
const SubjectsModel = require('../models/Subjects');
const RoomsModel = require('../models/Rooms');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false
});

// Use model
const Users = UsersModel(sequelize, Sequelize);
const Classrooms = ClassroomsModel(sequelize, Sequelize);
const Subjects = SubjectsModel(sequelize, Sequelize);
const Rooms = RoomsModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  Users,
  Classrooms,
  Subjects,
  Rooms
};
