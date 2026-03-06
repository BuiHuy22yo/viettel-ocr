import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('transportation.transportationAppConfig.table.columns.code'),
    dataIndex: 'code',
    width: 250,
  },
  {
    title: t('transportation.transportationAppConfig.table.columns.name'),
    dataIndex: 'name',
    width: 250,
  },
  {
    title: t('transportation.transportationAppConfig.table.columns.value'),
    dataIndex: 'value',
    width: 250,
  },
  {
    title: t('transportation.transportationAppConfig.table.columns.description'),
    dataIndex: 'description',
    width: 500,
  },
  {
    title: t('transportation.transportationAppConfig.table.columns.createdBy'),
    align: 'center',
    dataIndex: 'createdBy',
    width: 100,
  },
  {
    title: t('transportation.transportationAppConfig.table.columns.createdAt'),
    dataIndex: 'createdAt',
    width: 150,
    align: 'center',
  },

  {
    title: t('transportation.transportationAppConfig.table.columns.updatedBy'),
    dataIndex: 'updatedBy',
    width: 100,
  },
  {
    title: t('transportation.transportationAppConfig.table.columns.updatedAt'),
    dataIndex: 'updatedAt',
    width: 150,
    align: 'center',
  },
  {
    title: t('transportation.transportationAppConfig.table.columns.status'),
    align: 'center',
    dataIndex: 'status',
    fixed: 'right',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.active') : t('common.inActive');
      return h(Tag, { color: color }, () => text);
    },
    width: 100,
  },
];
