import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'Type',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
  },
  {
    title: 'Updated Date',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Updated By',
    dataIndex: 'updatedBy',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Active' : 'InActive';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'code',
    label: 'Code',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: 'Type of Debt',
    required: true,
    component: 'Input',
  },
  {
    label: 'Description',
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      maxlength: 2000,
    },
  },
  {
    field: 'status',
    label: 'Status',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: 'Active', value: 1 },
        { label: 'InActive', value: 0 },
      ],
    },
  },
];
