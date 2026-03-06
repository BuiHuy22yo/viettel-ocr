import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_REGISTRATION = '/fsales-transport-core/partner-registration/search',
  DETAIL_REGISTRATION = '/fsales-transport-core/partner-registration/detail',
  APPROVE_REGISTRATION = '/fsales-transport-core/partner-registration/approve',
  REJECT_REGISTRATION = '/fsales-transport-core/partner-registration/reject',
  EXPORT_REGISTRATION = '/fsales-transport-core/partner-registration/export',
}

export const searchRegistration = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_REGISTRATION,
    data,
  });

export const detailRegistration = (params: any) =>
  defHttp.get<any>({
    url: Api.DETAIL_REGISTRATION,
    params,
  });

export const approveRegistration = (params: any) =>
  defHttp.get<any>({
    url: Api.APPROVE_REGISTRATION,
    params,
  });

export const rejectRegistration = (params: any) =>
  defHttp.get<any>({
    url: Api.REJECT_REGISTRATION,
    params,
  });

export const exportRegistration = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_REGISTRATION,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
