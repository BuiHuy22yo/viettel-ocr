import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';
import { removeVietnameseTones } from '@/utils/helper/validatorForm';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('page.form.extraData.code'),
    dataIndex: 'code',
  },
  {
    title: t('page.form.extraData.name'),
    dataIndex: 'name',
  },
  {
    title: t('page.form.extraData.description'),
    dataIndex: 'description',
  },
  {
    title: t('page.form.extraData.createdAt'),
    align: 'center',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: t('page.form.extraData.createdBy'),
    dataIndex: 'createdBy',
  },
  {
    title: t('page.form.extraData.updatedAt'),
    align: 'center',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: t('page.form.extraData.updatedBy'),
    dataIndex: 'updatedBy',
  },
  {
    title: t('page.form.extraData.status'),
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Active' : 'InActive';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('page.form.extraData.name'),
    required: true,
    component: 'Input',
    componentProps: ({ formModel }) => {
      return {
        onChange: (e) => {
          if (e.target?.value) {
            const text = removeVietnameseTones(e.target?.value) || '';
            formModel.code = text.toUpperCase().replace(/\s+/g, '_');
          }
        },
      };
    },
  },
  {
    field: 'code',
    label: t('page.form.extraData.code'),
    required: true,
    component: 'Input',
  },
  {
    field: 'type',
    label: t('form.setting.type'),
    component: 'ApiSelect',
    componentProps: {
      options: [
        { label: t('common.attribute'), value: 'ATTRIBUTE' },
        { label: t('common.table'), value: 'TABLE' },
      ],
    },
  },
  {
    label: t('page.form.extraData.description'),
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      maxlength: 2000,
    },
  },
  {
    field: 'status',
    label: t('page.form.extraData.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: 'Active', value: 1 },
        { label: 'InActive', value: 0 },
      ],
    },
  },
];
