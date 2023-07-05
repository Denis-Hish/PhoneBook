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

      const groupsXml1 = {};
      const uniqueGroups = new Set();

      const xml2 = create({ version: '1.0', encoding: 'UTF-8' }).ele('root_group');

      const xml2Contacts = create().ele('root_contact');

      contacts.forEach((contact) => {
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
            Phone1: phoneNumber1,
            Phone2: phoneNumber2,
            Phone3: phoneNumber3,
            default_photo: 'Resource:',
         });

         xml2Contacts.ele('contact', {
            display_name: userName,
            office_number: phoneNumber1,
            mobile_number: phoneNumber2,
            other_number: phoneNumber3,
            line: '0',
            ring: 'Auto',
            group_id_name: group,
         });
      });

      Object.values(groupsXml1).forEach((group) => group.up());

      const xmlString1 = xml1.end({ prettyPrint: true });
      const xmlString2 = xml2.end({ prettyPrint: true }) + xml2Contacts.end({ prettyPrint: true });

      // Удаление строки '<?xml version="1.0"?>' из xmlString2
      const modifiedXmlString2 = xmlString2.replace('<?xml version="1.0"?>', '');

      // Сохраняем xmlString1 в файл file1.xml
      const file1Blob = new Blob([xmlString1], { type: 'text/xml' });
      const file1Url = URL.createObjectURL(file1Blob);
      const file1Link = document.createElement('a');
      file1Link.href = file1Url;
      file1Link.download = 'PhoneBook_1_Yealink.xml';
      file1Link.click();

      // Сохраняем xmlString2 в файл file2.xml
      const file2Blob = new Blob([modifiedXmlString2], { type: 'text/xml' });
      const file2Url = URL.createObjectURL(file2Blob);
      const file2Link = document.createElement('a');
      file2Link.href = file2Url;
      file2Link.download = 'PhoneBook_2.xml';
      file2Link.click();
   };

   return (
      <Button variant="outlined" color="primary" onClick={handleConvert}>
         Convert to xml
      </Button>
   );
};

export default Converter;
