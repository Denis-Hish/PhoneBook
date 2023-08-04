const argon2 = require('argon2');
const User = require('./app/models/authentication.model');

// если такой логин есть - обновится пароль
// если логина нет - создастся новая запись в БД с логином и паролем
const createOrUpdateAdminUser = async (newUsername, newPassword) => {
   try {
      const existingUser = await User.findOne({ username: newUsername });

      if (existingUser) {
         // Если пользователь с заданным именем уже существует, обновляем его хэшированный пароль
         existingUser.hashedPassword = await argon2.hash(newPassword);
         await existingUser.save();
         console.log('Admin user updated successfully');
      } else {
         // Если пользователь не существует, создаем новую запись
         const adminUser = {
            username: newUsername,
            hashedPassword: await argon2.hash(newPassword), // Хэшируем пароль с помощью Argon2
         };
         await User.create(adminUser);
         console.log('Admin user created successfully');
      }
   } catch (error) {
      console.error('Error updating or creating admin user:', error);
   }
};

const deleteUserByUsername = async (username) => {
   try {
      const result = await User.deleteOne({ username });
      if (result.deletedCount > 0) {
         console.log('User deleted successfully');
      } else {
         console.log('User not found');
      }
   } catch (error) {
      console.error('Error deleting user:', error);
   }
};

const getAllUserLogins = async () => {
   try {
      const users = await User.find({}, 'username'); // Находим всех пользователей, но выбираем только поле "username"
      const logins = users.map((user) => user.username); // Извлекаем только логины из результатов
      console.log('User Logins:', logins);
   } catch (error) {
      console.error('Error getting user logins:', error);
   }
};

// 'новый логин' и 'новый пароль'
// createOrUpdateAdminUser('den', '1');

// Удаления записи пользователя по логину
// deleteUserByUsername('den');

// Получения и вывода всех логинов
// getAllUserLogins();

module.exports = { createOrUpdateAdminUser };
