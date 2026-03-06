import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getAllCompany, getAllDivision, getAllUnit } from '@/api/setting/org';
import { getAllDomain } from '@/api/setting/resources';
import { validatorCode } from '@/utils/helper/validatorForm';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'segmentCode',
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'segmentName',
  },
  {
    title: t('form.setting.domain'),
    dataIndex: 'businessDomainName',
  },
  {
    title: t('form.setting.company'),
    dataIndex: 'companyName',
  },
  {
    title: t('form.setting.division'),
    dataIndex: 'divisionName',
  },
  {
    title: t('form.setting.unit'),
    dataIndex: 'unitName',
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
    field: 'segmentCode',
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
    field: 'segmentName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
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
            required: true,
            component: 'ApiSelect',
            componentProps: {
              api: getAllDivision,
              valueField: 'id',
              labelField: 'divisionName',
              resultField: 'body',
              params: {
                companyId: val,
              },
              onChange: (val) => {
                formModel.unitId = null;
                const { updateSchema } = formActionType;
                updateSchema({
                  field: 'unitId',
                  label: t('form.setting.unit'),
                  required: true,
                  component: 'ApiSelect',
                  componentProps: {
                    api: getAllUnit,
                    valueField: 'id',
                    labelField: 'unitName',
                    resultField: 'body',
                    params: {
                      companyId: val,
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
    label: t('form.setting.division'),
    required: true,
    component: 'ApiSelect',
  },
  {
    field: 'unitId',
    label: t('form.setting.unit'),
    required: true,
    component: 'ApiSelect',
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
