import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.name'),
    dataIndex: 'name',
  },
  {
    title: t('form.setting.description'),
    dataIndex: 'description',
  },
  {
    title: t('form.setting.createdDate'),
    dataIndex: 'createdAt',
    align: 'center',
    key: 'createdAt',
  },
  {
    title: t('form.setting.createdBy'),
    dataIndex: 'createdBy',
  },
  {
    title: t('form.setting.updatedDate'),
    dataIndex: 'updatedAt',
    align: 'center',
    key: 'updatedAt',
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

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
  },

  {
    label: t('form.setting.description'),
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      maxlength: 2000,
    },
  },
  {
    field: 'status',
    label: t('form.setting.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.active'), value: 1 },
        { label: t('common.inActive'), value: 0 },
      ],
    },
  },
];
