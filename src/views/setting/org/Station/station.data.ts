import { BasicColumn, FormSchema } from '@/components/Table';
import { getAllCompany, getAllDivision } from '@/api/setting/org';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { validatorCode } from '@/utils/helper/validatorForm';
import { useI18n } from '@/hooks/web/useI18n';
import { getAllStaff } from '@/api/staff';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'code',
    align: 'left',
    width: 200,
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'name',
    align: 'left',
    width: 200,
  },
  {
    title: t('form.setting.company'),
    dataIndex: 'companyName',
    align: 'left',
    width: 300,
  },
  {
    title: t('form.setting.division'),
    dataIndex: 'divisionName',
    align: 'left',
    width: 200,
  },
  {
    title: t('form.setting.location'),
    dataIndex: 'location',
    align: 'left',
    width: 200,
  },
  {
    title: t('form.setting.createdDate'),
    dataIndex: 'createdAt',
    align: 'center',
    width: 150,
  },
  {
    title: t('form.setting.createdBy'),
    dataIndex: 'createdBy',
    align: 'left',
    width: 150,
  },
  {
    title: t('form.setting.updatedDate'),
    dataIndex: 'modifiedAt',
    align: 'center',
    width: 150,
    key: 'updatedAt',
  },
  {
    title: t('form.setting.updatedBy'),
    dataIndex: 'modifiedBy',
    align: 'left',
    width: 150,
  },
  {
    title: t('form.setting.status'),
    dataIndex: 'status',
    align: 'left',
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
    field: 'code',
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
    field: 'name',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
  },
  {
    field: 'companyId',
    label: t('form.setting.company'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getAllCompany,
        valueField: 'id',
        labelField: 'companyName',
        resultField: 'body',
        params: {
          status: 1,
        },
        onChange: (val) => {
          formModel.divisionId = null;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'divisionId',
            label: t('form.setting.division'),
            component: 'ApiSelect',
            componentProps: ({ formModel, formActionType: formActionTypeStorekeeper }) => {
              return {
                api: getAllDivision,
                valueField: 'id',
                labelField: 'divisionName',
                resultField: 'body',
                params: {
                  companyId: val,
                },
                onChange: () => {
                  formModel.staffId = undefined;
                  // const { updateSchemaStorekeeper } = formActionTypeStorekeeper;
                  // updateSchemaStorekeeper({
                  //   field: 'storekeeper',
                  //   label: t('form.setting.storekeeper'),
                  //   component: 'ApiSelect',
                  //   componentProps: () => {
                  //     return {
                  //       api: getAllStaff,
                  //       valueField: 'id',
                  //       labelField: 'staffName',
                  //       resultField: 'body',
                  //       params: { divisionId: formModel.divisionId },
                  //     };
                  //   },
                  // });
                },
              };
            },
          });
        },
      };
    },
  },
  {
    field: 'divisionId',
    label: t('form.setting.division'),
    component: 'ApiSelect',
  },
  {
    label: t('form.setting.location'),
    field: 'location',
    component: 'Input',
  },
  {
    label: t('form.setting.storekeeper'),
    field: 'storekeeper',
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getAllStaff,
        valueField: 'id',
        labelField: 'staffName',
        resultField: 'body',
        params: { divisionId: formModel.divisionId },
      };
    },
  },
  {
    label: t('form.setting.phone'),
    field: 'phone',
    component: 'Input',
  },
  {
    label: t('form.setting.address'),
    field: 'address',
    component: 'Input',
  },
  {
    label: t('form.setting.longitude'),
    field: 'longitude',
    component: 'Input',
  },
  {
    label: t('form.setting.latitude'),
    field: 'latitude',
    component: 'Input',
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
