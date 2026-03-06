import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, Card, Space, Modal } from 'ant-design-vue';
import VXETable from 'vxe-table';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Card).use(Space).use(Modal).use(Layout).use(VXETable);
}
