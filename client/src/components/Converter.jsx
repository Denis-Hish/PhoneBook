import React from 'react';
import Button from '@mui/material/Button';
import { getAllContacts } from '../services/paramsAPI';
import { create } from 'xmlbuilder2';

const Converter = () => {
   const handleConvert = async () => {
      const contacts = await getAllContacts();

      const xml1 = create({ version: '1.0', encoding: 'UTF-8' })
         .ele('YealinkIPPhoneBook')
         .ele('Title')
         .txt('Yealink')
         .up();

      const xml2 = create({ version: '1.0', encoding: 'UTF-8' })
         .ele('root_group')
         .ele('group', { display_name: 'All Contacts', ring: 'Auto' })
         .up();

      const groupsXml1 = {};

      contacts.forEach((contact) => {
         const { userName, phoneNumber1, phoneNumber2, phoneNumber3, group } = contact;

         if (!groupsXml1[group]) {
            groupsXml1[group] = xml1.ele('Menu', { Name: group });
         }

         groupsXml1[group].ele('Unit', {
            Name: userName,
            Phone1: phoneNumber1,
            Phone2: phoneNumber2,
            Phone3: phoneNumber3,
            default_photo: 'Resource:',
         });

         xml2
            .ele('group', { display_name: group, ring: 'Auto' })
            .ele('contact', {
               display_name: userName,
               office_number: phoneNumber1,
               mobile_number: phoneNumber2,
               other_number: phoneNumber3,
               line: '0',
               ring: 'Auto',
               group_id_name: group,
            })
            .up();
      });

      Object.values(groupsXml1).forEach((group) => group.up());

      const xmlString1 = xml1.end({ prettyPrint: true });
      const xmlString2 = xml2.end({ prettyPrint: true });

      // Сохраняем xmlString1 в файл file1.xml
      const file1Blob = new Blob([xmlString1], { type: 'text/xml' });
      const file1Url = URL.createObjectURL(file1Blob);
      const file1Link = document.createElement('a');
      file1Link.href = file1Url;
      file1Link.download = 'TEST_file1.xml';
      file1Link.click();

      // Сохраняем xmlString2 в файл file2.xml
      const file2Blob = new Blob([xmlString2], { type: 'text/xml' });
      const file2Url = URL.createObjectURL(file2Blob);
      const file2Link = document.createElement('a');
      file2Link.href = file2Url;
      file2Link.download = 'TEST_file2.xml';
      file2Link.click();
   };

   return (
      <Button variant="outlined" color="error" onClick={handleConvert}>
         Convert to xml
      </Button>
   );
};

export default Converter;
