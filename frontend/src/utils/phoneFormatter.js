// набор префиксов для городских номеров
// prettier-ignore
const LANDLINE_PREFIXES = new Set([
	'12', '13', '14', '15', '16', '17', '18', '22', '23', '24', '25', '29', '32', '33', '34', '35', '41', '42', '43', '44', '46', '48', '52', '54', '55', '56', '58', '59', '61', '62', '63', '65', '67', '68', '71', '74', '75', '76', '77', '81', '82', '83', '84', '85', '86', '87', '89', '91', '94', '95',
]);

/**
 * Форматирует номер телефона для отображения
 * @param {string|number} phone - номер телефона (только цифры)
 * @returns {string} - отформатированный номер
 *
 * Форматы:
 * - Внутренний (до 3 цифр): 000
 * - Городской (префикс в LANDLINE_PREFIXES): (00) 000-00-00
 * - Мобильный: 000-000-000
 */
export const formatPhoneNumber = phone => {
  if (!phone) return '';

  // Убираем все нецифровые символы
  const digitsOnly = phone.toString().replace(/\D/g, '');

  if (!digitsOnly) return '';

  // Внутренний номер (до 3 цифр)
  if (digitsOnly.length <= 3) {
    return digitsOnly;
  }

  // Проверяем префикс для городского номера
  const prefix = digitsOnly.slice(0, 2);

  if (LANDLINE_PREFIXES.has(prefix)) {
    // Городской: (00) 000-00-00
    const part1 = digitsOnly.slice(0, 2);
    const part2 = digitsOnly.slice(2, 5);
    const part3 = digitsOnly.slice(5, 7);
    const part4 = digitsOnly.slice(7, 9);

    let result = `(${part1})`;
    if (part2) result += ` ${part2}`;
    if (part3) result += `-${part3}`;
    if (part4) result += `-${part4}`;

    return result;
  } else {
    // Мобильный: 000-000-000
    const part1 = digitsOnly.slice(0, 3);
    const part2 = digitsOnly.slice(3, 6);
    const part3 = digitsOnly.slice(6, 9);

    let result = part1;
    if (part2) result += `-${part2}`;
    if (part3) result += `-${part3}`;

    return result;
  }
};

export { LANDLINE_PREFIXES };
