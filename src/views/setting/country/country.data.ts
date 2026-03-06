import { BasicColumn } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('country.code'),
    dataIndex: 'code',
    width: 200,
  },
  {
    title: t('country.name'),
    dataIndex: 'name',
    width: 200,
  },
  {
    title: t('country.createdDate'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
  },
  {
    title: t('country.createdBy'),
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 200,
  },
  {
    title: t('country.modifiedDate'),
    dataIndex: 'modifiedAt',
    key: 'modifiedAt',
    width: 200,
  },
  {
    title: t('country.modifiedBy'),
    dataIndex: 'modifiedBy',
    key: 'modifiedBy',
    width: 200,
  },
  {
    title: t('country.status'),
    dataIndex: 'status',
    align: 'center',
    width: 100,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.active') : t('common.inActive');
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const searchFormSchema: any = [
  {
    field: 'keySearch',
    label: t('country.search'),
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formEdit: any = [
  {
    field: 'id',
    label: t('country.id'),
    component: 'Input',
    show: false,
    colProps: { span: 24 },
  },
  {
    field: 'code',
    label: t('country.code'),
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
      };
    },
    colProps: { span: 24 },
  },
  {
    field: 'name',
    label: t('country.name'),
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'status',
    label: t('country.status'),
    component: 'ApiSelect',
    required: true,
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.active'), value: 1 },
        { label: t('common.inActive'), value: 0 },
      ],
    },
  },
  {
    field: 'isView',
    label: t('country.isView'),
    component: 'Input',
    show: false,
    colProps: { span: 24 },
  },
];
