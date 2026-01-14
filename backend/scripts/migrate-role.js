#!/usr/bin/env node

require('dotenv').config();
const mysql = require('mysql2/promise');

async function addRoleColumn() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('🔧 Проверяем наличие колонки role...');

    // Проверяем, существует ли уже колонка role
    const [columns] = await connection.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_NAME = 'authentications' 
       AND COLUMN_NAME = 'role' 
       AND TABLE_SCHEMA = ?`,
      [process.env.DB_NAME]
    );

    if (columns.length > 0) {
      console.log('✅ Колонка role уже существует');
      return;
    }

    console.log('⚠️  Колонка role не найдена. Добавляем...');

    // Добавляем колонку role с типом ENUM
    await connection.execute(
      `ALTER TABLE authentications 
       ADD COLUMN role ENUM('admin', 'user') NOT NULL DEFAULT 'user' 
       AFTER hashedPassword`
    );

    console.log('✅ Колонка role успешно добавлена!');
    console.log('📊 Новая схема таблицы:');

    const [rows] = await connection.execute('DESCRIBE authentications');
    console.table(rows);
  } catch (error) {
    console.error('❌ Ошибка при добавлении колонки:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addRoleColumn();
