let setMessageCallback;

export const setMessage = ({ message, color }) => {
  if (setMessageCallback) {
    setMessageCallback({ message, color });
  }
};

export const registerCallback = (callback) => {
  setMessageCallback = callback;
};
