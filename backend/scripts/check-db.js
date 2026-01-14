#!/usr/bin/env node

require('dotenv').config();
const db = require('../models');

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

      console.log(`✅ Admin user created successfully: ${adminUsername}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
