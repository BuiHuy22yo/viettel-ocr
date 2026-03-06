import { useI18n } from '@/hooks/web/useI18n';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

const { t } = useI18n();
export const columns: any = [
  {
    title: 'Mã hợp đồng',
    dataIndex: 'code',
  },
  {
    title: 'Đối tác',
    dataIndex: 'partner',
  },
  {
    title: 'Ngày ký',
    dataIndex: 'signedDate',
  },

  {
    title: 'Ngày hết hạn',
    dataIndex: 'expireDate',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const color =
        status === 1 ? 'green' : status === 2 ? '#5baeff' : status === 3 ? 'blue' : 'purple';
      const text =
        status === 1
          ? 'Đối soát cước'
          : status === 2
            ? 'Đối soát CL'
            : status === 3
              ? 'Đã thanh toán'
              : 'Chờ thanh toán';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const formSchema: any = [
  {
    field: 'kpiFieldId',
    label: 'Đơn vị',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        api: null,
        valueField: 'id',
        labelField: 'fieldName',
        resultField: 'body',
        params: { status: 1 },
      };
    },
  },
  {
    field: 'kpiFieldId',
    label: 'Đối tác',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        api: null,
        valueField: 'id',
        labelField: 'fieldName',
        resultField: 'body',
        params: { status: 1 },
      };
    },
  },
  {
    field: 'kpiFieldId',
    label: 'Chu kỳ',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        api: null,
        valueField: 'id',
        labelField: 'fieldName',
        resultField: 'body',
        params: { status: 1 },
      };
    },
  },
];
