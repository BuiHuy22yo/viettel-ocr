import { BasicColumn } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { searchCountry } from "@/api/setting/country";

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('manufacturer.code'),
    dataIndex: 'code',
    width: 200,
  },
  {
    title: t('manufacturer.name'),
    dataIndex: 'name',
    width: 200,
  },
  {
    title: t('manufacturer.countryName'),
    dataIndex: 'countryName',
    width: 200,
  },
  {
    title: t('manufacturer.createdDate'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
  },
  {
    title: t('manufacturer.createdBy'),
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 200,
  },
  {
    title: t('manufacturer.modifiedDate'),
    dataIndex: 'modifiedAt',
    key: 'modifiedAt',
    width: 200,
  },
  {
    title: t('manufacturer.modifiedBy'),
    dataIndex: 'modifiedBy',
    key: 'modifiedBy',
    width: 200,
  },
  {
    title: t('manufacturer.status'),
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
    label: t('manufacturer.search'),
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
    label: t('manufacturer.code'),
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
    label: t('manufacturer.name'),
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'countryId',
    label: t('manufacturer.countryName'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: searchCountry,
      valueField: 'id',
      labelField: 'name',
      resultField: 'result',
      params: {},
    },
  },
  {
    field: 'status',
    label: t('manufacturer.status'),
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
