import React from 'react';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import axios from 'axios';

const Demo = () => {
   const handleRead = () => {};

   const handleDownload = () => {};

   return (
      <div style={{ width: '210px', textAlign: 'right' }}>
         <IconButton label="read" className="btn-download" style={{ color: '#8B008B' }} onClick={handleRead}>
            <ArticleIcon />
         </IconButton>

         <IconButton
            label="download"
            className="btn-download"
            style={{ color: '#C51E3A', marginLeft: '30px' }}
            onClick={handleDownload}
         >
            <DownloadIcon />
         </IconButton>
      </div>
   );
};

export default Demo;
