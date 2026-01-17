import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { LANDLINE_PREFIXES } from '../utils/phoneFormatter';

// React IMask wrapper, возвращает только цифры для сохранения в БД
const PhoneMaskedInput = forwardRef(function PhoneMaskedInput(props, ref) {
  // dispatch — выбирает маску на основе текущих цифр
  const dispatch = function (appended, dynamicMasked) {
    // dynamicMasked.compiledMasks содержит шаблоны; unmaskedValue = только цифры
    const value = dynamicMasked.unmaskedValue + appended;
    const digitsOnly = value.replace(/\D/g, '');
    
    // если длина <= 3 — короткий внутренний номер
    if (!digitsOnly) return dynamicMasked.compiledMasks[2]; // index 2 -> '000' fallback
    if (digitsOnly.length <= 3) return dynamicMasked.compiledMasks[2];

    const p2 = digitsOnly.slice(0, 2);
    if (LANDLINE_PREFIXES.has(p2)) {
      return dynamicMasked.compiledMasks[0]; // (00) 000-00-00
    }
    return dynamicMasked.compiledMasks[1]; // 000-000-000
  };

  return (
    <IMaskInput
      {...props}
      // список масок: индекс 0 = landline, 1 = mobile, 2 = internal
      mask={[
        { mask: '(00) 000-00-00' },
        { mask: '000-000-000' },
        { mask: '000' },
      ]}
      // функция выбора маски
      dispatch={dispatch}
      inputRef={ref}
      // НЕ передаём onChange в IMaskInput - он конфликтует с onAccept
      onChange={undefined}
      // onAccept принимает (value, mask) - value это отформатированная строка, mask.unmaskedValue - только цифры
      onAccept={(value, mask) => {
        // mask.unmaskedValue содержит ТОЛЬКО цифры без форматирования
        const digitsOnly = (mask.unmaskedValue || '').toString().slice(0, 9);
        // console.log('PhonesMask onAccept - formatted:', value, 'unmasked:', mask.unmaskedValue, 'digitsOnly:', digitsOnly);
        // Вызываем родительский onChange с только цифрами
        if (props.onChange) {
          props.onChange({
            target: { 
              name: props.name, 
              value: digitsOnly
            },
          });
        }
      }}
    />
  );
});

export default PhoneMaskedInput;
