import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('stock.stockCategory.warehouseAttribute.table.columns.attributeCode'),
    dataIndex: 'code',
    width: 120,
  },
  {
    title: t('stock.stockCategory.warehouseAttribute.table.columns.attributeName'),
    dataIndex: 'name',
    width: 250,
  },
  {
    title: t('stock.stockCategory.warehouseAttribute.table.columns.createdBy'),
    align: 'center',
    dataIndex: 'createdBy',
    width: 100,
  },
  {
    title: t('stock.stockCategory.warehouseAttribute.table.columns.createdDate'),
    dataIndex: 'createdAt',
    width: 150,
    align: 'center',
  },

  {
    title: t('stock.stockCategory.warehouseAttribute.table.columns.updatedBy'),
    dataIndex: 'updatedBy',
    width: 100,
  },
  {
    title: t('stock.stockCategory.warehouseAttribute.table.columns.updatedDate'),
    dataIndex: 'updatedAt',
    width: 150,
    align: 'center',
  },
  {
    title: t('stock.stockCategory.warehouseAttribute.table.columns.status'),
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
