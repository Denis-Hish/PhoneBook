import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

// Wrapper to forward ref to IMaskInput's inputRef so MUI receives an HTMLInputElement ref
const IMaskCustom = forwardRef(function IMaskCustom(props, ref) {
  const { onAccept, onChange, name, ...other } = props;

  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      onAccept={(value, mask) => {
        const digitsOnly = String(value).replace(/\D/g, '');
        if (typeof onAccept === 'function') {
          onAccept(digitsOnly, mask);
        }
        if (typeof onChange === 'function') {
          // emulate native event for MUI handlers and provide unmasked digits only
          onChange({ target: { name, value: digitsOnly } });
        }
      }}
    />
  );
});

export default IMaskCustom;
