// Phone number formatting
// prettier-ignore
export const specialPrefixes = [
  '12', '13', '14', '15', '16', '17', '18', '22', '23', '24', '25', '29',
  '32', '33', '34', '35', '41', '42', '43', '44', '46', '48', '52', '54',
  '55', '56', '58', '59', '61', '62', '63', '65', '67', '68', '71', '74',
  '75', '76', '77', '81', '82', '83', '84', '85', '86', '87', '89', '91',
  '94', '95',
];

// Форматирование для таблицы
export const formatPhoneNumber = (phoneNumber = '') => {
  const digits = phoneNumber.replace(/\D/g, '');
  if (digits.length <= 3) return digits;

  const isSpecial = specialPrefixes.some(prefix => digits.startsWith(prefix));

  if (isSpecial) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(
      5,
      7
    )}-${digits.slice(7)}`;
  } else {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
};

// Форматирование для инпутов
export const phoneMaskOptions = {
  mask: [
    { mask: '' }, // для <=3 цифр — без маски
    { mask: '000-000-000' }, // мобильный
    { mask: '(00) 000-00-00' }, // стационарный
  ],
  dispatch: (appended, dynamicMasked) => {
    const digits = (dynamicMasked.value + appended).replace(/\D/g, '');
    if (digits.length <= 3) return dynamicMasked.compiledMasks[0];
    if (specialPrefixes.some(p => digits.startsWith(p)))
      return dynamicMasked.compiledMasks[2];
    return dynamicMasked.compiledMasks[1];
  },
};
