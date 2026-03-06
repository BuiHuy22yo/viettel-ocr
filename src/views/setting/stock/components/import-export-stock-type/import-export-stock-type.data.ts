import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('stock.importExportStockType.table.columns.code'),
    dataIndex: 'code',
    width: 100,
  },
  {
    title: t('stock.importExportStockType.table.columns.name'),
    dataIndex: 'name',
    key: 'stockName',
    width: 200,
  },
  {
    title: t('stock.importExportStockType.table.columns.type'),
    align: 'center',
    dataIndex: 'type',
    width: 100,
    customRender: ({ record }) => {
      const type = record.type;
      const importType = ~~type === 1;
      return importType
        ? t('stock.importExportStockType.common.typeList.import')
        : t('stock.importExportStockType.common.typeList.export');
    },
  },
  {
    title: t('stock.importExportStockType.table.columns.createUser'),
    dataIndex: 'createdBy',
    width: 100,
  },
  {
    title: t('stock.importExportStockType.table.columns.createDatetime'),
    dataIndex: 'createdAt',
    align: 'center',
    width: 150,
  },
  {
    title: t('stock.importExportStockType.table.columns.updateUser'),
    dataIndex: 'updatedBy',
    width: 100,
  },
  {
    title: t('stock.importExportStockType.table.columns.updateDatetime'),
    dataIndex: 'updatedAt',
    align: 'center',
    width: 150,
  },
  {
    title: t('stock.importExportStockType.table.columns.status'),
    align: 'center',
    dataIndex: 'status',
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
