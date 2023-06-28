import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ message, color }) {
   const [open, setOpen] = React.useState(false);

   React.useEffect(() => {
      if (message) {
         setOpen(true); // Open the Snackbar when a message is set
      }
   }, [message]);

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <Snackbar
         open={open}
         autoHideDuration={5000}
         onClose={handleClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
         <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
            {message}
         </Alert>
      </Snackbar>
   );
}
