import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('stock.stockCategory.table.columns.stockCode'),
    dataIndex: 'stockCode',
    width: 180,
  },
  {
    title: t('stock.stockCategory.table.columns.stockName'),
    dataIndex: 'stockName',
    key: 'stockName',
    width: 300,
  },
  {
    title: t('stock.stockCategory.table.columns.stockType'),
    align: 'center',
    dataIndex: 'stockTypeName',
    width: 120,
  },
  {
    title: t('stock.stockCategory.table.columns.stockParent'),
    dataIndex: 'stockParentCode',
    width: 200,
  },

  {
    title: t('stock.stockCategory.table.columns.serviceType'),
    dataIndex: 'serviceName',
    width: 100,
  },
  {
    title: t('stock.stockCategory.table.columns.managementUnit'),
    dataIndex: 'managementUnitName',
    width: 300,
  },
  {
    title: t('stock.stockCategory.table.columns.area'),
    dataIndex: 'area',
    width: 350,
  },
  {
    title: t('stock.stockCategory.table.columns.phone'),
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: t('stock.stockCategory.table.columns.stockManager'),
    dataIndex: 'stockManagerCode',
    width: 110,
  },
  {
    title: t('stock.stockCategory.table.columns.createUser'),
    dataIndex: 'createdBy',
    width: 110,
  },
  {
    title: t('stock.stockCategory.table.columns.createDatetime'),
    dataIndex: 'createdAt',
    width: 150,
    align: 'center',
  },
  {
    title: t('stock.stockCategory.table.columns.updateUser'),
    dataIndex: 'updatedBy',
    width: 110,
  },
  {
    title: t('stock.stockCategory.table.columns.updateDatetime'),
    dataIndex: 'updatedAt',
    width: 150,
    align: 'center',
  },
  {
    title: t('stock.stockCategory.table.columns.status'),
    align: 'center',
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.active') : t('common.inActive');
      return h(Tag, { color: color }, () => text);
    },
    width: 120,
  },
];
