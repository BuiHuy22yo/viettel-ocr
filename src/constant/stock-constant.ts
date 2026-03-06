import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const STOCK_CONSTANT = {
  WAREHOUSE_INDEX_PATH: '/warehouse/index',
  WAREHOUSE_TEMP_PATH: '/temp',
  IMPORT_SOURCE_LIST: [
    {
      id: 1,
      code: 'IMPORT_SOURCE_01',
      name: t('stock.common.importSourceList.partner'),
    },
    {
      id: 2,
      code: 'IMPORT_SOURCE_02',
      name: t('stock.common.importSourceList.otherStock'),
    },
    {
      id: 3,
      code: 'IMPORT_SOURCE_03',
      name: t('stock.common.importSourceList.other'),
    },
  ],
  MANAGEMENT_METHOD: {
    SERIAL: 1,
    QUANTITY: 2,
    LOT: 3,
  },
  STOCK_TRANS_STATUS: [
    {
      id: 0,
      name: t('stock.stockImportTab.common.statusList.pendingApproval'),
      color: 'yellow',
    },
    {
      id: 1,
      name: t('stock.stockImportTab.common.statusList.approval'),
      color: 'green',
    },
    {
      id: 2,
      name: t('stock.stockImportTab.common.statusList.destroy'),
      color: 'red',
    },
  ],
  STOCK_GOODS_DETAIL_STATUS: [
    {
      id: 0,
      name: t('stock.common.stockGoodsDetailStatus.deleted'),
      color: 'red',
    },
    {
      id: 1,
      name: t('stock.common.stockGoodsDetailStatus.inStock'),
      color: 'green',
    },
    {
      id: 2,
      name: t('stock.common.stockGoodsDetailStatus.onHold'),
      color: 'yellow',
    },
    {
      id: 3,
      name: t('stock.common.stockGoodsDetailStatus.transit'),
      color: 'blue',
    },
  ],
  STOCK_FORM_OF_OWNERSHIP: [
    {
      id: 1,
      name: t('stock.stockCategory.common.formOfOwnership.myTel'),
    },
    {
      id: 2,
      name: t('stock.stockCategory.common.formOfOwnership.partner'),
    },
  ],
  STOCK_ACTION: {
    CANCEL: 'CANCEL',
    CANCEL_APPROVAL: 'CANCEL_APPROVAL',
    SEND_GOODS: 'SEND_GOODS',
    APPROVAL: 'APPROVAL',
    DELIVERY_SUCCESSFUL: 'DELIVERY_SUCCESSFUL',
    CANCEL_SEND_GOODS: 'CANCEL_SEND_GOODS',
    WAREHOUSE_REQUEST_IMPORT: 'WAREHOUSE_REQUEST_IMPORT',
    WAREHOUSE_REQUEST_EXPORT: 'WAREHOUSE_REQUEST_EXPORT',
    SERVICE_REQUEST_INVENTORY: 'SERVICE_REQUEST_INVENTORY',
    SERVICE_REQUEST: 'SERVICE_REQUEST',
  },
  REQUEST_ORDER_STATE: {
    APPROVED: 'APPROVED',
    GOODS_ISSUING: 'GOODS_ISSUING',
  },
  MYTEL_TRANSPORTATION_UNIT: 'MYTEL',
  WARRANTY_REPAIR_TYPE: [
    {
      id: 1,
      code: 'REPAIR',
      name: t('stock.common.warrantyRepairType.repair'),
    },
    {
      id: 2,
      code: 'WARRANTY',
      name: t('stock.common.warrantyRepairType.warranty'),
    },
  ],
  WARRANTY_REPAIR_PARTNER_TYPE: 'Warranty/Repair',
  WARRANTY_REPAIR_STATUS: [
    {
      value: 0,
      label: t('stock.common.warrantyRepairStatus.cancelled'),
      color: 'red',
    },
    {
      value: 1,
      label: t('stock.common.warrantyRepairStatus.created'),
      color: 'lightgreen',
    },
    {
      value: 2,
      label: t('stock.common.warrantyRepairStatus.processing'),
      color: 'blue',
    },
    {
      value: 3,
      label: t('stock.common.warrantyRepairStatus.completed'),
      color: 'green',
    },
  ],
  IMPORT_FROM_EXPORT_TYPE: 'IMPORT0',
  IMPORT_FROM_KCS_TYPE: 'IMPORT1',
};
