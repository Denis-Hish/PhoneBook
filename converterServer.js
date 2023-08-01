const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());

app.post('/create-xml-files', (req, res) => {
   const { xmlString1, xmlString2 } = req.body;

   // Сохраняем xmlString1 в файл file1.xml
   fs.writeFile('file1.xml', xmlString1, (err) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ message: 'Error saving file1.xml' });
      }
      console.log('File1 saved successfully');
   });

   // Сохраняем xmlString2 в файл file2.xml
   fs.writeFile('file2.xml', xmlString2, (err) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ message: 'Error saving file2.xml' });
      }
      console.log('File2 saved successfully');

      return res.json({ message: 'Files saved successfully' });
   });
});

app.listen(port, () => {
   console.log(`Сервер работает по адресу http://localhost:${port}`);
});
