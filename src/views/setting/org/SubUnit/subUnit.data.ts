import { BasicColumn, FormSchema } from '@/components/Table';
import { getAllUnit } from '@/api/setting/org';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { validatorCode } from '@/utils/helper/validatorForm';
import { getAllStaff } from '@/api/staff';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'subUnitCode',
    width: 150,
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'subUnitName',
    width: 250,
  },
  {
    title: t('form.setting.unit'),
    dataIndex: 'unitName',
    width: 350,
  },
  {
    title: t('form.setting.createdBy'),
    dataIndex: 'createdBy',
    width: 150,
  },
  {
    title: t('form.setting.updatedDate'),
    dataIndex: 'updatedAt',
    width: 150,
    key: 'updatedAt',
  },
  {
    title: t('form.setting.updatedBy'),
    dataIndex: 'updatedBy',
    width: 150,
  },
  {
    title: t('form.setting.status'),
    dataIndex: 'status',
    align: 'center',
    width: 150,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.active') : t('common.inActive');
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'subUnitCode',
    label: t('form.setting.code'),
    required: true,
    component: 'Input',
    componentProps: {
      maxlength: 50,
    },
    rules: [
      {
        validator: async (_, value) => {
          return validatorCode(value);
        },
      },
    ],
  },
  {
    field: 'subUnitName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
    componentProps: {
      maxlength: 250,
    },
  },
  {
    field: 'unitId',
    label: t('form.setting.unit'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: getAllUnit,
        valueField: 'id',
        labelField: 'unitName',
        resultField: 'body',
        params: {
          status: 1,
        },
        onChange: () => {
          formModel.staffId = undefined;
        },
      };
    },
  },
  {
    field: 'staffId',
    label: t('form.setting.staffName'),
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: getAllStaff,
        valueField: 'id',
        labelField: 'staffName',
        resultField: 'body',
        params: { status: 1, unitId: formModel.unitId },
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
