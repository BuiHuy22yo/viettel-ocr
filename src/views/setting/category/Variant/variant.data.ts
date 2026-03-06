import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getAllProduct, getAllService } from '@/api/setting/service-product';
import { validatorCode } from '@/utils/helper/validatorForm';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('form.setting.code'),
    dataIndex: 'variantCode',
    width: 160,
  },
  {
    title: t('form.setting.name'),
    dataIndex: 'variantName',
    width: 300,
  },
  {
    title: t('form.setting.service'),
    dataIndex: 'serviceName',
    width: 250,
  },
  {
    title: t('form.setting.productCode'),
    dataIndex: 'productCode',
    width: 160,
  },
  {
    title: t('form.setting.productName'),
    dataIndex: 'productName',
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
    field: 'fromProduct',
    label: 'fromProduct',
    component: 'Checkbox',
    show: false,
  },
  {
    field: 'variantCode',
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
    field: 'variantName',
    label: t('form.setting.name'),
    required: true,
    component: 'Input',
  },
  {
    field: 'serviceId',
    label: t('form.setting.service'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.fromProduct,
        api: getAllService,
        valueField: 'id',
        labelField: 'serviceName',
        resultField: 'body',
        params: {
          status: 1,
        },
      };
    },
  },
  {
    field: 'productId',
    label: t('form.setting.product'),
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.fromProduct,
        api: getAllProduct,
        valueField: 'id',
        labelField: 'productName',
        resultField: 'body',
        params: {
          status: 1,
          serviceId: formModel.serviceId,
          hasVariant: true,
        },
        onChange: (e, item) => {
          if (item) {
            formModel.serviceId = item?.serviceId;
            formModel.managementMethod = item?.managementMethodName;
            formModel.unitOfMeasure = item?.measurementUnitName;
            formModel.conversionUnit = item?.conversionUnitName;
            formModel.conversionRate = item?.conversionRate;
          }
        },
      };
    },
  },
  {
    label: t('form.setting.managementMethod'),
    field: 'managementMethod',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: t('form.setting.unitOfMeasure'),
    field: 'unitOfMeasure',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: t('form.setting.conversionUnit'),
    field: 'conversionUnit',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: t('form.setting.conversionRate'),
    field: 'conversionRate',
    component: 'Input',
    componentProps: {
      disabled: true,
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
  {
    field: 'listAddAttribute',
    labelWidth: 300,
    slot: 'addAttribute',
    colProps: {
      span: 24,
    },
  },
];
