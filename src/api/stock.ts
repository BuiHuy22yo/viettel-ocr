import { defHttp } from '@/utils/http/axios';
import { isNullOrEmpty } from '@/utils/is';
import { useMessage } from '@/hooks/web/useMessage';
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import { useI18n } from '@/hooks/web/useI18n';
import { dateToString } from '@/utils/dateUtil';
import dayjs from 'dayjs';

const { t } = useI18n();
const { createErrorModal, createInfoModal } = useMessage();
enum API_STOCK_TRANSACTION {
  GET_INVENTORY = '/fsales-transport-core/inventory/get-inventory',
  GET_INVENTORY_DETAIL = '/fsales-transport-core/inventory/get-inventory-detail',
  GET_INVENTORY_FOR_SERVICE_REQUEST = '/fsales-transport-core/inventory/get-inventory-for-service-request',
  GET_SERVICE_GOODS_IN_STOCK = '/fsales-transport-core/inventory/get-service-goods-in-stock',
  GET_GOODS_IN_STOCK = '/fsales-transport-core/inventory/get-goods-in-stock',
  SEARCH_STOCK_TRANS = '/fsales-transport-core/stock-trans/search',
  GET_PRODUCT_FOR_STOCK_TRANS = '/fsales-transport-core/stock-trans/get-product-for-stock-trans',
  GET_STOCK_TRANS_DETAIL = '/fsales-transport-core/stock-trans/get-stock-trans-detail',
  GET_STOCK_TRANS_SERIAL_LOT = '/fsales-transport-core/stock-trans/get-stock-trans-serial-lot',
  CREATE_STOCK_TRANS = '/fsales-transport-core/stock-trans/import-export-stock-trans',
  UPDATE_STOCK_TRANS = '/fsales-transport-core/stock-trans/update-stock-trans',
  APPROVAL_STOCK_TRANS = '/fsales-transport-core/stock-trans/approval-stock-trans',
  CANCEL_STOCK_TRANS = '/fsales-transport-core/stock-trans/cancel-stock-trans',
  GET_STOCK_GOODS_DETAIL = '/fsales-transport-core/stock-trans/get-stock-goods-detail',
  CANCEL_APPROVAL_STOCK_TRANS = '/fsales-transport-core/stock-trans/cancel-approval-stock-trans',
  GET_REQUEST_ORDER_BY_STATE = '/fsales-transport-core/stock-trans/get-request-order-by-state',
  GET_REQUEST_ORDER_LINE_BY_ID = '/fsales-transport-core/stock-trans/get-request-order-line-by-id',
  GET_PARTNER_EMPLOYEE_BY_PARTNER_ID = '/fsales-transport-core/stock-trans/get-partner-employee-by-partner-id',
  GET_INVENTORY_WARRANTY_REPAIR = '/fsales-transport-core/warranty-repair/get-inventory',
  CREATE_WARRANTY_REPAIR = '/fsales-transport-core/warranty-repair/create-warranty-repair',
  GET_WARRANTY_REPAIR = '/fsales-transport-core/warranty-repair/get-warranty-repair',
  UPDATE_WARRANTY_REPAIR = '/fsales-transport-core/warranty-repair/update-warranty-repair',
  CANCEL_WARRANTY_REPAIR = '/fsales-transport-core/warranty-repair/cancel-warranty-repair',
  CHECK_WARRANTY_REPAIR_LIST_SERIAL = '/fsales-transport-core/warranty-repair/check-warranty-repair-list-serial',
  EXPORT_WARRANTY_REPAIR = '/fsales-transport-core/warranty-repair/export-data',
  IMPORT_INVENTORY = '/fsales-transport-core/inventory/import-inventory',
  PRODUCT_INFORMATION_SEARCH = '/fsales-transport-core/product-information/search',
  IMPORT_GOODS_RECEIPT = '/fsales-transport-core/stock-trans/import-goods_receipt',
  IMPORT_GOODS_ISSUE = '/fsales-transport-core/stock-trans/import-goods_issue',
  UPDATE_DEPRECIATION = '/fsales-transport-core/inventory/update-depreciation',
  IMPORT_WARRANTY_REPAIR = '/fsales-transport-core/warranty-repair/import-warranty-repair',
  EXPORT_WARRANTY_REPAIR_ALL = '/fsales-transport-core/warranty-repair/export-warranty-repair',
}

