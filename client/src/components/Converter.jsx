import React, { useState } from 'react';
import { getAllContacts } from '../services/paramsAPI';
import { create } from 'xmlbuilder2';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setMessage } from './Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import Tooltip from '@mui/material/Tooltip';

const Converter = () => {
   const { t } = useTranslation();
   const [icon, setIcon] = useState('download');

   const handleConvert = async () => {
      const contacts = await getAllContacts();

      const xml1 = create({ version: '1.0', encoding: 'UTF-8' })
         .ele('YealinkIPPhoneBook')
         .ele('Title')
         .txt('Yealink')
         .up();

      const groupsXml1 = {};
      const uniqueGroups = new Set();

      const xml2 = create({ version: '1.0', encoding: 'UTF-8' }).ele('root_group');

      const xml2Contacts = create().ele('root_contact');

      // Sorted group
      const sortedGroups = [...new Set(contacts.map((contact) => contact.group))].sort();

      // Sort contacts by userName and group
      contacts.sort((a, b) => {
         const nameComparison = a.userName.localeCompare(b.userName);
         return nameComparison !== 0 ? nameComparison : a.group.localeCompare(b.group);
      });

      // Sort contacts by group and add to XML structures
      sortedGroups.forEach((group) => {
         const groupContacts = contacts.filter((contact) => contact.group === group);

         groupContacts.forEach((contact) => {
            const { userName, phoneNumber1, phoneNumber2, phoneNumber3, group } = contact;

            if (!groupsXml1[group]) {
               groupsXml1[group] = xml1.ele('Menu', { Name: group });
               if (!uniqueGroups.has(group)) {
                  xml2.ele('group', { display_name: group, ring: 'Auto' });
                  uniqueGroups.add(group);
               }
            }

            groupsXml1[group].ele('Unit', {
               Name: userName,
               Phone1: phoneNumber1 || '',
               Phone2: phoneNumber2 || '',
               Phone3: phoneNumber3 || '',
               default_photo: 'Resource:',
            });
         });
      });

      // Sort contacts by userName for xml2Contacts
      contacts.sort((a, b) => a.userName.localeCompare(b.userName));

      // Add contacts to xml2Contacts
      contacts.forEach((contact) => {
         const { userName, phoneNumber1, phoneNumber2, phoneNumber3, group } = contact;

         xml2Contacts.ele('contact', {
            display_name: userName,
            office_number: phoneNumber1 || '',
            mobile_number: phoneNumber2 || '',
            other_number: phoneNumber3 || '',
            line: '0',
            ring: 'Auto',
            group_id_name: group,
         });
      });

      Object.values(groupsXml1).forEach((group) => group.up());

      const xmlString1 = xml1.end({ prettyPrint: true });
      const xmlString2 = xml2.end({ prettyPrint: true }) + xml2Contacts.end({ prettyPrint: true });

      // Remove the '<?xml version="1.0"?>' string from xmlString2
      const modifiedXmlString2 = xmlString2.replace('<?xml version="1.0"?>', '');

      // Сохранение файлов с запросом браузера о сохранении
      // Save xmlString1 to file file1.xml
      // const file1Blob = new Blob([xmlString1], { type: 'text/xml' });
      // const file1Url = URL.createObjectURL(file1Blob);
      // const file1Link = document.createElement('a');
      // file1Link.href = file1Url;
      // file1Link.download = 'PhoneBook_1_Yealink.xml';
      // file1Link.click();

      // Save xmlString2 to file file2.xml
      // const file2Blob = new Blob([modifiedXmlString2], { type: 'text/xml' });
      // const file2Url = URL.createObjectURL(file2Blob);
      // const file2Link = document.createElement('a');
      // file2Link.href = file2Url;
      // file2Link.download = 'PhoneBook_2.xml';
      // file2Link.click();

      const data = {
         xmlString1: xmlString1,
         xmlString2: modifiedXmlString2,
      };

      // Отправка POST-запроса на сервер для сохранения файлов без запроса браузера о сохранении
      axios
         .post('http://localhost:8080/create-xml-files', data)
         .then((response) => {
            // console.log(response.data); // Успешное сообщение от сервера (выводится в консоль)
            setMessage({ message: t('files_saved'), color: 'success' });

            // Toggle the icon to "DoneIcon"
            setIcon('done');
            setTimeout(() => {
               setIcon('download'); // Change the icon back to "DownloadIcon" after xx miliseconds
            }, 3000);
         })
         .catch((error) => {
            console.error(error); // Сообщение об ошибке, если что-то пошло не так
            setMessage({ message: t('error_saving'), color: 'error' });
         });
   };

   return (
      <Tooltip title={t('convert_to_xml')} placement="left" arrow>
         <div style={{ marginLeft: '170px' }}>
            <IconButton className="btn-download" color="primary" onClick={handleConvert}>
               {icon === 'download' ? (
                  <DownloadIcon className="download-icon" />
               ) : (
                  <FileDownloadDoneIcon className="download-icon downloaded" />
               )}
            </IconButton>
         </div>
      </Tooltip>
   );
};

export default Converter;
