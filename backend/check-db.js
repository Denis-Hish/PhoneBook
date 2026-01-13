#!/usr/bin/env node

require('dotenv').config();
const db = require('./models');

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connection successful');

    const users = await db.User.findAll();
    console.log(`\n📊 Total users in database: ${users.length}`);

    if (users.length > 0) {
      console.log('\n👥 Users:');
      users.forEach(user => {
        console.log(`  - ${user.username} (${user.role})`);
      });
    } else {
      console.log('\n⚠️  No users found in database');
      console.log('Creating default admin user...');

      const argon2 = require('argon2');
      const hashedPassword = await argon2.hash('admin');

      await db.User.create({
        username: 'admin',
        hashedPassword,
        role: 'admin',
      });

      console.log('✅ Admin user created successfully');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