export const importInventory = (data: any) =>
  defHttp
    .post<any>(
      {
        url: API_STOCK_TRANSACTION.IMPORT_INVENTORY,
        data,
        headers: {
          'Content-type': ContentTypeEnum.FORM_DATA,
          ignoreCancelToken: true,
        },
        responseType: 'blob',
        validateStatus: (status) => status < 500 || status === 500,
      },
      {
        isReturnNativeResponse: true,
      },
    )
    .then(async (response) => {
      if (response?.status === 200) {
        createInfoModal({
          title: t('stock.message.importInventory.title'),
          content: t('stock.message.importInventory.message'),
        });
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'import_inventory_response.xlsx';
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1];
          }
        }
        const file = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        const contentType = response.headers['content-type'];
        let textResponse;
        if (contentType === 'application/json') {
          textResponse = await response.data.text();
          textResponse = JSON.parse(textResponse);
        }
        createErrorModal({ title: t('sys.api.errorTip'), content: textResponse.message });
        throw new Error(textResponse.message);
      }
    });

export const getInventoryApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_INVENTORY,
    params,
  });
export const getInventoryDetailApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_INVENTORY_DETAIL,
    params,
  });
export const getInventoryForServiceRequestApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.GET_INVENTORY_FOR_SERVICE_REQUEST,
    params,
  });
export const getServiceGoodsInStockApi = (params: any) => {
  if (isNullOrEmpty(params?.stockId)) {
    return [];
  } else {
    return defHttp.get<any>({
      url: API_STOCK_TRANSACTION.GET_SERVICE_GOODS_IN_STOCK,
      params,
    });
  }
};

export const getGoodsInStockApi = (params: any) => {
  if (isNullOrEmpty(params?.stockId) || isNullOrEmpty(params?.serviceId)) {
    return [];
  } else {
    return defHttp.get<any>({
      url: API_STOCK_TRANSACTION.GET_GOODS_IN_STOCK,
      params,
    });
  }
};

export const searchStockTransApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.SEARCH_STOCK_TRANS,
    params,
  });
export const getStockTransDetailApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_STOCK_TRANS_DETAIL,
    params,
  });
export const getStockTransSerialLotApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_STOCK_TRANS_SERIAL_LOT,
    params,
  });
export const createStockTransApi = (params: any) =>
  defHttp
    .post<any>(
      {
        url: API_STOCK_TRANSACTION.CREATE_STOCK_TRANS,
        params,
        responseType: 'blob',
        validateStatus: (status) => status < 500 || status === 500,
      },
      {
        isReturnNativeResponse: true,
      },
    )
    .then(async (response) => {
      if (response?.status === 200) {
        const contentType = response.headers['content-type'];
        if (contentType === 'application/json') {
          let textResponse = await response.data.text();
          textResponse = JSON.parse(textResponse);
          if (isNullOrEmpty(textResponse?.id)) {
            if (textResponse?.status === ResultEnum.SYSTEM_ERROR) {
              createErrorModal({ title: t('sys.api.errorTip'), content: textResponse.mess });
              throw new Error(response);
            }
          } else {
            return {
              id: textResponse?.id,
              expenseVoucherCode: textResponse?.expenseVoucherCode,
              ticketCode: textResponse?.ticketCode,
            };
          }
        } else {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: t('stock.validate.serialDuplicateBusiness'),
          });
          const contentDisposition = response.headers.get('content-disposition');
          let filename = 'error_report.xlsx';
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1];
            }
          }
          const file = new Blob([response.data], { type: 'application/vnd.ms-excel' });
          const fileURL = URL.createObjectURL(file);
          const a = document.createElement('a');
          a.href = fileURL;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          throw new Error(response);
        }
      } else {
        const contentType = response.headers['content-type'];
        let textResponse;
        if (contentType === 'application/json') {
          textResponse = await response.data.text();
          textResponse = JSON.parse(textResponse);
        }
        createErrorModal({ title: t('sys.api.errorTip'), content: textResponse.message });
        throw new Error(textResponse.message);
      }
    });
