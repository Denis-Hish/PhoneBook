module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('authentication', {
    username: { type: Sequelize.STRING, unique: true, allowNull: false },
    hashedPassword: { type: Sequelize.STRING, allowNull: false },
  });
  return User;
};
