import React from 'react';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const Demo = () => {
   const handleDownload = () => {
      const savePath = 'test/demofile1.html'; // Set the desired save path here

      // Make a GET request to fetch the file content
      axios.get('http://localhost:3000').then((response) => {
         // Create a blob with the response data
         const blob = new Blob([response.data], { type: 'text/html' });

         // Create a temporary URL for the blob
         const url = URL.createObjectURL(blob);

         // Create a link element to download the file
         const link = document.createElement('a');
         link.href = url;
         link.download = savePath; // Use the specified save path here

         // Append the link to the document and click it
         document.body.appendChild(link);
         link.click();

         // Clean up the temporary URL after the download
         URL.revokeObjectURL(url);
      });
   };

   return (
      <div style={{ width: '210px', textAlign: 'right' }}>
         <IconButton className="btn-download" color="primary" onClick={handleDownload}>
            <DownloadIcon />
         </IconButton>
      </div>
   );
};

export default Demo;