export const updateStockTransApi = (params: any) =>
  defHttp
    .post<any>(
      {
        url: API_STOCK_TRANSACTION.UPDATE_STOCK_TRANS,
        params,
        responseType: 'blob',
        validateStatus: (status) => status < 500 || status === 500,
      },
      {
        isReturnNativeResponse: true,
      },
    )
    .then(async (response) => {
      if (response?.status === 200) {
        const contentType = response.headers['content-type'];
        if (contentType === 'application/json') {
          let textResponse = await response.data.text();
          textResponse = JSON.parse(textResponse);
          if (isNullOrEmpty(textResponse?.id)) {
            if (textResponse?.status === ResultEnum.SYSTEM_ERROR) {
              createErrorModal({ title: t('sys.api.errorTip'), content: textResponse.mess });
              throw new Error(response);
            }
          } else {
            return {
              id: textResponse?.id,
              expenseVoucherCode: textResponse?.expenseVoucherCode,
              ticketCode: textResponse?.ticketCode,
            };
          }
        } else {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: t('stock.validate.serialDuplicateBusiness'),
          });
          const contentDisposition = response.headers.get('content-disposition');
          let filename = 'error_report.xlsx';
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1];
            }
          }
          const file = new Blob([response.data], { type: 'application/vnd.ms-excel' });
          const fileURL = URL.createObjectURL(file);
          const a = document.createElement('a');
          a.href = fileURL;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          throw new Error(response);
        }
      } else {
        const contentType = response.headers['content-type'];
        let textResponse;
        if (contentType === 'application/json') {
          textResponse = await response.data.text();
          textResponse = JSON.parse(textResponse);
        }
        createErrorModal({ title: t('sys.api.errorTip'), content: textResponse.message });
        throw new Error(textResponse.message);
      }
    });
export const approvalStockTransApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.APPROVAL_STOCK_TRANS,
    params,
  });
export const cancelStockTransApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.CANCEL_STOCK_TRANS,
    params,
  });
export const cancelApprovalStockTransApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.CANCEL_APPROVAL_STOCK_TRANS,
    params,
  });
export const getStockGoodsDetailApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_STOCK_GOODS_DETAIL,
    params,
  });
export const getProductForStockTransApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.GET_PRODUCT_FOR_STOCK_TRANS,
    params,
  });
export const getRequestOrderByStateApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.GET_REQUEST_ORDER_BY_STATE,
    params,
  });
export const getPurchaseServiceRequestLineApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_REQUEST_ORDER_LINE_BY_ID,
    params,
  });
export const getPartnerEmployeeByPartnerIdApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_PARTNER_EMPLOYEE_BY_PARTNER_ID,
    params,
  });

export const getWarrantyRepairInventoryApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_INVENTORY_WARRANTY_REPAIR,
    params,
  });

export const createWarrantyRepairApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.CREATE_WARRANTY_REPAIR,
    params,
  });

export const getWarrantyRepairApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.GET_WARRANTY_REPAIR,
    params,
  });
export const updateWarrantyRepairApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.UPDATE_WARRANTY_REPAIR,
    params,
  });
export const cancelWarrantyRepairApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.CANCEL_WARRANTY_REPAIR,
    params,
  });
export const checkWarrantyRepairListSerialApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.CHECK_WARRANTY_REPAIR_LIST_SERIAL,
    params,
  });
export const exportWarrantyRepairApi = (params: any) =>
  defHttp
    .post<any>(
      {
        url: API_STOCK_TRANSACTION.EXPORT_WARRANTY_REPAIR,
        params,
        responseType: 'blob',
        validateStatus: (status) => status < 500 || status === 500,
      },
      {
        isReturnNativeResponse: true,
      },
    )
    .then(async (response) => {
      if (response?.status === 200) {
        const filename = `warranty_repair_${params.serial}_${dateToString(dayjs(), 'DDMMYYYYHHmmss')}.xlsx`;
        const file = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        throw new Error(response);
      } else {
        const contentType = response.headers['content-type'];
        let textResponse;
        if (contentType === 'application/json') {
          textResponse = await response.data.text();
          textResponse = JSON.parse(textResponse);
        }
        createErrorModal({ title: t('sys.api.errorTip'), content: textResponse.message });
        throw new Error(textResponse.message);
      }
    });
export const searchProductInformationApi = (params: any) =>
  defHttp.get<any>({
    url: API_STOCK_TRANSACTION.PRODUCT_INFORMATION_SEARCH,
    params,
  });

