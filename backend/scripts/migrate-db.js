#!/usr/bin/env node

require('dotenv').config();
const db = require('../models');

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connection successful');

    console.log('🔄 Syncing database schema...');
    await db.sequelize.sync({ alter: true });
    console.log('✅ Database schema updated successfully');

    const users = await db.User.findAll();
    console.log(`\n📊 Total users in database: ${users.length}`);

    if (users.length > 0) {
      console.log('\n👥 Users:');
      users.forEach(user => {
        console.log(`  - ${user.username} (${user.role || 'unknown'})`);
      });
    } else {
      console.log('\n⚠️  No users found in database');
      console.log('Creating admin user from env (with fallbacks)...');

      const bcrypt = require('bcryptjs');
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
      if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
        console.warn(
          '⚠️  ADMIN_USERNAME/ADMIN_PASSWORD not set. Using default "admin/admin".'
        );
      }
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await db.User.create({
        username: adminUsername,
        hashedPassword,
        role: 'admin',
      });

      console.log('✅ Admin user created successfully');
      console.log('\n📝 Login credentials:');
      console.log(`   Username: ${adminUsername}`);
      console.log(
        `   Password: ${process.env.ADMIN_PASSWORD ? '[from env]' : 'admin'}`
      );
      console.log('   Role: admin');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('   Stack:', error.stack);
    process.exit(1);
  }
})();
