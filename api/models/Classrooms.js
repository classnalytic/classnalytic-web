module.exports = (sequelize, type) => {
  return sequelize.define('classrooms', {
    id: {
      type: type.UUID,
      primaryKey: true
    },
    subject: { type: type.STRING },
    room: { type: type.STRING }
  });
};
