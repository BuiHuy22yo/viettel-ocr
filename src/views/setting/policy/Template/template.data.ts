import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';
import { validatorCode } from '@/utils/helper/validatorForm';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('page.form.template.code'),
    dataIndex: 'code',
    width: 150,
  },
  {
    title: t('page.form.template.name'),
    dataIndex: 'name',
    width: 230,
  },
  {
    title: t('page.form.template.description'),
    dataIndex: 'description',
    width: 230,
  },
  {
    title: t('page.form.template.status'),
    dataIndex: 'status',
    width: 90,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Active' : 'InActive';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const formSchema: any = [
  {
    field: 'productName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
      };
    },
    colProps: { span: 12 },
  },
  {
    field: 'productCode',
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
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
      };
    },
    colProps: { span: 12 },
  },
  {
    label: t('form.setting.description'),
    field: 'description',
    component: 'InputTextArea',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        maxlength: 2000,
      };
    },
  },
  {
    field: 'status',
    label: t('form.setting.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        options: [
          { label: t('common.active'), value: 1 },
          { label: t('common.inActive'), value: 0 },
        ],
      };
    },
  },
  {
    field: 'attribute',
    labelWidth: 300,
    slot: 'addAttribute',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'isView',
    component: 'Checkbox',
    label: 'isView',
    show: false,
  },
];
