import { defHttp } from '@/utils/http/axios';
import { isNullOrEmpty } from '@/utils/is';
import { useMessage } from '@/hooks/web/useMessage';
import { ResultEnum } from '@/enums/httpEnum';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
const { createErrorModal } = useMessage();
enum API_KCS {
  CREATE_KCS = '/fsales-transport-core/kcs/create-kcs',
  UPDATE_KCS = '/fsales-transport-core/kcs/update-kcs',
  SEARCH_KCS = '/fsales-transport-core/kcs/search',
  GET_KCS_DETAIL = '/fsales-transport-core/kcs/get-kcs-detail',
  APPROVAL_KCS = '/fsales-transport-core/kcs/approval-kcs',
  CANCEL_APPROVAL_KCS = '/fsales-transport-core/kcs/cancel-approval-kcs',
  CANCEL_KCS = '/fsales-transport-core/kcs/cancel-kcs',
}
export const createKcsApi = (params: any) =>
  defHttp
    .post<any>(
      {
        url: API_KCS.CREATE_KCS,
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
              kcsCode: textResponse?.kcsCode,
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

export const updateKcsApi = (params: any) =>
  defHttp
    .post<any>(
      {
        url: API_KCS.UPDATE_KCS,
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
              kcsCode: textResponse?.kcsCode,
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

export const searchKcsApi = (params: any) =>
  defHttp.get<any>({
    url: API_KCS.SEARCH_KCS,
    params,
  });
export const getKcsDetailApi = (params: any) =>
  defHttp.get<any>({
    url: API_KCS.GET_KCS_DETAIL,
    params,
  });
export const approvalKcsApi = (params: any) =>
  defHttp.post<any>({
    url: API_KCS.APPROVAL_KCS,
    params,
  });
export const cancelApprovalKcsApi = (params: any) =>
  defHttp.post<any>({
    url: API_KCS.CANCEL_APPROVAL_KCS,
    params,
  });

export const cancelKcsApi = (params: any) =>
  defHttp.post<any>({
    url: API_KCS.CANCEL_KCS,
    params,
  });
