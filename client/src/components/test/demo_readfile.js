const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/read-file', (req, res) => {
   fs.readFile('demofile1.html', 'utf8', (err, data) => {
      if (err) {
         res.status(500).send('Ошибка чтения файла');
      } else {
         res.send(data);
      }
   });
});

app.post('/create-file', (req, res) => {
   const content = req.body.content || 'Default content';
   fs.writeFile('mynewfile.txt', content, (err) => {
      if (err) {
         res.status(500).send('Ошибка создания файла');
      } else {
         res.send('Файл успешно создан');
      }
   });
});

app.post('/update-file', (req, res) => {
   const content = req.body.content || 'Default updated content';
   fs.appendFile('mynewfile.txt', content, (err) => {
      if (err) {
         res.status(500).send('Ошибка обновления файла');
      } else {
         res.send('Файл успешно обновлен');
      }
   });
});

app.delete('/delete-file', (req, res) => {
   fs.unlink('mynewfile.txt', (err) => {
      if (err) {
         res.status(500).send('Ошибка удаления файла');
      } else {
         res.send('Файл успешно удален');
      }
   });
});

app.put('/rename-file', (req, res) => {
   const newFileName = req.body.newFileName || 'myrenamedfile.txt';
   fs.rename('mynewfile.txt', newFileName, (err) => {
      if (err) {
         res.status(500).send('Ошибка переименования файла');
      } else {
         res.send('Файл успешно переименован');
      }
   });
});

app.listen(port, () => {
   console.log('Сервер работает по адресу http://localhost:' + port);
});
