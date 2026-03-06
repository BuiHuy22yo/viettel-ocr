import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getAllManagementMethod, getAllService } from '@/api/setting/service-product';
import { validatorCode } from '@/utils/helper/validatorForm';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'productCode',
    width: 160,
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'productName',
    width: 300,
  },
  {
    title: t('form.setting.service'),
    dataIndex: 'serviceName',
    width: 250,
  },
  {
    title: t('form.setting.managementMethod'),
    dataIndex: 'managementMethodName',
    width: 250,
  },
  {
    title: t('form.setting.unitOfMeasure'),
    dataIndex: 'measurementUnitName',
    width: 160,
  },
  {
    title: t('form.setting.conversionUnit'),
    dataIndex: 'conversionUnitName',
    width: 160,
  },
  {
    title: t('form.setting.conversionRate'),
    dataIndex: 'conversionRate',
    width: 120,
  },
  {
    title: t('form.setting.hasVariant'),
    dataIndex: 'hasVariant',
    width: 100,
    align: 'center',
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
    field: 'listUnit',
    label: 'listUnit',
    component: 'ApiSelect',
    show: false,
  },
  {
    field: 'isView',
    label: 'isView',
    component: 'Checkbox',
    show: false,
  },
  {
    field: 'isExistVariant',
    label: 'isExistVariant',
    component: 'Checkbox',
    show: false,
  },
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
    field: 'managementMethodId',
    label: t('form.setting.managementMethod'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        api: getAllManagementMethod,
        valueField: 'id',
        labelField: 'name',
        resultField: 'body',
        params: {
          status: 1,
        },
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
    field: 'measurementUnitId',
    label: t('form.setting.unitOfMeasure'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      let listUnit = formModel?.listUnit;
      if (formModel?.conversionUnitId) {
        listUnit = listUnit.filter((e) => e.id !== formModel?.conversionUnitId);
      }
      return {
        disabled: formModel.isView,
        options: listUnit,
        // api: getAllUnitOfMeasure,
        valueField: 'id',
        labelField: 'name',
        resultField: 'body',
        params: {
          status: 1,
        },
      };
    },
    colProps: { span: 12 },
  },
  // {
  //   field: 'businessDomainId',
  //   label: 'Domain(parent service)',
  //   required: true,
  //   component: 'ApiSelect',
  //   labelWidth: 300,
  //   componentProps: {
  //     api: getAllDomain,
  //     valueField: 'id',
  //     labelField: 'businessDomainName',
  //     resultField: 'body',
  //     params: {},
  //   },
  // },
  {
    field: 'serviceId',
    label: t('form.setting.service'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        api: getAllService,
        valueField: 'id',
        labelField: 'serviceName',
        resultField: 'body',
        params: {
          status: 1,
        },
      };
    },
    colProps: { span: 12 },
  },
  {
    field: 'conversionUnitId',
    label: t('form.setting.conversionUnit'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      let listUnit = formModel?.listUnit;
      if (formModel?.measurementUnitId) {
        listUnit = listUnit.filter((e) => e.id !== formModel?.measurementUnitId);
      }
      return {
        disabled: formModel.isView,
        options: listUnit,
        // api: getAllUnitOfMeasure,
        valueField: 'id',
        labelField: 'name',
        resultField: 'body',
        params: {
          status: 1,
        },
      };
    },
    colProps: { span: 12 },
  },
  {
    field: 'isVariant',
    label: t('form.setting.hasVariant'),
    component: 'Checkbox',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView || formModel.isExistVariant,
      };
    },
    colProps: { span: 12 },
  },
  // {
  //   field: 'isVariant',
  //   component: 'CheckboxGroup',
  //   componentProps: ({ formModel, formActionType }) => {
  //     return {
  //       options: [
  //         {
  //           label: t('form.setting.hasVariant'),
  //           value: true,
  //         },
  //       ],
  //     };
  //   },
  //   colProps: { span: 12 },
  // },
  {
    field: 'conversionRate',
    label: t('form.setting.conversionRate'),
    component: 'InputNumber',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        min: 0,
        max: formModel.kpiValueType === 1 ? 100 : 100000000000000,
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
    field: 'lstVariant',
    labelWidth: 300,
    slot: 'viewVariant',
    colProps: {
      span: 24,
    },
  },
];
