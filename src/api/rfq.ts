import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_REQUEST_QUOTA = '/fsales-transport-core/request-quota/search',
  EXPORT_REQUEST_QUOTA = '/fsales-transport-core/request-quota/export',
  GET_SELF_REQUEST_QUOTA = '/fsales-transport-core/request-quota/self',
  CREATE_REQUEST_QUOTA = '/fsales-transport-core/request-quota/create',
  UPDATE_REQUEST_QUOTA = '/fsales-transport-core/request-quota/update',
  DELETE_REQUEST_QUOTA = '/fsales-transport-core/request-quota/delete',
  CANCEL_REQUEST_QUOTA = '/fsales-transport-core/request-quota/cancel',
  SEND_REQUEST_QUOTA = '/fsales-transport-core/request-quota/send',
  OPEN_BID_REQUEST_QUOTA = '/fsales-transport-core/request-quota/open-bid',
  COMPLETE_REQUEST_QUOTA = '/fsales-transport-core/request-quota/complete',
  REQUEST_QUOTA_GET_HISTORY_CHANGE = '/fsales-transport-core/request-quota/history-change',
  GET_REQUEST_QUOTA_TEMPLATE_HEADER = '/fsales-transport-core/request-quota/template-header',
  GET_REQUEST_QUOTA_TEMPLATE_DATA = '/fsales-transport-core/request-quota/template-data',
  UPDATE_REQUEST_QUOTA_TEMPLATE_DATA = '/fsales-transport-core/request-quota/update-template-data',
  REJECT_QUOTA = '/fsales-transport-core/quota/reject',
  SUMMARY_BY_STATE = '/fsales-transport-core/request-quota/summary-by-state',
}

export const searchRequestQuota = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_REQUEST_QUOTA,
    params,
  });

export const getSelfRequestQuota = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_SELF_REQUEST_QUOTA,
    params,
  });

export const createRequestQuota = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_REQUEST_QUOTA,
    data,
  });

export const updateRequestQuota = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_REQUEST_QUOTA,
    data,
  });

export const deleteRequestQuota = (data: any) =>
  defHttp.post<any>({
    url: Api.DELETE_REQUEST_QUOTA,
    data,
  });

export const cancelRequestQuota = (data: any) =>
  defHttp.post<any>({
    url: Api.CANCEL_REQUEST_QUOTA,
    data,
  });

export const sendRequestQuota = (data: any) =>
  defHttp.post<any>({
    url: Api.SEND_REQUEST_QUOTA,
    data,
  });

export const openBidRequestQuota = (data: any) =>
  defHttp.post<any>({
    url: Api.OPEN_BID_REQUEST_QUOTA,
    data,
  });

export const completeRequestQuota = (data: any) =>
  defHttp.post<any>({
    url: Api.COMPLETE_REQUEST_QUOTA,
    data,
  });

export const requestQuotaGetHistoryChange = (params: any) =>
  defHttp.get<any>({
    url: Api.REQUEST_QUOTA_GET_HISTORY_CHANGE,
    params,
  });

export const getRequestQuotaTemplateHeader = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_REQUEST_QUOTA_TEMPLATE_HEADER,
    params,
  });

export const getRequestQuotaTemplateData = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_REQUEST_QUOTA_TEMPLATE_DATA,
    params,
  });

export const updateRequestQuotaTemplateData = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_REQUEST_QUOTA_TEMPLATE_DATA,
    data,
  });

export const exportRequestQuota = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_REQUEST_QUOTA,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const rejectQuota = (data: any) =>
  defHttp.post<any>({
    url: Api.REJECT_QUOTA,
    data,
  });
export const getSummaryByState = (params: any) =>
  defHttp.get<any>({
    url: Api.SUMMARY_BY_STATE,
    params,
  });
