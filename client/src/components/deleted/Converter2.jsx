import React from 'react';
import Button from '@mui/material/Button';
import { getAllContacts } from '../../services/paramsAPI';
import { create } from 'xmlbuilder2';

const Converter2 = () => {
   const handleConvert = async () => {
      const contacts = await getAllContacts();

      const xml2 = create({ version: '1.0', encoding: 'UTF-8' }).ele('root_group');

      const xml2Contacts = create().ele('root_contact');

      const uniqueGroups = new Set();

      // Sorted group
      const sortedGroups = [...new Set(contacts.map((contact) => contact.group))].sort();

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

      // Sort contacts by group and add to XML structures
      sortedGroups.forEach((group) => {
         if (!uniqueGroups.has(group)) {
            xml2.ele('group', { display_name: group, ring: 'Auto' });
            uniqueGroups.add(group);
         }
      });

      const xmlString2 = xml2.end({ prettyPrint: true }) + xml2Contacts.end({ prettyPrint: true });

      // Remove the '<?xml version="1.0"?>' string from xmlString2
      const modifiedXmlString2 = xmlString2.replace('<?xml version="1.0"?>', '');

      // Save xmlString2 to file file2.xml
      const file2Blob = new Blob([modifiedXmlString2], { type: 'text/xml' });
      const file2Url = URL.createObjectURL(file2Blob);
      const file2Link = document.createElement('a');
      file2Link.href = file2Url;
      file2Link.download = 'PhoneBook_2.xml';
      file2Link.click();
   };

   return (
      <Button variant="outlined" color="primary" onClick={handleConvert}>
         Convert to XML-2
      </Button>
   );
};

export default Converter2;
