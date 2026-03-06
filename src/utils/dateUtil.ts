/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT2 = 'DD/MM/YYYY';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  if (date) {
    return dayjs(date).format(format);
  }
  return '';
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  if (date) {
    return dayjs(date).format(format);
  }
  return '';
}

export function dateToString(date?: dayjs.Dayjs, format = DATE_FORMAT2): string {
  if (date) {
    return date.format(format);
  }

  return '';
}

export function diffDate(
  firstDateStr?: string,
  secondDateStr?: string,
  format = DATE_FORMAT2,
): number {
  if (!firstDateStr || !secondDateStr) return NaN;

  const firstDate = dayjs(firstDateStr, format);
  const secondDate = dayjs(secondDateStr, format);
  return firstDate.diff(secondDate, 'day');
}
export function formatToDateddmmyyyy(date?: dayjs.ConfigType, format = DATE_FORMAT2): string {
  if (date) {
    return dayjs(date).format(format);
  }
  return '';
}
export const dateUtil = dayjs;
