import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';
import { getAllTemplateExtraData } from '@/api/setting/template';
import { removeVietnameseTonesAndFormat } from '@/utils/helper/validatorForm';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('page.form.extraDataDetail.code'),
    dataIndex: 'code',
  },
  {
    title: t('page.form.extraDataDetail.name'),
    dataIndex: 'name',
  },
  {
    title: t('page.form.extraDataDetail.description'),
    dataIndex: 'description',
  },
  {
    title: t('page.form.extraDataDetail.createdAt'),
    align: 'center',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: t('page.form.extraDataDetail.createdBy'),
    dataIndex: 'createdBy',
  },
  {
    title: t('page.form.extraDataDetail.updatedAt'),
    align: 'center',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: t('page.form.extraDataDetail.updatedBy'),
    dataIndex: 'updatedBy',
  },
  {
    title: t('page.form.extraDataDetail.status'),
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
    label: t('page.form.extraDataDetail.name'),
    required: true,
    component: 'Input',
    componentProps: ({ formModel }) => {
      return {
        onChange: (e) => {
          if (e.target?.value) {
            const text = removeVietnameseTonesAndFormat(e.target?.value) || '';
            formModel.code = text.toUpperCase().replace(/\s+/g, '_');
          }
        },
      };
    },
  },
  {
    field: 'code',
    label: t('page.form.extraDataDetail.code'),
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
    field: 'extraDataId',
    label: t('page.form.extraDataDetail.extraDataId'),
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        api: getAllTemplateExtraData,
        valueField: 'id',
        labelField: 'name',
        resultField: 'body',
        params: {
          status: 1,
        },
      };
    },
  },
  {
    label: t('page.form.extraDataDetail.description'),
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      maxlength: 2000,
    },
  },
  {
    field: 'status',
    label: t('page.form.extraDataDetail.status'),
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
export const validatorCode = (value: string) => {
  // Kiểm tra xem chuỗi chỉ chứa chữ, số và dấu gạch dưới
  if (!/^[0-9A-Z_]*$/i.test(value)) {
    return Promise.reject(new Error('Chỉ được phép nhập chữ, số và dấu gạch dưới.'));
  }

  // Kiểm tra ký tự cuối cùng không phải là số
  if (/\d$/.test(value)) {
    return Promise.reject(new Error('Ký tự cuối cùng không được là số.'));
  }

  return Promise.resolve();
};
