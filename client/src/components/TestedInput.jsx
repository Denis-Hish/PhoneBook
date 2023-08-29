import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import InputMask from 'react-input-mask';
import { phoneNumberMask } from './PhonesCodes';

const TestedInput = () => {
   const [phoneNumber, setPhoneNumber] = useState('');

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(phoneNumber);
   };

   // console.log(phoneNumberMask(phoneNumber));

   return (
      <form onSubmit={handleSubmit}>
         <TextField
            autoComplete="off"
            className="test"
            variant="standard"
            label="Phone Number"
            InputProps={{
               inputComponent: InputMask,
               inputProps: {
                  mask: phoneNumberMask(phoneNumber),
                  onChange: (e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, '')),
                  value: phoneNumber,
                  maskPlaceholder: '',
               },
            }}
         />
         <Button type="submit">Submit</Button>
      </form>
   );
};

export default TestedInput;
