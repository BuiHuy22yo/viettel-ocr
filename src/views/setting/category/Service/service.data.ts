import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getAllDomain } from '@/api/setting/resources';
import { validatorCode } from '@/utils/helper/validatorForm';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'serviceCode',
    width: 160,
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'serviceName',
    width: 250,
  },
  {
    title: t('form.setting.domain'),
    dataIndex: 'businessDomainName',
    width: 250,
  },
  {
    width: 160,
     title: t('form.setting.createdDate'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
  },
  {
    width: 160,
    title: t('form.setting.createdBy'),
    dataIndex: 'createdBy',
  },
  {
    width: 160,
    title: t('form.setting.updatedDate'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    align: 'center',
  },
  {
    width: 160,
    title: t('form.setting.updatedBy'),
    dataIndex: 'updatedBy',
  },
  {
    width: 160,
    title: t('form.setting.status'),
    align: 'center',
    dataIndex: 'status',
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
    field: 'serviceCode',
    label: t('form.setting.code'),
    required: true,
    component: 'Input',
    rules: [
      {
        validator: async (_, value) => {
          return validatorCode(value);
        },
      },
    ],
  },
  {
    field: 'serviceName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
  },
  {
    field: 'businessDomainId',
    label: t('form.setting.domain'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getAllDomain,
      valueField: 'id',
      labelField: 'businessDomainName',
      resultField: 'body',
      params: {
        status: 1,
      },
    },
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