export const importGoodsReceipt = (data: any) =>
  defHttp
    .post<any>(
      {
        url: API_STOCK_TRANSACTION.IMPORT_GOODS_RECEIPT,
        data,
        headers: {
          'Content-type': ContentTypeEnum.FORM_DATA,
          ignoreCancelToken: true,
        },
        validateStatus: (status) => status < 500 || status === 500,
      },
      {
        isReturnNativeResponse: true,
      },
    )
    .then(async (response) => {
      if (response?.status === 200) {
        if (response?.data) {
          const { stockTransDetailList, goodsReceiptImportFileResponse } = response.data;

          createInfoModal({
            title: t('stock.message.importInventory.title'),
            content: t('stock.message.importInventory.message'),
          });
          if (goodsReceiptImportFileResponse) {
            const byteCharacters = atob(goodsReceiptImportFileResponse);
            const byteNumbers = new Array(byteCharacters.length)
              .fill(0)
              .map((_, i) => byteCharacters.charCodeAt(i));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const fileURL = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = 'import_goods_receipt_response.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          return stockTransDetailList;
        } else {
          createErrorModal({ title: t('sys.api.errorTip'), content: 'Import thất bại' });
          throw new Error('Import thất bại');
        }
      } else {
        createErrorModal({ title: t('sys.api.errorTip'), content: response.data.message });
        throw new Error(response.data.message);
      }
    });
export const importGoodsIssue = (data: any) =>
  defHttp
    .post<any>(
      {
        url: API_STOCK_TRANSACTION.IMPORT_GOODS_ISSUE,
        data,
        headers: {
          'Content-type': ContentTypeEnum.FORM_DATA,
          ignoreCancelToken: true,
        },
        validateStatus: (status) => status < 500 || status === 500,
      },
      {
        isReturnNativeResponse: true,
      },
    )
    .then(async (response) => {
      if (response?.status === 200) {
        if (response?.data) {
          const { stockTransDetailList, goodsReceiptImportFileResponse } = response.data;

          createInfoModal({
            title: t('stock.message.importInventory.title'),
            content: t('stock.message.importInventory.message'),
          });
          if (goodsReceiptImportFileResponse) {
            const byteCharacters = atob(goodsReceiptImportFileResponse);
            const byteNumbers = new Array(byteCharacters.length)
              .fill(0)
              .map((_, i) => byteCharacters.charCodeAt(i));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const fileURL = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = 'import_goods_issue_response.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          return stockTransDetailList;
        } else {
          createErrorModal({ title: t('sys.api.errorTip'), content: 'Import thất bại' });
          throw new Error('Import thất bại');
        }
      } else {
        createErrorModal({ title: t('sys.api.errorTip'), content: response.data.message });
        throw new Error(response.data.message);
      }
    });
export const updateDepreciationApi = (params: any) =>
  defHttp.post<any>({
    url: API_STOCK_TRANSACTION.UPDATE_DEPRECIATION,
    params,
  });
export const importWarrantyRepair = (data: any) =>
  defHttp
    .post<any>(
      {
        url: API_STOCK_TRANSACTION.IMPORT_WARRANTY_REPAIR,
        data,
        headers: {
          'Content-type': ContentTypeEnum.FORM_DATA,
          ignoreCancelToken: true,
        },
        responseType: 'blob',
        validateStatus: (status) => status < 500 || status === 500,
      },
      {
        isReturnNativeResponse: true,
      },
    )
    .then(async (response) => {
      if (response?.status === 200) {
        createInfoModal({
          title: t('stock.message.importInventory.title'),
          content: t('stock.message.importInventory.message'),
        });
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'import_warranty_repair_response.xlsx';
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1];
          }
        }
        const file = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        const contentType = response.headers['content-type'];
        let textResponse;
        if (contentType === 'application/json') {
          textResponse = await response.data.text();
          textResponse = JSON.parse(textResponse);
        }
        createErrorModal({ title: t('sys.api.errorTip'), content: textResponse.message });
        throw new Error(textResponse.message);
      }
    });
export const exportWarrantyRepairAllApi = (params: any) =>
  defHttp.post<any>(
    {
      url: API_STOCK_TRANSACTION.EXPORT_WARRANTY_REPAIR_ALL,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
