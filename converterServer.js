const express = require('express');
const { getAllContacts } = require('./services/paramsAPI');
const app = express();
const PORT = 3001; // Change this to any port number you prefer

app.use(express.json());

// Endpoint for file conversion and saving
app.get('/convert-files', async (req, res) => {
   try {
      const contacts = await getAllContacts();

      // ... Your existing code for generating XML files ...

      // Save xmlString1 to file1.xml
      const fs = require('fs');
      fs.writeFileSync('test_file1.xml', xmlString1);

      // Save xmlString2 to file2.xml
      fs.writeFileSync('test_file2.xml', modifiedXmlString2);

      res.json({ success: true, message: 'Files created and saved successfully!' });
   } catch (error) {
      console.error('Error converting and saving files:', error);
      res.status(500).json({ success: false, error: 'An error occurred while converting and saving files.' });
   }
});

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
