import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/ms_MY';

const modules = import.meta.glob('./vi-VN/**/*.ts', { eager: true });
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'vi-VN'),
    antdLocale,
  },
};
