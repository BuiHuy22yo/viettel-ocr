/**
 * Converts a number to a formatted string with 2 decimal places
 * @param value - The number to format
 * @returns Formatted string with 2 decimal places and thousands separator
 */
export function convertNumber(value: number | string): string {
  // Handle non-numeric values
  if (value === null || value === undefined || value === '') {
    return '0';
  }

  // Convert to number if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(numValue)) {
    return '0';
  }

  // Format with exactly 2 decimal places and thousands separator
  return parseFloat(numValue.toFixed(2)).toLocaleString('en-US');
}

/**
 * Converts a number to a formatted string with specified decimal places
 * @param value - The number to format
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @param defaultValue - Value to return if input is invalid (default: '0')
 * @returns Formatted string with specified decimal places and thousands separator
 */
/**
 * Converts a number to a fixed decimal precision number (not string)
 * @param value - The number to convert
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns Number with fixed decimal precision
 */
export function toFixedNumber(value: number | string, decimalPlaces: number = 2): number {
  // Handle non-numeric values
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  // Convert to number if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(numValue)) {
    return 0;
  }

  // Return number with fixed decimal places
  return parseFloat(numValue.toFixed(decimalPlaces));
}

export function convertNumberWithDecimalPlaces(
  value: number | string,
  decimalPlaces: number = 2,
  defaultValue: string = '0',
): string {
  // Handle non-numeric values
  if (value === null || value === undefined || value === '') {
    return defaultValue;
  }

  // Convert to number if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(numValue)) {
    return defaultValue;
  }

  // Format with specified decimal places and thousands separator
  return parseFloat(numValue.toFixed(decimalPlaces)).toLocaleString('en-US');
}
