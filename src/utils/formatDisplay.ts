import { isNullOrEmpty } from '@/utils/is';

export function convertNumber(input: string | number) {
  return convertNumberWithDefaultValue(input, '');
}

export function convertNumberWithDefaultValue(
  input: string | number,
  defaultValue: number | string,
) {
  const number = parseFloat(input);
  if (isNaN(number)) {
    return defaultValue;
  }
  if (number % 1 !== 0) {
    return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  } else {
    return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
}

export function convertNumberV2(input: string | number) {
  return convertNumberWithDefaultValueV2(input, '');
}

export function convertNumberWithDefaultValueV2(
  input: string | number,
  defaultValue: number | string,
) {
  const number = parseFloat(input);
  if (isNaN(number)) {
    return defaultValue;
  }
  return new Intl.NumberFormat('en-US').format(number);
}
export function formatNumber(value, fractionDigits: number): string {
  if (typeof value !== 'number') return '0';
  let formattedValue = value.toLocaleString('en-US');
  if (value % 1 !== 0) {
    formattedValue = parseFloat(
      value.toFixed(isNullOrEmpty(fractionDigits) ? 0 : fractionDigits),
    ).toLocaleString('en-US');
  }
  return formattedValue;
}
