import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { validatorCode } from '@/utils/helper/validatorForm';
import { useI18n } from '@/hooks/web/useI18n';
import { getAllVariantGroupAttribute } from '@/api/setting/service-product';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'attributeCode',
    width: 160,
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'attributeName',
    width: 300,
  },
  {
    title: t('form.setting.variantGroupAttribute'),
    dataIndex: 'variantGroupName',
    width: 300,
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
    field: 'attributeCode',
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
    field: 'attributeName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
  },
  {
    field: 'variantGroupId',
    label: t('form.setting.groupAttributeVariant'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: getAllVariantGroupAttribute,
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
