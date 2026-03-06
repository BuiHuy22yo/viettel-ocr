import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getAllGroupElement } from '@/api/setting/income';
import { removeVietnameseTones, validatorKey } from '@/utils/helper/validatorForm';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.elementKeyWord'),
    dataIndex: 'elementCode',
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'elementName',
  },
  {
    title: t('form.setting.elementGroup'),
    dataIndex: 'incomeElementGroupName',
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
    field: 'elementName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
    componentProps: ({ formModel }) => {
      return {
        onChange: (e) => {
          if (e.target?.value) {
            const text = removeVietnameseTones(e.target?.value) || '';
            formModel.elementCode = text.toUpperCase().replace(/\s+/g, '_');
          }
        },
      };
    },
  },
  {
    field: 'elementCode',
    label: t('form.setting.elementKeyWord'),
    rules: [
      {
        validator: async (_, value) => {
          return validatorKey(value);
        },
      },
    ],
    required: true,
    component: 'Input',
  },
  {
    field: 'incomeElementGroupId',
    label: t('form.setting.elementGroup'),
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        api: getAllGroupElement,
        valueField: 'id',
        labelField: 'groupName',
        resultField: 'body',
        params: {
          status: 1,
        },
      };
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
