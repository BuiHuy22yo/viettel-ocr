import { useI18n } from '@/hooks/web/useI18n';
import { isEmpty } from 'lodash-es';
import { isNullOrEmpty } from '@/utils/is';

const { t } = useI18n();
export const validatorPhone = (value: string) => {
  if (!/^\d+$/.test(value) && !isEmpty(value)) {
    return Promise.reject(t('common.validators.phoneNumber'));
  }
  return Promise.resolve();
};

export const validatorCode = (value: string) => {
  // if (!/^[0-9A-Z_.]*$/i.test(value)) {
  //   return Promise.reject(t('common.validators.code'));
  // }
  return Promise.resolve();
};

export const validatorKey = (value: string) => {
  // if (!/^[0-9A-Z_]*$/i.test(value)) {
  //   return Promise.reject(t('common.validators.code'));
  // }
  return Promise.resolve();
};

export const removeVietnameseTones = (str: string) => {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return str;
};

export const removeVietnameseTonesAndFormat = (str: string) => {
  // Remove Vietnamese tones
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');

  // Convert to uppercase
  str = str.toUpperCase();

  // Replace spaces with underscores
  str = str.replace(/\s+/g, '_');

  // Remove special characters
  str = str.replace(/[^a-zA-Z0-9_]/g, '');

  // Remove last character if it is a number
  if (/\d$/.test(str)) {
    str = str.slice(0, -1);
  }

  return str;
};
export const validatorNumber = (input: string, min: number, fixed: number) => {
  if (isNullOrEmpty(input)) {
    return input;
  }
  if (!isNullOrEmpty(min)) {
    if (!(input && input >= min)) {
      return '';
    }
  }
  if (!isNullOrEmpty(fixed)) {
    return parseFloat(input.toFixed(fixed));
  }
  return input;
};

export const validatorEmail = (value: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(value) && !isEmpty(value)) {
    return Promise.reject(t('common.validators.email'));
  }
  return Promise.resolve();
};
