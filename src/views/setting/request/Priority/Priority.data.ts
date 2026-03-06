import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';
import { removeVietnameseTones } from '@/utils/helper/validatorForm';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('serviceRequest.priority_setting.code'),
    dataIndex: 'code',
  },
  {
    title: t('serviceRequest.priority_setting.priority'),
    dataIndex: 'name',
  },
  {
    title: t('serviceRequest.priority_setting.description'),
    dataIndex: 'description',
  },
  {
    title: t('serviceRequest.priority_setting.createdAt'),
    align: 'center',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: t('serviceRequest.priority_setting.createdBy'),
    dataIndex: 'createdBy',
  },
  {
    title: t('serviceRequest.priority_setting.updatedAt'),
    align: 'center',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: t('serviceRequest.priority_setting.updatedBy'),
    dataIndex: 'updatedBy',
  },
  {
    title: t('serviceRequest.priority_setting.status'),
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
    label: t('serviceRequest.priority_setting.code'),
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
    label: t('serviceRequest.priority_setting.priority'),
    required: true,
    component: 'Input',
  },
  {
    label: t('serviceRequest.priority_setting.description'),
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      maxlength: 2000,
    },
  },
  {
    field: 'status',
    label: t('serviceRequest.priority_setting.status'),
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
