import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.name'),
    dataIndex: 'templateName',
  },
  {
     title: t('form.setting.createdDate'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
  },
  {
    title: t('form.setting.createdBy'),
    dataIndex: 'createdBy',
  },
  {
    title: t('form.setting.updatedDate'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    align: 'center',
  },
  {
    title: t('form.setting.updatedBy'),
    dataIndex: 'updatedBy',
  },
  {
    title: t('form.setting.status'),
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.active') : t('common.inActive');
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const formSchema: any = [
  {
    field: 'name',
    label: 'Name',
    required: true,
    component: 'Input',
  },
  {
    label: 'Description',
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      maxlength: 2000,
    },
  },
  {
    field: 'ConfigTemplate',
    label: 'ConfigTemplate',
    slot: 'ConfigTemplate',
  },
];
