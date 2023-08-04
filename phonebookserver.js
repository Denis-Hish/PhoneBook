require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { createOrUpdateAdminUser } = require('./userUtils');

const app = express();

app.use(cors());

app.use(express.static(__dirname));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// must be after "app.use(express.json())" and "app.use(express.urlencoded())"
require('./app/routes/phones.routes')(app);

// Connect DB
const db = require('./app/models');
db.mongoose
   .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('Connected to the database!');
      createOrUpdateAdminUser();
   })
   .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
   });

// Обработчик POST-запроса для сохранения файлов
app.post('/create-xml-files', (req, res) => {
   const { xmlString1, xmlString2 } = req.body;

   // Создаем папку "converted", если ее нет
   const convertedDir = path.join(__dirname, 'xml'); // каталог для сохранения
   if (!fs.existsSync(convertedDir)) {
      fs.mkdirSync(convertedDir);
   }

   // Сохраняем xmlString1
   const file1Path = path.join(convertedDir, 'PhoneBook_1_Yealink.xml');
   fs.writeFile(file1Path, xmlString1, (err) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ message: 'Error saving PhoneBook_1_Yealink.xml' });
      }
      console.log('File1 saved successfully');
   });

   // Сохраняем xmlString2
   const file2Path = path.join(convertedDir, 'PhoneBook_2.xml');
   fs.writeFile(file2Path, xmlString2, (err) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ message: 'Error saving PhoneBook_2.xml' });
      }
      console.log('File2 saved successfully');

      return res.json({ message: 'Files saved successfully' });
   });
});

// Подключение маршрутов для управления пользователями (логин, пароль)
app.use('/api/user', require('./app/routes/user.routes'));

// Load UI
// app.get('/', (req, res) => {
//    res.redirect('http://localhost:3000');
// });

const PORT = process.env.PORT || 8080; // для сервера порт: 3000 / для локального порт: 8080
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});
