const argon2 = require('argon2');
const db = require('./app/models');
const User = db.User;

// если такой логин есть - обновится пароль
// если логина нет - создастся новая запись в БД с логином и паролем
const createOrUpdateAdminUser = async (newUsername, newPassword) => {
  try {
    const hashedPassword = await argon2.hash(newPassword);
    const [user, created] = await User.upsert({
      username: newUsername,
      hashedPassword,
    });
    console.log(
      created
        ? 'Admin user created successfully'
        : 'Admin user updated successfully'
    );
  } catch (error) {
    console.error('Error updating or creating admin user:', error);
  }
};

const deleteUserByUsername = async username => {
  try {
    const deleted = await User.destroy({ where: { username } });
    if (deleted) {
      console.log('User deleted successfully');
      return true; // Успешное удаление
    } else {
      console.log('User not found');
      return false; // Пользователь не найден
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const getAllUserLogins = async () => {
  try {
    const users = await User.findAll({ attributes: ['username'] });
    const logins = users.map(user => user.username);
    console.log('User Logins:', logins);
    return logins; // Возвращаем массив логинов
  } catch (error) {
    console.error('Error getting user logins:', error);
    throw error;
  }
};

// 'новый логин' и 'новый пароль'
// createOrUpdateAdminUser('admin', 'admin');

// Удаления записи пользователя по логину
// deleteUserByUsername('den');

// Получения и вывода всех логинов
// getAllUserLogins();

module.exports = {
  // createOrUpdateAdminUser,
  deleteUserByUsername,
  getAllUserLogins,
};
