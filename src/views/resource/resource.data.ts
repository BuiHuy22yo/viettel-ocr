import { BasicColumn } from '@/components/Table';
import { getAllRole } from '@/api/setting/resources';
import { getAllCompany, getAllDivision, getAllSubUnit, getAllUnit } from '@/api/setting/org';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';

import { validatorCode } from '@/utils/helper/validatorForm';
import { searchRole } from '@/api/sys/permission';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('resource.staffCode'),
    dataIndex: 'staffCode',
    width: 150,
  },
  {
    title: t('resource.staffName'),
    dataIndex: 'staffName',
    width: 250,
  },
  {
    title: t('resource.role'),
    dataIndex: 'keycloakRoleName',
    width: 250,
  },
  {
    title: t('resource.company'),
    dataIndex: 'companyName',
    width: 250,
  },
  {
    title: t('resource.division'),
    dataIndex: 'divisionName',
    width: 250,
  },
  {
    title: t('resource.unit'),
    dataIndex: 'unitName',
    width: 250,
  },
  {
    title: t('resource.subUnit'),
    dataIndex: 'subUnitName',
    width: 250,
  },

  {
    title: t('resource.roleTitle'),
    dataIndex: 'positionName',
    width: 250,
  },
  {
    title: t('resource.phoneNumber'),
    dataIndex: 'phoneNumber',
    width: 150,
  },
  {
    title: t('resource.email'),
    dataIndex: 'email',
    width: 200,
  },
  {
    title: t('resource.createdAt'),
    align: 'center',
    dataIndex: 'createdAt',
    width: 150,
  },
  {
    title: t('resource.createdBy'),
    dataIndex: 'createdBy',
    width: 150,
  },
  {
    title: t('resource.updatedAt'),
    align: 'center',
    dataIndex: 'updatedAt',
    width: 150,
  },
  {
    title: t('resource.updatedBy'),
    dataIndex: 'updatedBy',
    width: 150,
  },
  {
    title: t('resource.status'),
    align: 'center',
    dataIndex: 'status',
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

export const formSchema: any = [
  {
    field: 'staffCode',
    label: t('resource.staffCode'),
    required: true,
    component: 'Input',
    componentProps: ({ formModel }) => {
      return { maxlength: 50, disabled: formModel.isView };
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
    field: 'staffName',
    label: t('resource.staffName'),
    required: true,
    component: 'Input',
    componentProps: {
      maxlength: 250,
    },
  },
  {
    field: 'companyId',
    label: t('resource.company'),
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
          formModel.unitId = null;
          formModel.subUnitId = null;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'divisionId',
            label: t('resource.division'),
            required: true,
            component: 'ApiSelect',
            componentProps: {
              api: getAllDivision,
              valueField: 'id',
              labelField: 'divisionName',
              resultField: 'body',
              params: {
                companyId: val,
                status: 1,
              },
              onChange: (val) => {
                formModel.unitId = null;
                formModel.subUnitId = null;
                const { updateSchema } = formActionType;
                updateSchema({
                  field: 'unitId',
                  label: t('resource.unit'),
                  required: true,
                  component: 'ApiSelect',
                  componentProps: {
                    api: getAllUnit,
                    valueField: 'id',
                    labelField: 'unitName',
                    resultField: 'body',
                    params: {
                      divisionId: val,
                      status: 1,
                    },
                    onChange: (val) => {
                      formModel.subUnitId = null;
                      const { updateSchema } = formActionType;
                      updateSchema({
                        field: 'subUnitId',
                        label: t('resource.subUnit'),
                        required: true,
                        component: 'ApiSelect',
                        componentProps: {
                          api: getAllSubUnit,
                          valueField: 'id',
                          labelField: 'subUnitName',
                          resultField: 'body',
                          params: {
                            unitId: val,
                            status: 1,
                          },
                        },
                      });
                    },
                  },
                });
              },
            },
          });
        },
      };
    },
  },
  {
    field: 'divisionId',
    label: t('resource.division'),
    required: true,
    component: 'ApiSelect',
  },
  {
    field: 'unitId',
    label: t('resource.unit'),
    required: true,
    component: 'ApiSelect',
  },
  {
    field: 'subUnitId',
    label: t('resource.subUnit'),
    required: true,
    component: 'ApiSelect',
  },
  {
    field: 'positionId',
    label: t('resource.roleTitle'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getAllRole,
      valueField: 'id',
      labelField: 'positionName',
      resultField: 'body',
      params: {
        status: 1,
      },
    },
  },
  {
    field: 'phoneNumber',
    label: t('resource.phoneNumber'),
    required: true,
    component: 'Input',
  },
  {
    field: 'email',
    label: t('resource.email'),
    required: true,
    component: 'Input',
  },
  {
    field: 'keycloakRoleId',
    label: t('resource.role'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: searchRole,
        valueField: 'roleId',
        labelField: 'roleName',
        resultField: 'body.result',
        params: {
          currentPage: 1,
          pageSize: 10000,
          pageAllSize: 0,
          clientCode: 'ubos-mytel-logistics',
          status: '1',
        },
        onChange: (e, item) => {
          formModel.keycloakRoleCode = item?.roleCode;
        },
      };
    },
  },
  {
    field: 'status',
    label: t('resource.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.active'), value: 1 },
        { label: t('common.inActive'), value: 0 },
      ],
    },
  },
  {
    field: 'keycloakRoleCode',
    label: 'keycloakRoleCode',
    show: false,
  },
  {
    field: 'isView',
    label: 'isView',
    show: false,
  },
];

export const searchFormSchema: any = [
  {
    field: 'staffCode',
    label: t('resource.staffCode'),
    component: 'Input',
  },
  {
    field: 'staffName',
    label: t('resource.staffName'),
    component: 'Input',
  },
  {
    field: 'companyId',
    label: t('resource.company'),
    component: 'ApiSelect',
    componentProps: {
      api: getAllCompany,
      valueField: 'id',
      labelField: 'companyName',
      resultField: 'body',
      params: {},
    },
  },

  {
    field: 'status',
    label: t('resource.status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('common.active'), value: 1 },
        { label: t('common.inActive'), value: 0 },
      ],
    },
  },
];
