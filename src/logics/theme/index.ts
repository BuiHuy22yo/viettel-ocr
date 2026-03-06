import { setCssVar } from '@/logics/theme/util';

const THEME_COLOR = '--theme-color';
export async function changeTheme(_color: string) {
  setCssVar(THEME_COLOR, _color);
}
