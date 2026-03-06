import { BasicColumn } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { searchUser } from '@/api/sys/permission';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('permission.code'),
    dataIndex: 'roleCode',
    width: 200,
  },
  {
    title: t('permission.name'),
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: t('permission.createdDate'),
    dataIndex: 'createdDate',
    key: 'createdDate',
    width: 200,
  },
  {
    title: t('kpi.status'),
    dataIndex: 'status',
    align: 'center',
    width: 100,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.active') : t('common.inActive');
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const roleUserColumns: BasicColumn[] = [
  {
    title: t('permission.username'),
    dataIndex: 'userName',
    width: 200,
  },
  {
    title: t('permission.displayName'),
    dataIndex: 'name',
    width: 200,
  },
  {
    title: t('permission.email'),
    dataIndex: 'email',
    width: 200,
  },
];

export const searchUserFormSchema: any = [
  {
    field: 'userId',
    label: t('permission.username'),
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: searchUser,
      valueField: 'id',
      labelField: 'name',
      resultField: 'result',
      params: { pageInfo: { currentPage: 1, pageSize: 10 } },
      columns: [
        {
          title: 'userName',
          dataIndex: 'userName',
        },
        {
          title: 'name',
          dataIndex: 'label',
        },
      ],
    },
    colProps: { span: 24 },
  },
];
