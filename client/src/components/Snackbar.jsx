import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { addContact } from '../services/paramsAPI';

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
   const [state, setState] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
   });
   const { vertical, horizontal, open } = state;

   const handleClick = (newState) => () => {
      setState({ ...newState, open: true });
   };

   const handleClose = () => {
      setState({ ...state, open: false });
   };

   return (
      <>
         <Button variant="outlined" onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
            Snackbar
         </Button>

         <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="I love snacks"
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
         >
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
               This is a success message!
            </Alert>
         </Snackbar>
      </>
   );
}
