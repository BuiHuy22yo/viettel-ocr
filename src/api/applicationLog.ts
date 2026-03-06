import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_LOG = '/ubos-mytel-logistics-logging/application-logs',
  SEARCH_USER_ACCES_LOG = '/ubos-mytel-logistics-logging/user-access-log/search',
  DETAIL_LOG = '/ubos-mytel-logistics-logging/user-access-log/detail',
  NAME_URI = '/ubos-mytel-logistics-logging/user-access-log/get-name-uri',
}

export const searchLog = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_LOG,
    params,
  });
export const searchUserAccessLog = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_USER_ACCES_LOG,
    data,
  });
export const detailLog = (params: any) =>
  defHttp.get<any>({
    url: Api.DETAIL_LOG,
    params,
  });
export const getNameUri = (params: any) =>
  defHttp.get<any>({
    url: Api.NAME_URI,
    params,
  });
