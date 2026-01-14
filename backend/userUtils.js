const argon2 = require('argon2');
const db = require('./models');
const User = db.User;

// Автоматическое создание администратора при первом запуске
const initializeAdminUser = async () => {
  try {
    // Проверяем, есть ли хотя бы один пользователь
    const userCount = await User.count();

    if (userCount === 0) {
      // Получаем логин и пароль из переменных окружения
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;

      console.log('🔐 Initializing admin user...');
      console.log(`   Username: ${adminUsername}`);

      const hashedPassword = await argon2.hash(adminPassword);
      await User.create({
        username: adminUsername,
        hashedPassword,
        role: 'admin',
      });

      console.log('✅ Admin user created successfully');
      console.log('⚠️  Change the password after first login!');
    } else {
      console.log('✅ Database already contains users');
    }
  } catch (error) {
    console.error('❌ Error initializing admin user:', error.message);
    console.error('Full error:', error);
    throw error; // Пробрасываем ошибку чтобы узнать что случилось
  }
};

// если такой логин есть - обновится пароль и роль
// если логина нет - создастся новая запись в БД с логином, паролем и ролью
const createOrUpdateAdminUser = async (
  newUsername,
  newPassword,
  role = 'admin'
) => {
  try {
    const hashedPassword = await argon2.hash(newPassword);
    const [user, created] = await User.upsert({
      username: newUsername,
      hashedPassword,
      role,
    });
    console.log(
      created
        ? `User created successfully: ${newUsername} (${role})`
        : `User updated successfully: ${newUsername} (${role})`
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

// 'новый логин' и 'новый пароль' и 'роль' (admin или user)
// createOrUpdateAdminUser('admin', 'admin', 'admin');

// Удаления записи пользователя по логину
// deleteUserByUsername('den');

// Получения и вывода всех логинов
// getAllUserLogins();

module.exports = {
  initializeAdminUser,
  createOrUpdateAdminUser,
  deleteUserByUsername,
  getAllUserLogins,
};
