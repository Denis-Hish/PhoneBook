const argon2 = require('argon2');
const User = require('./app/models/authentication.model');

const createOrUpdateAdminUser = async () => {
   try {
      const existingUser = await User.findOne({ username: 'admin' });

      if (existingUser) {
         // Если пользователь уже существует, обновляем его хэшированный пароль
         existingUser.username = 'admin'; // Изменяем логин на новое значение
         existingUser.hashedPassword = await argon2.hash('1');
         await existingUser.save();
         console.log('Admin user updated successfully');
      } else {
         // Если пользователь не существует, создаем новую запись
         const adminUser = {
            username: 'admin',
            hashedPassword: await argon2.hash('1'), // Хэшируем пароль с помощью Argon2
         };
         await User.create(adminUser);
         console.log('Admin user created successfully');
      }
   } catch (error) {
      console.error('Error creating or updating admin user:', error);
   }
};

module.exports = { createOrUpdateAdminUser };
