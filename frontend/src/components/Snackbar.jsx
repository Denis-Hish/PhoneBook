import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import { registerCallback } from '../utils/snackbarUtils';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    registerCallback(setMessage);
  }, []);

  React.useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    // Даем время для завершения анимации, затем очищаем message
    setTimeout(() => {
      setMessage(null);
    }, 500); // 500ms - время для завершения анимации Slide
  };

  function Transition(props) {
    return <Slide {...props} direction='right' />;
  }

  // Не рендерим Snackbar если нет сообщения
  if (!message) {
    return null;
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
