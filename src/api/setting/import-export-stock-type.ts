import { defHttp } from '@/utils/http/axios';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { useMessage } from '@/hooks/web/useMessage';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
const { createErrorModal, createInfoModal } = useMessage();
enum Api {
  SEARCH = '/fsales-transport-core/import-export-stock-type/search',
  GENERATE_CODE = '/fsales-transport-core/import-export-stock-type/generate-code',
  CREATE = '/fsales-transport-core/import-export-stock-type/create',
  UPDATE = '/fsales-transport-core/import-export-stock-type/update',
  DELETE = '/fsales-transport-core/import-export-stock-type/delete',
  IMPORT = '/fsales-transport-core/import-export-stock-type/import-goods-receipt-issue-type',
}
export const searchImportExportStockType = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH,
    params,
  });
export const generateCode = (params: any) =>
  defHttp.get<any>({
    url: Api.GENERATE_CODE,
    params,
  });
export const createImportExportStockType = (params: any) =>
  defHttp.post<any>({
    url: Api.CREATE,
    params,
  });
export const updateImportExportStockType = (params: any) =>
  defHttp.post<any>({
    url: Api.UPDATE,
    params,
  });
export const deleteImportExportStockType = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE,
    params,
  });
export const importGoodsReceiptIssueType = (data: any) =>
  defHttp
    .post<any>(
      {
        url: Api.IMPORT,
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
          title: t('stock.message.importGoodsReceiptIssueType.title'),
          content: t('stock.message.importGoodsReceiptIssueType.message'),
        });
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'import_goods_receipt_issue_type_response.xlsx';
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
