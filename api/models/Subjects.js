module.exports = (sequelize, type) => {
  return sequelize.define('subjects', {
    id: {
      type: type.UUID,
      primaryKey: true
    },
    name: { type: type.STRING, notEmpty: false },
    description: type.TEXT
  });
};
