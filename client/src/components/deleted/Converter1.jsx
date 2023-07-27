import React from 'react';
import Button from '@mui/material/Button';
import { getAllContacts } from '../../services/paramsAPI';
import { create } from 'xmlbuilder2';

const Converter1 = () => {
   const handleConvert = async () => {
      const contacts = await getAllContacts();

      const xml1 = create({ version: '1.0', encoding: 'UTF-8' })
         .ele('YealinkIPPhoneBook')
         .ele('Title')
         .txt('Yealink')
         .up();

      const groupsXml1 = {};
      const uniqueGroups = new Set();

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

      Object.values(groupsXml1).forEach((group) => group.up());

      const xmlString1 = xml1.end({ prettyPrint: true });

      // Save xmlString1 to file file1.xml
      const file1Blob = new Blob([xmlString1], { type: 'text/xml' });
      const file1Url = URL.createObjectURL(file1Blob);
      const file1Link = document.createElement('a');
      file1Link.href = file1Url;
      file1Link.download = 'PhoneBook_1_Yealink.xml';
      file1Link.click();
   };

   return (
      <Button variant="outlined" color="primary" onClick={handleConvert}>
         Convert to XML-1
      </Button>
   );
};

export default Converter1;
