import { createMask } from 'imask';

// Phone number formatting
// prettier-ignore
export const specialPrefixes = [
      '12', '13', '14', '15', '16', '17', '18', '22', '23', '24', '25', '29', '32', '33', '34', '35', '41', '42', '43', '44', '46', '48', '52', '54', '55', '56', '58', '59', '61', '62', '63', '65', '67', '68', '71', '74', '75', '76', '77', '81', '82', '83', '84', '85', '86', '87', '89', '91', '94', '95',
   ];

// Форматирование для таблицы
export const formatPhoneNumber = phoneNumber => {
  if (!phoneNumber) {
    return '';
  }
  // Проверка, начинается ли номер с одной из специальных комбинаций
  const isSpecialPrefix = specialPrefixes.some(prefix =>
    phoneNumber.startsWith(prefix)
  );

  if (isSpecialPrefix && phoneNumber.length > 3) {
    // Формат для номеров, начинающихся с специальных комбинаций (12) 345-67-89
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      5
    )}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7)}`;
  } else if (phoneNumber.length > 3) {
    // Формат для остальных номеров 123 или 123-456-789
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6)}`;
  } else {
    return phoneNumber;
  }
};

// Форматирование для инпутов

// export const phoneNumberMask = (phoneNumber) => {
//    if (phoneNumber.length <= 3) {
//       return '';
//    } else if (specialPrefixes.some((prefix) => phoneNumber.startsWith(prefix))) {
//       return '(99) 999-99-99';
//    } else {
//       return '999-999-999';
//    }
// };

export const phoneNumberMask = (phoneNumber = '') => {
  const digits = String(phoneNumber).replace(/\D/g, '');

  // dynamic masks array: internal (3-digit), landline, mobile
  const maskObj = createMask({
    mask: ['000', '(00) 000-00-00', '000-000-000'],
    lazy: false,
    placeholderChar: '_',
    dispatch: (appended, dynamicMasked) => {
      const newDigits = (dynamicMasked.value + appended).replace(/\D/g, '');
      if (newDigits.length <= 3) return dynamicMasked.compiledMasks[0];
      if (specialPrefixes.some(p => newDigits.startsWith(p)))
        return dynamicMasked.compiledMasks[1];
      return dynamicMasked.compiledMasks[2];
    },
  });

  // set initial value so mask matches current phone content
  if (digits) {
    maskObj.unmaskedValue = digits;
    try {
      maskObj.updateValue();
    } catch {
      // ignore if updateValue is not available in this version
    }
  }

  return maskObj;
};

// Возвращает строку с маской для отображения в таблице (показывает placeholder, если номер неполный)
export const maskedPhoneForDisplay = (phoneNumber = '') => {
  const digits = String(phoneNumber).replace(/\D/g, '');
  if (!digits) return '';
  const maskObj = phoneNumberMask(digits);
  // Ensure unmasked value is set (phoneNumberMask already does this, но на всякий случай)
  maskObj.unmaskedValue = digits;
  try {
    maskObj.updateValue();
  } catch {
    /* ignore */
  }
  return String(maskObj.value || digits);
};
