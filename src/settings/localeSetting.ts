import type { DropMenu } from '../components/Dropdown';
import type { LocaleSetting, LocaleType } from '#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  MY_MM: 'my_MM',
  EN_US: 'en',
  VI_VN: 'vi_VN',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.EN_US,
  // Default locale
  fallback: LOCALE.EN_US,
  // available Locales
  availableLocales: [LOCALE.EN_US, LOCALE.VI_VN],
};

// locale list
export const localeList: DropMenu[] = [
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
  {
    text: 'Vietnamese',
    event: LOCALE.VI_VN,
  },
  // {
  //   text: 'Myanmar',
  //   event: LOCALE.MY_MM,
  // },
];
