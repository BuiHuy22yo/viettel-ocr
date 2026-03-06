import { BasicColumn } from '@/components/Table';
import { getListGlobalValueByCode } from '@/api/sys/global_list';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getAllCompany } from '@/api/setting/org';
import { validatorPhone, validatorCode } from '@/utils/helper/validatorForm';
import { getAllStaff } from '@/api/staff';
import { useI18n } from '@/hooks/web/useI18n';
import { getAllProvince, getDistrictByProvince, getWardByDistrict } from '@/api/setting/location';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'companyCode',
    width: 150,
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'companyName',
    width: 250,
  },
  {
    title: t('form.setting.type'),
    dataIndex: 'companyTypeName',
    width: 250,
  },
  {
    title: t('form.setting.createdDate'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    width: 150,
  },
  {
    title: t('form.setting.createdBy'),
    dataIndex: 'createdBy',
    width: 150,
  },
  {
    title: t('form.setting.updatedDate'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    align: 'center',
    width: 150,
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

export const formSchema: any = [
  {
    field: 'companyCode',
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
    field: 'companyName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
  },
  {
    field: 'staffId',
    label: t('form.setting.staffName'),
    component: 'ApiSelect',
    componentProps: {
      api: getAllStaff,
      valueField: 'id',
      labelField: 'staffName',
      resultField: 'body',
      params: { status: 1 },
    },
  },
  {
    field: 'orgUnitTaxCode',
    label: t('form.setting.companyTaxCode'),
    required: true,
    component: 'Input',
  },
  {
    field: 'phoneNumber',
    label: t('form.setting.phone'),
    required: true,
    component: 'Input',
    rules: [
      {
        validator: async (_, value) => {
          return validatorPhone(value);
        },
      },
    ],
  },
  {
    field: 'companyType',
    label: t('form.setting.companyType'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      isAutoLoad: true,
      api: getListGlobalValueByCode,
      valueField: 'value',
      labelField: 'name',
      resultField: 'body',
      params: { code: 'COMPANY_TYPE', name: '' },
    },
  },
  {
    field: 'parentId',
    label: t('form.setting.parentCompany'),
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
    field: 'provinceCode',
    label: t('form.setting.state'),
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: getAllProvince,
        valueField: 'code',
        labelField: 'name',
        resultField: 'body',
        params: { status: 1 },
        onChange: () => {
          formModel.districtCode = null;
          formModel.wardCode = null;
        },
      };
    },
  },
  {
    field: 'districtCode',
    label: t('form.setting.district'),
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: formModel.provinceCode ? getDistrictByProvince : null,
        valueField: 'code',
        labelField: 'name',
        resultField: 'body',
        params: { status: 1, provinceCode: formModel.provinceCode },
        onChange: () => {
          formModel.wardCode = null;
        },
      };
    },
  },
  {
    field: 'wardCode',
    label: t('form.setting.ward'),
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: formModel.districtCode ? getWardByDistrict : null,
        valueField: 'code',
        labelField: 'name',
        resultField: 'body',
        params: { status: 1, districtCode: formModel.districtCode },
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
