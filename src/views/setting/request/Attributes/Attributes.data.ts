import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';
import { getCAllGroupAttributes } from '@/api/setting/service-request';
import { removeVietnameseTones } from '@/utils/helper/validatorForm';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('serviceRequest.attribute_setting.code'),
    dataIndex: 'code',
  },
  {
    title: t('serviceRequest.attribute_setting.attribute'),
    dataIndex: 'name',
  },
  {
    title: t('serviceRequest.attribute_setting.description'),
    dataIndex: 'description',
  },
  {
    title: t('serviceRequest.groupAttribute_setting.groupAttribute'),
    dataIndex: 'name',
  },
  {
    title: t('serviceRequest.attribute_setting.createdAt'),
    align: 'center',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: t('serviceRequest.attribute_setting.createdBy'),
    dataIndex: 'createdBy',
  },
  {
    title: t('serviceRequest.attribute_setting.updatedAt'),
    align: 'center',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: t('serviceRequest.attribute_setting.updatedBy'),
    dataIndex: 'updatedBy',
  },
  {
    title: t('serviceRequest.attribute_setting.status'),
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
    field: 'code',
    label: t('serviceRequest.attribute_setting.code'),
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
    field: 'name',
    label: t('serviceRequest.attribute_setting.attribute'),
    required: true,
    component: 'Input',
  },
  {
    field: 'groupAttributeId',
    label: t('serviceRequest.attribute_setting.groupAttribute'),
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        api: getCAllGroupAttributes,
        valueField: 'id',
        labelField: 'name',
        resultField: 'body',
        params: {
          status: 1,
          type: 'SERVICE_REQUEST_ATTRIBUTE',
        },
      };
    },
  },
  {
    label: t('serviceRequest.attribute_setting.description'),
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      maxlength: 2000,
    },
  },
  {
    field: 'status',
    label: t('serviceRequest.attribute_setting.status'),
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
