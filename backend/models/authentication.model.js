module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('authentication', {
    username: { type: Sequelize.STRING, unique: true, allowNull: false },
    hashedPassword: { type: Sequelize.STRING, allowNull: false },
    role: {
      type: Sequelize.ENUM('admin', 'user'),
      defaultValue: 'user',
      allowNull: false,
    },
  });
  return User;
};
