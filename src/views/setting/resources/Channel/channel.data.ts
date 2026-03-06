import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getAllDomain } from '@/api/setting/resources';
import { validatorCode } from '@/utils/helper/validatorForm';
import { getAllCompany, getAllDivision, getAllSubUnit, getAllUnit } from '@/api/setting/org';
import { getListGlobalValueByCode } from '@/api/sys/global_list';
import { getAllStaff } from '@/api/staff';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'channelCode',
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'channelName',
  },
  {
    title: t('form.setting.domain'),
    dataIndex: 'businessDomainName',
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
    field: 'channelCode',
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
    field: 'companyId',
    label: t('form.setting.company'),
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        api: getAllCompany,
        valueField: 'id',
        labelField: 'companyName',
        resultField: 'body',
        params: {
          status: 1,
        },
        onChange: () => {
          formModel.divisionId = undefined;
          formModel.unitId = undefined;
          formModel.subUnitId = undefined;
          formModel.staffApplyId = undefined;
        },
      };
    },
  },
  {
    field: 'channelType',
    label: t('form.setting.channelType'),
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getListGlobalValueByCode,
      valueField: 'value',
      labelField: 'name',
      resultField: 'body',
      params: { code: 'CHANNEL_TYPE', name: '', status: 1 },
    },
  },
  {
    field: 'divisionId',
    label: t('form.setting.division'),
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getAllDivision,
        valueField: 'id',
        labelField: 'divisionName',
        resultField: 'body',
        params: {
          status: 1,
          companyId: formModel.companyId,
        },
        onChange: () => {
          formModel.unitId = undefined;
          formModel.subUnitId = undefined;
          formModel.staffApplyId = undefined;
        },
      };
    },
  },
  {
    field: 'channelName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
  },

  {
    field: 'unitId',
    label: t('form.setting.unit'),
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getAllUnit,
        valueField: 'id',
        labelField: 'unitName',
        resultField: 'body',
        params: {
          status: 1,
          divisionId: formModel.divisionId,
        },
        onChange: () => {
          formModel.subUnitId = undefined;
          formModel.staffApplyId = undefined;
        },
      };
    },
  },
  {
    field: 'businessDomainId',
    label: t('form.setting.domain'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getAllDomain,
      valueField: 'id',
      labelField: 'businessDomainName',
      resultField: 'body',
      params: {
        status: 1,
      },
    },
  },

  {
    field: 'subUnitId',
    label: t('form.setting.subUnit'),
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        api: getAllSubUnit,
        valueField: 'id',
        labelField: 'subUnitName',
        resultField: 'body',
        params: {
          status: 1,
          unitId: formModel.unitId,
        },
        onChange: () => {
          formModel.staffApplyId = undefined;
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
    field: 'staffId',
    component: 'ApiSelect',
    label: t('form.setting.staff'),
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        mode: 'multiple',
        api: getAllStaff,
        valueField: 'id',
        labelField: 'staffName',
        resultField: 'body',
        params: { companyId: formModel.companyId, subUnitId: formModel.subUnitId, status: 1 },
      };
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
