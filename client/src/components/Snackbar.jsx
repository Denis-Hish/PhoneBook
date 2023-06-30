import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ message, color }) {
   const [open, setOpen] = React.useState(false);
   const [transition, setTransition] = React.useState(undefined);

   React.useEffect(() => {
      if (message) {
         setOpen(true); // Open the Snackbar when a message is set
         setTransition(() => Transition);
      }
   }, [message]);

   const handleClose = () => {
      setOpen(false);
   };

   function Transition(props) {
      return <Slide {...props} direction="right" />;
   }

   return (
      <Snackbar
         open={open}
         autoHideDuration={6000}
         onClose={handleClose}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
         TransitionComponent={transition}
      >
         <Alert className="snackbar" onClose={handleClose} severity={color} sx={{ width: '100%' }}>
            {message}
         </Alert>
      </Snackbar>
   );
}

//* const [message, setMessage] = useState(null); // Snackbar message

//* Вместо Alert ->
//*   setMessage({
//*      message: `Contact ${contact.userName} deleted successfully`,
//*      color: 'info',
//*   });

//* Компонент:
//* {message && <Snackbar {...message} />}

/// Цвета:
//* severity="success" - зелёный
//! severity="error" - красный
/// severity="warning" - жёлтый
//? severity="info" - синий
