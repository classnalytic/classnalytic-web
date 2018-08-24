const uuid = require('uuid/v4');

module.exports = (sequelize, type) => {
  return sequelize.define('users', {
    id: {
      type: type.UUID,
      defaultValue: uuid(),
      primaryKey: true
    },
    username: { type: type.STRING, notEmpty: true },
    password: { type: type.STRING, notEmpty: true },
    enabled: { type: type.BOOLEAN, defaultValue: true },
    role: { type: type.ENUM('teacher', 'student', 'admin'), defaultValue: 'student' }
  });
};
