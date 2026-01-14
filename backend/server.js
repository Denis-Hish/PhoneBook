// server.js
require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { initializeAdminUser } = require('./userUtils');

const app = express();

// Trust proxy (для X-Forwarded-For header)
app.set('trust proxy', 1);

// SECURITY & PERFORMANCE middlewares
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// ограничение частоты запросов (пример)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 200, // максимум запросов с одного IP за window
  skip: req => {
    // Пропускаем OPTIONS запросы
    return req.method === 'OPTIONS';
  },
});
app.use(limiter);

// CORS
const cors = require('cors');

app.use(
  cors({
    origin: true, // Разрешить все origin (для production SPA)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// Ограничиваем размер тела запроса (во избежание DoS)
app.use(express.json({ limit: '200kb' })); // под XML можно увеличить при необходимости
app.use(express.urlencoded({ extended: true, limit: '200kb' }));

// API routes (подключаем до раздачи статики)
const API_PREFIX = process.env.API_PREFIX || '';
require('./routes/phones.routes')(app, API_PREFIX);
app.use(API_PREFIX + '/api/user', require('./routes/user.routes'));
app.use(API_PREFIX + '/api/auth', require('./routes/auth.routes'));

// Подключение к БД
const db = require('./models');
db.sequelize
  .sync({ force: false })
  .then(async () => {
    console.log('Connected to the database!');
    try {
      // Автоматическое создание admin пользователя при первом запуске
      await initializeAdminUser();
    } catch (err) {
      console.error('initializeAdminUser error:', err);
    }
  })
  .catch(err => {
    console.error('Cannot connect to the database!', err);
    process.exit(1);
  });

// Обработчик сохранения XML (async/await, валидное поведение)
app.post('/create-xml-files', async (req, res) => {
  try {
    const { xmlString1, xmlString2 } = req.body;

    // простая валидация
    if (typeof xmlString1 !== 'string' || typeof xmlString2 !== 'string') {
      return res
        .status(400)
        .json({ message: 'xmlString1 and xmlString2 must be strings' });
    }

    // опционально: ограничим длину
    const MAX_LEN = 200 * 1024; // 200 KB
    if (xmlString1.length > MAX_LEN || xmlString2.length > MAX_LEN) {
      return res.status(400).json({ message: 'XML too large' });
    }

    const xmlDir = path.join(__dirname, 'xml');
    // recursive: true — создает директорию, если нужно
    await fs.mkdir(xmlDir, { recursive: true });

    const file1Path = path.join(xmlDir, 'PhoneBook_1_Yealink.xml');
    const file2Path = path.join(xmlDir, 'PhoneBook_2.xml');

    // Записываем оба файла параллельно
    await Promise.all([
      fs.writeFile(file1Path, xmlString1, 'utf8'),
      fs.writeFile(file2Path, xmlString2, 'utf8'),
    ]);

    console.log('XML files saved:', file1Path, file2Path);
    return res.json({ message: 'Files saved successfully' });
  } catch (err) {
    console.error('Error in /create-xml-files:', err);
    return res.status(500).json({ message: 'Error saving XML files' });
  }
});

// Отдача фронтенда (содержимое public = билд фронтенда)
const publicPath = path.join(__dirname, 'public');

// Безопасно служить только из public (не __dirname)
app.use(express.static(publicPath, { maxAge: '30d' }));

// SPA fallback (всё, что не /api/* отдаем index.html)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Запуск
const PORT = process.env.PORT || 8080; //? для сервера порт: 3000 / для локального порт: 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
