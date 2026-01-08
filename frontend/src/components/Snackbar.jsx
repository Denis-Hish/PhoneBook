import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

let setMessageCallback;

export const setMessage = ({ message, color }) => {
  if (setMessageCallback) {
    setMessageCallback({ message, color });
  }
};

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    setMessageCallback = setMessage;
  }, []);

  React.useEffect(() => {
    if (message) {
      setOpen(true); // Open the Snackbar when a message is set
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
  };

  function Transition(props) {
    return <Slide {...props} direction='right' />;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      slots={{ transition: Transition }}
    >
      <Alert
        className='snackbar'
        onClose={handleClose}
        severity={message?.color}
        sx={{ width: '100%' }}
      >
        {message?.message}
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
