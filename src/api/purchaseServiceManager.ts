import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_ALL = '/fsales-performance/buyer-buyer-service-management/search',
  GET_CHANGE_SERVICE_MANAGER = '/fsales-performance/buyer-buyer-service-management/get-change-service-manager',
  EXPORT_SERVICE_MANAGER = '/fsales-performance/buyer-buyer-service-management/export-data',
  GET_ATTRIBUTE = '/fsales-performance/buyer-buyer-service-management/get-attribute-by-product',
  EXPORT_SERVICE_MANAGER_CHANGE = '/fsales-performance/buyer-buyer-service-management/export-data-change',
  GET_ACCEPTANCE_BY_REQUEST = '/fsales-performance/buyer-buyer-service-management/get-acceptance?request=',
  SAVE_ACCEPTANCE_BY_REQUEST = '/fsales-performance/buyer-buyer-service-management/save-acceptance',
}
export const getAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ATTRIBUTE,
    params,
  });
export const getAllServiceManager = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_ALL,
    data,
  });
export const getChangeServiceManager = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_CHANGE_SERVICE_MANAGER,
    data,
  });

export const exportData = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_SERVICE_MANAGER,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
export const exportDataChange = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_SERVICE_MANAGER_CHANGE,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
export const getAcceptanceByRequest = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ACCEPTANCE_BY_REQUEST,
    params,
  });
export const saveAcceptanceByRequest = (data: any) =>
  defHttp.post<any>({
    url: Api.SAVE_ACCEPTANCE_BY_REQUEST,
    data,
  });
